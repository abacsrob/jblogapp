package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.JBlog;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the JBlog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JBlogRepository extends JpaRepository<JBlog, Long> {

}
