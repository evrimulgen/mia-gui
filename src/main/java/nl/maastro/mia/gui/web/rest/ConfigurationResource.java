package nl.maastro.mia.gui.web.rest;

import com.codahale.metrics.annotation.Timed;
import nl.maastro.mia.gui.domain.Configuration;
import nl.maastro.mia.gui.repository.ConfigurationRepository;
import nl.maastro.mia.gui.web.rest.util.HeaderUtil;
import nl.maastro.mia.gui.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Configuration.
 */
@RestController
@RequestMapping("/api")
public class ConfigurationResource {

    private final Logger log = LoggerFactory.getLogger(ConfigurationResource.class);
        
    @Inject
    private ConfigurationRepository configurationRepository;
    
    /**
     * POST  /configurations : Create a new configuration.
     *
     * @param configuration the configuration to create
     * @return the ResponseEntity with status 201 (Created) and with body the new configuration, or with status 400 (Bad Request) if the configuration has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/configurations",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Configuration> createConfiguration(@Valid @RequestBody Configuration configuration) throws URISyntaxException {
        log.debug("REST request to save Configuration : {}", configuration);
        if (configuration.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("configuration", "idexists", "A new configuration cannot already have an ID")).body(null);
        }
        Configuration result = configurationRepository.save(configuration);
        return ResponseEntity.created(new URI("/api/configurations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("configuration", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /configurations : Updates an existing configuration.
     *
     * @param configuration the configuration to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated configuration,
     * or with status 400 (Bad Request) if the configuration is not valid,
     * or with status 500 (Internal Server Error) if the configuration couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/configurations",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Configuration> updateConfiguration(@Valid @RequestBody Configuration configuration) throws URISyntaxException {
        log.debug("REST request to update Configuration : {}", configuration);
        if (configuration.getId() == null) {
            return createConfiguration(configuration);
        }
        Configuration result = configurationRepository.save(configuration);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("configuration", configuration.getId().toString()))
            .body(result);
    }

    /**
     * GET  /configurations : get all the configurations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of configurations in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @RequestMapping(value = "/configurations",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Configuration>> getAllConfigurations(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Configurations");
        Page<Configuration> page = configurationRepository.findAll(pageable); 
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/configurations");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /configurations/:id : get the "id" configuration.
     *
     * @param id the id of the configuration to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the configuration, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/configurations/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Configuration> getConfiguration(@PathVariable Long id) {
        log.debug("REST request to get Configuration : {}", id);
        Configuration configuration = configurationRepository.findOne(id);
        return Optional.ofNullable(configuration)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /configurations/:id : delete the "id" configuration.
     *
     * @param id the id of the configuration to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/configurations/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteConfiguration(@PathVariable Long id) {
        log.debug("REST request to delete Configuration : {}", id);
        configurationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("configuration", id.toString())).build();
    }

}
