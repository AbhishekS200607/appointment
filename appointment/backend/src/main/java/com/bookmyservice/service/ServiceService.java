package com.bookmyservice.service;

import com.bookmyservice.entity.Service;
import com.bookmyservice.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@org.springframework.stereotype.Service
public class ServiceService {
    
    @Autowired
    private ServiceRepository serviceRepository;
    
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }
    
    public List<Service> searchByName(String name) {
        return serviceRepository.findByNameContainingIgnoreCase(name);
    }
    
    public List<Service> getServicesByLocation(String location) {
        return serviceRepository.findByLocationContainingIgnoreCase(location);
    }
    
    public Service createService(Service service) {
        return serviceRepository.save(service);
    }
}