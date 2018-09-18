package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.JBlogService;
import com.mycompany.myapp.domain.JBlog;
import com.mycompany.myapp.repository.JBlogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing JBlog.
 */
@Service
@Transactional
public class JBlogServiceImpl implements JBlogService {

    private final Logger log = LoggerFactory.getLogger(JBlogServiceImpl.class);

    private final JBlogRepository jBlogRepository;

    public JBlogServiceImpl(JBlogRepository jBlogRepository) {
        this.jBlogRepository = jBlogRepository;
    }

    /**
     * Save a jBlog.
     *
     * @param jBlog the entity to save
     * @return the persisted entity
     */
    @Override
    public JBlog save(JBlog jBlog) {
        log.debug("Request to save JBlog : {}", jBlog);        return jBlogRepository.save(jBlog);
    }

    /**
     * Get all the jBlogs.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<JBlog> findAll() {
        log.debug("Request to get all JBlogs");
        return jBlogRepository.findAll();
    }


    /**
     * Get one jBlog by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<JBlog> findOne(Long id) {
        log.debug("Request to get JBlog : {}", id);
        return jBlogRepository.findById(id);
    }

    /**
     * Delete the jBlog by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete JBlog : {}", id);
        jBlogRepository.deleteById(id);
    }
}
