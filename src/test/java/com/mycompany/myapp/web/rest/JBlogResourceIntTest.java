package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JblogappApp;

import com.mycompany.myapp.domain.JBlog;
import com.mycompany.myapp.repository.JBlogRepository;
import com.mycompany.myapp.service.JBlogService;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the JBlogResource REST controller.
 *
 * @see JBlogResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JblogappApp.class)
public class JBlogResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_BODY = "AAAAAAAAAA";
    private static final String UPDATED_BODY = "BBBBBBBBBB";

    private static final String DEFAULT_AUTHOR = "AAAAAAAAAA";
    private static final String UPDATED_AUTHOR = "BBBBBBBBBB";

    @Autowired
    private JBlogRepository jBlogRepository;
    
    @Autowired
    private JBlogService jBlogService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restJBlogMockMvc;

    private JBlog jBlog;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JBlogResource jBlogResource = new JBlogResource(jBlogService);
        this.restJBlogMockMvc = MockMvcBuilders.standaloneSetup(jBlogResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static JBlog createEntity(EntityManager em) {
        JBlog jBlog = new JBlog()
            .title(DEFAULT_TITLE)
            .body(DEFAULT_BODY)
            .author(DEFAULT_AUTHOR);
        return jBlog;
    }

    @Before
    public void initTest() {
        jBlog = createEntity(em);
    }

    @Test
    @Transactional
    public void createJBlog() throws Exception {
        int databaseSizeBeforeCreate = jBlogRepository.findAll().size();

        // Create the JBlog
        restJBlogMockMvc.perform(post("/api/j-blogs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jBlog)))
            .andExpect(status().isCreated());

        // Validate the JBlog in the database
        List<JBlog> jBlogList = jBlogRepository.findAll();
        assertThat(jBlogList).hasSize(databaseSizeBeforeCreate + 1);
        JBlog testJBlog = jBlogList.get(jBlogList.size() - 1);
        assertThat(testJBlog.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testJBlog.getBody()).isEqualTo(DEFAULT_BODY);
        assertThat(testJBlog.getAuthor()).isEqualTo(DEFAULT_AUTHOR);
    }

    @Test
    @Transactional
    public void createJBlogWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jBlogRepository.findAll().size();

        // Create the JBlog with an existing ID
        jBlog.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJBlogMockMvc.perform(post("/api/j-blogs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jBlog)))
            .andExpect(status().isBadRequest());

        // Validate the JBlog in the database
        List<JBlog> jBlogList = jBlogRepository.findAll();
        assertThat(jBlogList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = jBlogRepository.findAll().size();
        // set the field null
        jBlog.setTitle(null);

        // Create the JBlog, which fails.

        restJBlogMockMvc.perform(post("/api/j-blogs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jBlog)))
            .andExpect(status().isBadRequest());

        List<JBlog> jBlogList = jBlogRepository.findAll();
        assertThat(jBlogList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAuthorIsRequired() throws Exception {
        int databaseSizeBeforeTest = jBlogRepository.findAll().size();
        // set the field null
        jBlog.setAuthor(null);

        // Create the JBlog, which fails.

        restJBlogMockMvc.perform(post("/api/j-blogs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jBlog)))
            .andExpect(status().isBadRequest());

        List<JBlog> jBlogList = jBlogRepository.findAll();
        assertThat(jBlogList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllJBlogs() throws Exception {
        // Initialize the database
        jBlogRepository.saveAndFlush(jBlog);

        // Get all the jBlogList
        restJBlogMockMvc.perform(get("/api/j-blogs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jBlog.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].body").value(hasItem(DEFAULT_BODY.toString())))
            .andExpect(jsonPath("$.[*].author").value(hasItem(DEFAULT_AUTHOR.toString())));
    }
    
    @Test
    @Transactional
    public void getJBlog() throws Exception {
        // Initialize the database
        jBlogRepository.saveAndFlush(jBlog);

        // Get the jBlog
        restJBlogMockMvc.perform(get("/api/j-blogs/{id}", jBlog.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jBlog.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.body").value(DEFAULT_BODY.toString()))
            .andExpect(jsonPath("$.author").value(DEFAULT_AUTHOR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingJBlog() throws Exception {
        // Get the jBlog
        restJBlogMockMvc.perform(get("/api/j-blogs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJBlog() throws Exception {
        // Initialize the database
        jBlogService.save(jBlog);

        int databaseSizeBeforeUpdate = jBlogRepository.findAll().size();

        // Update the jBlog
        JBlog updatedJBlog = jBlogRepository.findById(jBlog.getId()).get();
        // Disconnect from session so that the updates on updatedJBlog are not directly saved in db
        em.detach(updatedJBlog);
        updatedJBlog
            .title(UPDATED_TITLE)
            .body(UPDATED_BODY)
            .author(UPDATED_AUTHOR);

        restJBlogMockMvc.perform(put("/api/j-blogs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJBlog)))
            .andExpect(status().isOk());

        // Validate the JBlog in the database
        List<JBlog> jBlogList = jBlogRepository.findAll();
        assertThat(jBlogList).hasSize(databaseSizeBeforeUpdate);
        JBlog testJBlog = jBlogList.get(jBlogList.size() - 1);
        assertThat(testJBlog.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testJBlog.getBody()).isEqualTo(UPDATED_BODY);
        assertThat(testJBlog.getAuthor()).isEqualTo(UPDATED_AUTHOR);
    }

    @Test
    @Transactional
    public void updateNonExistingJBlog() throws Exception {
        int databaseSizeBeforeUpdate = jBlogRepository.findAll().size();

        // Create the JBlog

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restJBlogMockMvc.perform(put("/api/j-blogs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jBlog)))
            .andExpect(status().isBadRequest());

        // Validate the JBlog in the database
        List<JBlog> jBlogList = jBlogRepository.findAll();
        assertThat(jBlogList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteJBlog() throws Exception {
        // Initialize the database
        jBlogService.save(jBlog);

        int databaseSizeBeforeDelete = jBlogRepository.findAll().size();

        // Get the jBlog
        restJBlogMockMvc.perform(delete("/api/j-blogs/{id}", jBlog.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<JBlog> jBlogList = jBlogRepository.findAll();
        assertThat(jBlogList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JBlog.class);
        JBlog jBlog1 = new JBlog();
        jBlog1.setId(1L);
        JBlog jBlog2 = new JBlog();
        jBlog2.setId(jBlog1.getId());
        assertThat(jBlog1).isEqualTo(jBlog2);
        jBlog2.setId(2L);
        assertThat(jBlog1).isNotEqualTo(jBlog2);
        jBlog1.setId(null);
        assertThat(jBlog1).isNotEqualTo(jBlog2);
    }
}
