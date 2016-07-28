package nl.maastro.mia.gui.web.rest;

import nl.maastro.mia.gui.MiaApp;
import nl.maastro.mia.gui.domain.DvhCurveResult;
import nl.maastro.mia.gui.repository.DvhCurveResultRepository;

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
 * Test class for the DvhCurveResultResource REST controller.
 *
 * @see DvhCurveResultResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = MiaApp.class)
@WebAppConfiguration
@IntegrationTest
public class DvhCurveResultResourceIntTest {

    private static final String DEFAULT_VERSION = "AAAAA";
    private static final String UPDATED_VERSION = "BBBBB";
    private static final String DEFAULT_CALCULATION_IDENTIFIER = "AAAAA";
    private static final String UPDATED_CALCULATION_IDENTIFIER = "BBBBB";
    private static final String DEFAULT_PATIENT_ID = "AAAAA";
    private static final String UPDATED_PATIENT_ID = "BBBBB";
    private static final String DEFAULT_PLAN_LABEL = "AAAAA";
    private static final String UPDATED_PLAN_LABEL = "BBBBB";
    private static final String DEFAULT_CONTAINER_ID = "AAAAA";
    private static final String UPDATED_CONTAINER_ID = "BBBBB";
    private static final String DEFAULT_VOLUME_OF_INTEREST = "AAAAA";
    private static final String UPDATED_VOLUME_OF_INTEREST = "BBBBB";
    private static final String DEFAULT_ERROR = "AAAAA";
    private static final String UPDATED_ERROR = "BBBBB";
    private static final String DEFAULT_DOSE_SOP_UID = "AAAAA";
    private static final String UPDATED_DOSE_SOP_UID = "BBBBB";
    private static final String DEFAULT_VOLUME_UNIT = "AAAAA";
    private static final String UPDATED_VOLUME_UNIT = "BBBBB";
    private static final String DEFAULT_DOSEVECTOR = "AAAAA";
    private static final String UPDATED_DOSEVECTOR = "BBBBB";
    private static final String DEFAULT_VOLUMEVECTOR = "AAAAA";
    private static final String UPDATED_VOLUMEVECTOR = "BBBBB";

    private static final Float DEFAULT_BIN_SIZE = 1F;
    private static final Float UPDATED_BIN_SIZE = 2F;

    @Inject
    private DvhCurveResultRepository dvhCurveResultRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restDvhCurveResultMockMvc;

    private DvhCurveResult dvhCurveResult;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        DvhCurveResultResource dvhCurveResultResource = new DvhCurveResultResource();
        ReflectionTestUtils.setField(dvhCurveResultResource, "dvhCurveResultRepository", dvhCurveResultRepository);
        this.restDvhCurveResultMockMvc = MockMvcBuilders.standaloneSetup(dvhCurveResultResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        dvhCurveResult = new DvhCurveResult();
        dvhCurveResult.setVersion(DEFAULT_VERSION);
        dvhCurveResult.setCalculationIdentifier(DEFAULT_CALCULATION_IDENTIFIER);
        dvhCurveResult.setPatientId(DEFAULT_PATIENT_ID);
        dvhCurveResult.setPlanLabel(DEFAULT_PLAN_LABEL);
        dvhCurveResult.setContainerId(DEFAULT_CONTAINER_ID);
        dvhCurveResult.setVolumeOfInterest(DEFAULT_VOLUME_OF_INTEREST);
        dvhCurveResult.setError(DEFAULT_ERROR);
        dvhCurveResult.setDoseSopUid(DEFAULT_DOSE_SOP_UID);
        dvhCurveResult.setVolumeUnit(DEFAULT_VOLUME_UNIT);
        dvhCurveResult.setDosevector(DEFAULT_DOSEVECTOR);
        dvhCurveResult.setVolumevector(DEFAULT_VOLUMEVECTOR);
        dvhCurveResult.setBinSize(DEFAULT_BIN_SIZE);
    }

    @Test
    @Transactional
    public void createDvhCurveResult() throws Exception {
        int databaseSizeBeforeCreate = dvhCurveResultRepository.findAll().size();

        // Create the DvhCurveResult

        restDvhCurveResultMockMvc.perform(post("/api/dvh-curve-results")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(dvhCurveResult)))
                .andExpect(status().isCreated());

        // Validate the DvhCurveResult in the database
        List<DvhCurveResult> dvhCurveResults = dvhCurveResultRepository.findAll();
        assertThat(dvhCurveResults).hasSize(databaseSizeBeforeCreate + 1);
        DvhCurveResult testDvhCurveResult = dvhCurveResults.get(dvhCurveResults.size() - 1);
        assertThat(testDvhCurveResult.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testDvhCurveResult.getCalculationIdentifier()).isEqualTo(DEFAULT_CALCULATION_IDENTIFIER);
        assertThat(testDvhCurveResult.getPatientId()).isEqualTo(DEFAULT_PATIENT_ID);
        assertThat(testDvhCurveResult.getPlanLabel()).isEqualTo(DEFAULT_PLAN_LABEL);
        assertThat(testDvhCurveResult.getContainerId()).isEqualTo(DEFAULT_CONTAINER_ID);
        assertThat(testDvhCurveResult.getVolumeOfInterest()).isEqualTo(DEFAULT_VOLUME_OF_INTEREST);
        assertThat(testDvhCurveResult.getError()).isEqualTo(DEFAULT_ERROR);
        assertThat(testDvhCurveResult.getDoseSopUid()).isEqualTo(DEFAULT_DOSE_SOP_UID);
        assertThat(testDvhCurveResult.getVolumeUnit()).isEqualTo(DEFAULT_VOLUME_UNIT);
        assertThat(testDvhCurveResult.getDosevector()).isEqualTo(DEFAULT_DOSEVECTOR);
        assertThat(testDvhCurveResult.getVolumevector()).isEqualTo(DEFAULT_VOLUMEVECTOR);
        assertThat(testDvhCurveResult.getBinSize()).isEqualTo(DEFAULT_BIN_SIZE);
    }

    @Test
    @Transactional
    public void getAllDvhCurveResults() throws Exception {
        // Initialize the database
        dvhCurveResultRepository.saveAndFlush(dvhCurveResult);

        // Get all the dvhCurveResults
        restDvhCurveResultMockMvc.perform(get("/api/dvh-curve-results?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(dvhCurveResult.getId().intValue())))
                .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION.toString())))
                .andExpect(jsonPath("$.[*].calculationIdentifier").value(hasItem(DEFAULT_CALCULATION_IDENTIFIER.toString())))
                .andExpect(jsonPath("$.[*].patientId").value(hasItem(DEFAULT_PATIENT_ID.toString())))
                .andExpect(jsonPath("$.[*].planLabel").value(hasItem(DEFAULT_PLAN_LABEL.toString())))
                .andExpect(jsonPath("$.[*].containerId").value(hasItem(DEFAULT_CONTAINER_ID.toString())))
                .andExpect(jsonPath("$.[*].volumeOfInterest").value(hasItem(DEFAULT_VOLUME_OF_INTEREST.toString())))
                .andExpect(jsonPath("$.[*].error").value(hasItem(DEFAULT_ERROR.toString())))
                .andExpect(jsonPath("$.[*].doseSopUid").value(hasItem(DEFAULT_DOSE_SOP_UID.toString())))
                .andExpect(jsonPath("$.[*].volumeUnit").value(hasItem(DEFAULT_VOLUME_UNIT.toString())))
                .andExpect(jsonPath("$.[*].dosevector").value(hasItem(DEFAULT_DOSEVECTOR.toString())))
                .andExpect(jsonPath("$.[*].volumevector").value(hasItem(DEFAULT_VOLUMEVECTOR.toString())))
                .andExpect(jsonPath("$.[*].binSize").value(hasItem(DEFAULT_BIN_SIZE.doubleValue())));
    }

    @Test
    @Transactional
    public void getDvhCurveResult() throws Exception {
        // Initialize the database
        dvhCurveResultRepository.saveAndFlush(dvhCurveResult);

        // Get the dvhCurveResult
        restDvhCurveResultMockMvc.perform(get("/api/dvh-curve-results/{id}", dvhCurveResult.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(dvhCurveResult.getId().intValue()))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION.toString()))
            .andExpect(jsonPath("$.calculationIdentifier").value(DEFAULT_CALCULATION_IDENTIFIER.toString()))
            .andExpect(jsonPath("$.patientId").value(DEFAULT_PATIENT_ID.toString()))
            .andExpect(jsonPath("$.planLabel").value(DEFAULT_PLAN_LABEL.toString()))
            .andExpect(jsonPath("$.containerId").value(DEFAULT_CONTAINER_ID.toString()))
            .andExpect(jsonPath("$.volumeOfInterest").value(DEFAULT_VOLUME_OF_INTEREST.toString()))
            .andExpect(jsonPath("$.error").value(DEFAULT_ERROR.toString()))
            .andExpect(jsonPath("$.doseSopUid").value(DEFAULT_DOSE_SOP_UID.toString()))
            .andExpect(jsonPath("$.volumeUnit").value(DEFAULT_VOLUME_UNIT.toString()))
            .andExpect(jsonPath("$.dosevector").value(DEFAULT_DOSEVECTOR.toString()))
            .andExpect(jsonPath("$.volumevector").value(DEFAULT_VOLUMEVECTOR.toString()))
            .andExpect(jsonPath("$.binSize").value(DEFAULT_BIN_SIZE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDvhCurveResult() throws Exception {
        // Get the dvhCurveResult
        restDvhCurveResultMockMvc.perform(get("/api/dvh-curve-results/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDvhCurveResult() throws Exception {
        // Initialize the database
        dvhCurveResultRepository.saveAndFlush(dvhCurveResult);
        int databaseSizeBeforeUpdate = dvhCurveResultRepository.findAll().size();

        // Update the dvhCurveResult
        DvhCurveResult updatedDvhCurveResult = new DvhCurveResult();
        updatedDvhCurveResult.setId(dvhCurveResult.getId());
        updatedDvhCurveResult.setVersion(UPDATED_VERSION);
        updatedDvhCurveResult.setCalculationIdentifier(UPDATED_CALCULATION_IDENTIFIER);
        updatedDvhCurveResult.setPatientId(UPDATED_PATIENT_ID);
        updatedDvhCurveResult.setPlanLabel(UPDATED_PLAN_LABEL);
        updatedDvhCurveResult.setContainerId(UPDATED_CONTAINER_ID);
        updatedDvhCurveResult.setVolumeOfInterest(UPDATED_VOLUME_OF_INTEREST);
        updatedDvhCurveResult.setError(UPDATED_ERROR);
        updatedDvhCurveResult.setDoseSopUid(UPDATED_DOSE_SOP_UID);
        updatedDvhCurveResult.setVolumeUnit(UPDATED_VOLUME_UNIT);
        updatedDvhCurveResult.setDosevector(UPDATED_DOSEVECTOR);
        updatedDvhCurveResult.setVolumevector(UPDATED_VOLUMEVECTOR);
        updatedDvhCurveResult.setBinSize(UPDATED_BIN_SIZE);

        restDvhCurveResultMockMvc.perform(put("/api/dvh-curve-results")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedDvhCurveResult)))
                .andExpect(status().isOk());

        // Validate the DvhCurveResult in the database
        List<DvhCurveResult> dvhCurveResults = dvhCurveResultRepository.findAll();
        assertThat(dvhCurveResults).hasSize(databaseSizeBeforeUpdate);
        DvhCurveResult testDvhCurveResult = dvhCurveResults.get(dvhCurveResults.size() - 1);
        assertThat(testDvhCurveResult.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testDvhCurveResult.getCalculationIdentifier()).isEqualTo(UPDATED_CALCULATION_IDENTIFIER);
        assertThat(testDvhCurveResult.getPatientId()).isEqualTo(UPDATED_PATIENT_ID);
        assertThat(testDvhCurveResult.getPlanLabel()).isEqualTo(UPDATED_PLAN_LABEL);
        assertThat(testDvhCurveResult.getContainerId()).isEqualTo(UPDATED_CONTAINER_ID);
        assertThat(testDvhCurveResult.getVolumeOfInterest()).isEqualTo(UPDATED_VOLUME_OF_INTEREST);
        assertThat(testDvhCurveResult.getError()).isEqualTo(UPDATED_ERROR);
        assertThat(testDvhCurveResult.getDoseSopUid()).isEqualTo(UPDATED_DOSE_SOP_UID);
        assertThat(testDvhCurveResult.getVolumeUnit()).isEqualTo(UPDATED_VOLUME_UNIT);
        assertThat(testDvhCurveResult.getDosevector()).isEqualTo(UPDATED_DOSEVECTOR);
        assertThat(testDvhCurveResult.getVolumevector()).isEqualTo(UPDATED_VOLUMEVECTOR);
        assertThat(testDvhCurveResult.getBinSize()).isEqualTo(UPDATED_BIN_SIZE);
    }

    @Test
    @Transactional
    public void deleteDvhCurveResult() throws Exception {
        // Initialize the database
        dvhCurveResultRepository.saveAndFlush(dvhCurveResult);
        int databaseSizeBeforeDelete = dvhCurveResultRepository.findAll().size();

        // Get the dvhCurveResult
        restDvhCurveResultMockMvc.perform(delete("/api/dvh-curve-results/{id}", dvhCurveResult.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<DvhCurveResult> dvhCurveResults = dvhCurveResultRepository.findAll();
        assertThat(dvhCurveResults).hasSize(databaseSizeBeforeDelete - 1);
    }
}
