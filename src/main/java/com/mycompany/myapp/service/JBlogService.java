package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.JBlog;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing JBlog.
 */
public interface JBlogService {

    /**
     * Save a jBlog.
     *
     * @param jBlog the entity to save
     * @return the persisted entity
     */
    JBlog save(JBlog jBlog);

    /**
     * Get all the jBlogs.
     *
     * @return the list of entities
     */
    List<JBlog> findAll();


    /**
     * Get the "id" jBlog.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<JBlog> findOne(Long id);

    /**
     * Delete the "id" jBlog.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
