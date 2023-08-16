package com.t0nn1x.backend.dao;

import com.t0nn1x.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}