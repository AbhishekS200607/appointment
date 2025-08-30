package com.bookmyservice.controller;

import com.bookmyservice.entity.Service;
import com.bookmyservice.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class ServiceController {
    
    @Autowired
    private ServiceService serviceService;
    
    @GetMapping
    public ResponseEntity<List<Service>> getAllServices() {
        return ResponseEntity.ok(serviceService.getAllServices());
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Service>> searchServices(@RequestParam String name) {
        return ResponseEntity.ok(serviceService.searchByName(name));
    }
    
    @GetMapping("/location")
    public ResponseEntity<List<Service>> getServicesByLocation(@RequestParam String location) {
        return ResponseEntity.ok(serviceService.getServicesByLocation(location));
    }
    
    @PostMapping
    public ResponseEntity<Service> createService(@RequestBody Service service) {
        return ResponseEntity.ok(serviceService.createService(service));
    }
}