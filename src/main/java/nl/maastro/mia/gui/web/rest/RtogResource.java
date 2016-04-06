package nl.maastro.mia.gui.web.rest;

import com.codahale.metrics.annotation.Timed;
import nl.maastro.mia.gui.domain.Rtog;
import nl.maastro.mia.gui.repository.RtogRepository;
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
 * REST controller for managing Rtog.
 */
@RestController
@RequestMapping("/api")
public class RtogResource {

    private final Logger log = LoggerFactory.getLogger(RtogResource.class);
        
    @Inject
    private RtogRepository rtogRepository;
    
    /**
     * POST  /rtogs : Create a new rtog.
     *
     * @param rtog the rtog to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rtog, or with status 400 (Bad Request) if the rtog has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/rtogs",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Rtog> createRtog(@RequestBody Rtog rtog) throws URISyntaxException {
        log.debug("REST request to save Rtog : {}", rtog);
        if (rtog.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("rtog", "idexists", "A new rtog cannot already have an ID")).body(null);
        }
        Rtog result = rtogRepository.save(rtog);
        return ResponseEntity.created(new URI("/api/rtogs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("rtog", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rtogs : Updates an existing rtog.
     *
     * @param rtog the rtog to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rtog,
     * or with status 400 (Bad Request) if the rtog is not valid,
     * or with status 500 (Internal Server Error) if the rtog couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/rtogs",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Rtog> updateRtog(@RequestBody Rtog rtog) throws URISyntaxException {
        log.debug("REST request to update Rtog : {}", rtog);
        if (rtog.getId() == null) {
            return createRtog(rtog);
        }
        Rtog result = rtogRepository.save(rtog);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("rtog", rtog.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rtogs : get all the rtogs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of rtogs in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @RequestMapping(value = "/rtogs",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Rtog>> getAllRtogs(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Rtogs");
        Page<Rtog> page = rtogRepository.findAll(pageable); 
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/rtogs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /rtogs/:id : get the "id" rtog.
     *
     * @param id the id of the rtog to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rtog, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/rtogs/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Rtog> getRtog(@PathVariable Long id) {
        log.debug("REST request to get Rtog : {}", id);
        Rtog rtog = rtogRepository.findOne(id);
        return Optional.ofNullable(rtog)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /rtogs/:id : delete the "id" rtog.
     *
     * @param id the id of the rtog to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/rtogs/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteRtog(@PathVariable Long id) {
        log.debug("REST request to delete Rtog : {}", id);
        rtogRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("rtog", id.toString())).build();
    }

}
