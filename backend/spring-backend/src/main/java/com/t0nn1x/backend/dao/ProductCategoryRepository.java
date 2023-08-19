package com.t0nn1x.backend.dao;

import com.t0nn1x.backend.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "products-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
