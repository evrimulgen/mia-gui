package nl.maastro.mia.gui.web.rest;

import com.codahale.metrics.annotation.Timed;
import nl.maastro.mia.gui.domain.Computation;
import nl.maastro.mia.gui.repository.ComputationRepository;
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
 * REST controller for managing Computation.
 */
@RestController
@RequestMapping("/api")
public class ComputationResource {

    private final Logger log = LoggerFactory.getLogger(ComputationResource.class);
        
    @Inject
    private ComputationRepository computationRepository;
    
    /**
     * POST  /computations : Create a new computation.
     *
     * @param computation the computation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new computation, or with status 400 (Bad Request) if the computation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/computations",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Computation> createComputation(@Valid @RequestBody Computation computation) throws URISyntaxException {
        log.debug("REST request to save Computation : {}", computation);
        if (computation.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("computation", "idexists", "A new computation cannot already have an ID")).body(null);
        }
        Computation result = computationRepository.save(computation);
        return ResponseEntity.created(new URI("/api/computations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("computation", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /computations : Updates an existing computation.
     *
     * @param computation the computation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated computation,
     * or with status 400 (Bad Request) if the computation is not valid,
     * or with status 500 (Internal Server Error) if the computation couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/computations",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Computation> updateComputation(@Valid @RequestBody Computation computation) throws URISyntaxException {
        log.debug("REST request to update Computation : {}", computation);
        if (computation.getId() == null) {
            return createComputation(computation);
        }
        Computation result = computationRepository.save(computation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("computation", computation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /computations : get all the computations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of computations in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @RequestMapping(value = "/computations",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Computation>> getAllComputations(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Computations");
        Page<Computation> page = computationRepository.findAll(pageable); 
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/computations");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /computations/:id : get the "id" computation.
     *
     * @param id the id of the computation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the computation, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/computations/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Computation> getComputation(@PathVariable Long id) {
        log.debug("REST request to get Computation : {}", id);
        Computation computation = computationRepository.findOne(id);
        return Optional.ofNullable(computation)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /computations/:id : delete the "id" computation.
     *
     * @param id the id of the computation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/computations/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteComputation(@PathVariable Long id) {
        log.debug("REST request to delete Computation : {}", id);
        computationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("computation", id.toString())).build();
    }

}
