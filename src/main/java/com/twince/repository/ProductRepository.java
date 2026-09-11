package com.twince.repository;

import com.twince.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("twinceProductRepository")
public interface ProductRepository extends JpaRepository<Product, Long> {
}

