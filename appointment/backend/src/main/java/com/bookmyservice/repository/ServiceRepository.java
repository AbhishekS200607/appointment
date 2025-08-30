package com.bookmyservice.repository;

import com.bookmyservice.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    List<Service> findByNameContainingIgnoreCase(String name);
    List<Service> findByLocationContainingIgnoreCase(String location);
    List<Service> findByCategory(String category);
}