package com.bookmyservice.controller;

import com.bookmyservice.entity.Appointment;
import com.bookmyservice.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {
    
    @Autowired
    private AppointmentService appointmentService;
    
    @PostMapping
    public ResponseEntity<?> createAppointment(@RequestBody Appointment appointment) {
        try {
            Appointment savedAppointment = appointmentService.createAppointment(appointment);
            return ResponseEntity.ok(Map.of("success", true, "appointment", savedAppointment));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }
    
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Appointment>> getCustomerAppointments(@PathVariable Long customerId) {
        return ResponseEntity.ok(appointmentService.getCustomerAppointments(customerId));
    }
}