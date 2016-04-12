package nl.maastro.mia.gui.web.rest;

import nl.maastro.mia.gui.MiaApp;
import nl.maastro.mia.gui.domain.Configuration;
import nl.maastro.mia.gui.repository.ConfigurationRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the ConfigurationResource REST controller.
 *
 * @see ConfigurationResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = MiaApp.class)
@WebAppConfiguration
@IntegrationTest
public class ConfigurationResourceIntTest {

    private static final String DEFAULT_USER_ID = "AAAAA";
    private static final String UPDATED_USER_ID = "BBBBB";
    private static final String DEFAULT_CONFIGURATION_IDENTIFIER = "AAAAA";
    private static final String UPDATED_CONFIGURATION_IDENTIFIER = "BBBBB";

    @Inject
    private ConfigurationRepository configurationRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restConfigurationMockMvc;

    private Configuration configuration;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ConfigurationResource configurationResource = new ConfigurationResource();
        ReflectionTestUtils.setField(configurationResource, "configurationRepository", configurationRepository);
        this.restConfigurationMockMvc = MockMvcBuilders.standaloneSetup(configurationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        configuration = new Configuration();
        configuration.setUserId(DEFAULT_USER_ID);
        configuration.setConfigurationIdentifier(DEFAULT_CONFIGURATION_IDENTIFIER);
    }

    @Test
    @Transactional
    public void createConfiguration() throws Exception {
        int databaseSizeBeforeCreate = configurationRepository.findAll().size();

        // Create the Configuration

        restConfigurationMockMvc.perform(post("/api/configurations")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(configuration)))
                .andExpect(status().isCreated());

        // Validate the Configuration in the database
        List<Configuration> configurations = configurationRepository.findAll();
        assertThat(configurations).hasSize(databaseSizeBeforeCreate + 1);
        Configuration testConfiguration = configurations.get(configurations.size() - 1);
        assertThat(testConfiguration.getUserId()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testConfiguration.getConfigurationIdentifier()).isEqualTo(DEFAULT_CONFIGURATION_IDENTIFIER);
    }

    @Test
    @Transactional
    public void checkConfigurationIdentifierIsRequired() throws Exception {
        int databaseSizeBeforeTest = configurationRepository.findAll().size();
        // set the field null
        configuration.setConfigurationIdentifier(null);

        // Create the Configuration, which fails.

        restConfigurationMockMvc.perform(post("/api/configurations")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(configuration)))
                .andExpect(status().isBadRequest());

        List<Configuration> configurations = configurationRepository.findAll();
        assertThat(configurations).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllConfigurations() throws Exception {
        // Initialize the database
        configurationRepository.saveAndFlush(configuration);

        // Get all the configurations
        restConfigurationMockMvc.perform(get("/api/configurations?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(configuration.getId().intValue())))
                .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.toString())))
                .andExpect(jsonPath("$.[*].configurationIdentifier").value(hasItem(DEFAULT_CONFIGURATION_IDENTIFIER.toString())));
    }

    @Test
    @Transactional
    public void getConfiguration() throws Exception {
        // Initialize the database
        configurationRepository.saveAndFlush(configuration);

        // Get the configuration
        restConfigurationMockMvc.perform(get("/api/configurations/{id}", configuration.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(configuration.getId().intValue()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.toString()))
            .andExpect(jsonPath("$.configurationIdentifier").value(DEFAULT_CONFIGURATION_IDENTIFIER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingConfiguration() throws Exception {
        // Get the configuration
        restConfigurationMockMvc.perform(get("/api/configurations/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConfiguration() throws Exception {
        // Initialize the database
        configurationRepository.saveAndFlush(configuration);
        int databaseSizeBeforeUpdate = configurationRepository.findAll().size();

        // Update the configuration
        Configuration updatedConfiguration = new Configuration();
        updatedConfiguration.setId(configuration.getId());
        updatedConfiguration.setUserId(UPDATED_USER_ID);
        updatedConfiguration.setConfigurationIdentifier(UPDATED_CONFIGURATION_IDENTIFIER);

        restConfigurationMockMvc.perform(put("/api/configurations")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedConfiguration)))
                .andExpect(status().isOk());

        // Validate the Configuration in the database
        List<Configuration> configurations = configurationRepository.findAll();
        assertThat(configurations).hasSize(databaseSizeBeforeUpdate);
        Configuration testConfiguration = configurations.get(configurations.size() - 1);
        assertThat(testConfiguration.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testConfiguration.getConfigurationIdentifier()).isEqualTo(UPDATED_CONFIGURATION_IDENTIFIER);
    }

    @Test
    @Transactional
    public void deleteConfiguration() throws Exception {
        // Initialize the database
        configurationRepository.saveAndFlush(configuration);
        int databaseSizeBeforeDelete = configurationRepository.findAll().size();

        // Get the configuration
        restConfigurationMockMvc.perform(delete("/api/configurations/{id}", configuration.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Configuration> configurations = configurationRepository.findAll();
        assertThat(configurations).hasSize(databaseSizeBeforeDelete - 1);
    }
}
