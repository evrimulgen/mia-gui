package nl.maastro.mia.gui.web.rest;

import com.codahale.metrics.annotation.Timed;
import nl.maastro.mia.gui.domain.VolumeOfInterest;
import nl.maastro.mia.gui.repository.VolumeOfInterestRepository;
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
 * REST controller for managing VolumeOfInterest.
 */
@RestController
@RequestMapping("/api")
public class VolumeOfInterestResource {

    private final Logger log = LoggerFactory.getLogger(VolumeOfInterestResource.class);
        
    @Inject
    private VolumeOfInterestRepository volumeOfInterestRepository;
    
    /**
     * POST  /volume-of-interests : Create a new volumeOfInterest.
     *
     * @param volumeOfInterest the volumeOfInterest to create
     * @return the ResponseEntity with status 201 (Created) and with body the new volumeOfInterest, or with status 400 (Bad Request) if the volumeOfInterest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/volume-of-interests",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<VolumeOfInterest> createVolumeOfInterest(@RequestBody VolumeOfInterest volumeOfInterest) throws URISyntaxException {
        log.debug("REST request to save VolumeOfInterest : {}", volumeOfInterest);
        if (volumeOfInterest.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("volumeOfInterest", "idexists", "A new volumeOfInterest cannot already have an ID")).body(null);
        }
        VolumeOfInterest result = volumeOfInterestRepository.save(volumeOfInterest);
        return ResponseEntity.created(new URI("/api/volume-of-interests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("volumeOfInterest", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /volume-of-interests : Updates an existing volumeOfInterest.
     *
     * @param volumeOfInterest the volumeOfInterest to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated volumeOfInterest,
     * or with status 400 (Bad Request) if the volumeOfInterest is not valid,
     * or with status 500 (Internal Server Error) if the volumeOfInterest couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/volume-of-interests",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<VolumeOfInterest> updateVolumeOfInterest(@RequestBody VolumeOfInterest volumeOfInterest) throws URISyntaxException {
        log.debug("REST request to update VolumeOfInterest : {}", volumeOfInterest);
        if (volumeOfInterest.getId() == null) {
            return createVolumeOfInterest(volumeOfInterest);
        }
        VolumeOfInterest result = volumeOfInterestRepository.save(volumeOfInterest);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("volumeOfInterest", volumeOfInterest.getId().toString()))
            .body(result);
    }

    /**
     * GET  /volume-of-interests : get all the volumeOfInterests.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of volumeOfInterests in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @RequestMapping(value = "/volume-of-interests",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<VolumeOfInterest>> getAllVolumeOfInterests(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of VolumeOfInterests");
        Page<VolumeOfInterest> page = volumeOfInterestRepository.findAll(pageable); 
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/volume-of-interests");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /volume-of-interests/:id : get the "id" volumeOfInterest.
     *
     * @param id the id of the volumeOfInterest to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the volumeOfInterest, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/volume-of-interests/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<VolumeOfInterest> getVolumeOfInterest(@PathVariable Long id) {
        log.debug("REST request to get VolumeOfInterest : {}", id);
        VolumeOfInterest volumeOfInterest = volumeOfInterestRepository.findOneWithEagerRelationships(id);
        return Optional.ofNullable(volumeOfInterest)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /volume-of-interests/:id : delete the "id" volumeOfInterest.
     *
     * @param id the id of the volumeOfInterest to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/volume-of-interests/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteVolumeOfInterest(@PathVariable Long id) {
        log.debug("REST request to delete VolumeOfInterest : {}", id);
        volumeOfInterestRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("volumeOfInterest", id.toString())).build();
    }

}
