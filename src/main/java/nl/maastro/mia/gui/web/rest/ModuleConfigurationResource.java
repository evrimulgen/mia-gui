package nl.maastro.mia.gui.web.rest;

import com.codahale.metrics.annotation.Timed;
import nl.maastro.mia.gui.domain.ModuleConfiguration;
import nl.maastro.mia.gui.repository.ModuleConfigurationRepository;
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
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ModuleConfiguration.
 */
@RestController
@RequestMapping("/api")
public class ModuleConfigurationResource {

    private final Logger log = LoggerFactory.getLogger(ModuleConfigurationResource.class);
        
    @Inject
    private ModuleConfigurationRepository moduleConfigurationRepository;
    
    /**
     * POST  /module-configurations : Create a new moduleConfiguration.
     *
     * @param moduleConfiguration the moduleConfiguration to create
     * @return the ResponseEntity with status 201 (Created) and with body the new moduleConfiguration, or with status 400 (Bad Request) if the moduleConfiguration has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/module-configurations",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ModuleConfiguration> createModuleConfiguration(@RequestBody ModuleConfiguration moduleConfiguration) throws URISyntaxException {
        log.debug("REST request to save ModuleConfiguration : {}", moduleConfiguration);
        if (moduleConfiguration.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("moduleConfiguration", "idexists", "A new moduleConfiguration cannot already have an ID")).body(null);
        }
        ModuleConfiguration result = moduleConfigurationRepository.save(moduleConfiguration);
        return ResponseEntity.created(new URI("/api/module-configurations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("moduleConfiguration", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /module-configurations : Updates an existing moduleConfiguration.
     *
     * @param moduleConfiguration the moduleConfiguration to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated moduleConfiguration,
     * or with status 400 (Bad Request) if the moduleConfiguration is not valid,
     * or with status 500 (Internal Server Error) if the moduleConfiguration couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/module-configurations",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ModuleConfiguration> updateModuleConfiguration(@RequestBody ModuleConfiguration moduleConfiguration) throws URISyntaxException {
        log.debug("REST request to update ModuleConfiguration : {}", moduleConfiguration);
        if (moduleConfiguration.getId() == null) {
            return createModuleConfiguration(moduleConfiguration);
        }
        ModuleConfiguration result = moduleConfigurationRepository.save(moduleConfiguration);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("moduleConfiguration", moduleConfiguration.getId().toString()))
            .body(result);
    }

    /**
     * GET  /module-configurations : get all the moduleConfigurations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of moduleConfigurations in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @RequestMapping(value = "/module-configurations",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<ModuleConfiguration>> getAllModuleConfigurations(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of ModuleConfigurations");
        Page<ModuleConfiguration> page = moduleConfigurationRepository.findAll(pageable); 
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/module-configurations");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /module-configurations/:id : get the "id" moduleConfiguration.
     *
     * @param id the id of the moduleConfiguration to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the moduleConfiguration, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/module-configurations/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ModuleConfiguration> getModuleConfiguration(@PathVariable Long id) {
        log.debug("REST request to get ModuleConfiguration : {}", id);
        ModuleConfiguration moduleConfiguration = moduleConfigurationRepository.findOneWithEagerRelationships(id);
        return Optional.ofNullable(moduleConfiguration)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /module-configurations/:id : delete the "id" moduleConfiguration.
     *
     * @param id the id of the moduleConfiguration to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/module-configurations/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteModuleConfiguration(@PathVariable Long id) {
        log.debug("REST request to delete ModuleConfiguration : {}", id);
        moduleConfigurationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("moduleConfiguration", id.toString())).build();
    }

}
