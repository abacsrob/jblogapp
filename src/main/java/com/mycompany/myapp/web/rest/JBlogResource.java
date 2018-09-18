package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.JBlog;
import com.mycompany.myapp.service.JBlogService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing JBlog.
 */
@RestController
@RequestMapping("/api")
public class JBlogResource {

    private final Logger log = LoggerFactory.getLogger(JBlogResource.class);

    private static final String ENTITY_NAME = "jBlog";

    private final JBlogService jBlogService;

    public JBlogResource(JBlogService jBlogService) {
        this.jBlogService = jBlogService;
    }

    /**
     * POST  /j-blogs : Create a new jBlog.
     *
     * @param jBlog the jBlog to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jBlog, or with status 400 (Bad Request) if the jBlog has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/j-blogs")
    @Timed
    public ResponseEntity<JBlog> createJBlog(@Valid @RequestBody JBlog jBlog) throws URISyntaxException {
        log.debug("REST request to save JBlog : {}", jBlog);
        if (jBlog.getId() != null) {
            throw new BadRequestAlertException("A new jBlog cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JBlog result = jBlogService.save(jBlog);
        return ResponseEntity.created(new URI("/api/j-blogs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /j-blogs : Updates an existing jBlog.
     *
     * @param jBlog the jBlog to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jBlog,
     * or with status 400 (Bad Request) if the jBlog is not valid,
     * or with status 500 (Internal Server Error) if the jBlog couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/j-blogs")
    @Timed
    public ResponseEntity<JBlog> updateJBlog(@Valid @RequestBody JBlog jBlog) throws URISyntaxException {
        log.debug("REST request to update JBlog : {}", jBlog);
        if (jBlog.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        JBlog result = jBlogService.save(jBlog);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jBlog.getId().toString()))
            .body(result);
    }

    /**
     * GET  /j-blogs : get all the jBlogs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of jBlogs in body
     */
    @GetMapping("/j-blogs")
    @Timed
    public List<JBlog> getAllJBlogs() {
        log.debug("REST request to get all JBlogs");
        return jBlogService.findAll();
    }

    /**
     * GET  /j-blogs/:id : get the "id" jBlog.
     *
     * @param id the id of the jBlog to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jBlog, or with status 404 (Not Found)
     */
    @GetMapping("/j-blogs/{id}")
    @Timed
    public ResponseEntity<JBlog> getJBlog(@PathVariable Long id) {
        log.debug("REST request to get JBlog : {}", id);
        Optional<JBlog> jBlog = jBlogService.findOne(id);
        return ResponseUtil.wrapOrNotFound(jBlog);
    }

    /**
     * DELETE  /j-blogs/:id : delete the "id" jBlog.
     *
     * @param id the id of the jBlog to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/j-blogs/{id}")
    @Timed
    public ResponseEntity<Void> deleteJBlog(@PathVariable Long id) {
        log.debug("REST request to delete JBlog : {}", id);
        jBlogService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
