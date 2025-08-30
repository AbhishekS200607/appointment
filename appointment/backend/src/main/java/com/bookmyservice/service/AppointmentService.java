package com.bookmyservice.service;

import com.bookmyservice.entity.Appointment;
import com.bookmyservice.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AppointmentService {
    
    @Autowired
    private AppointmentRepository appointmentRepository;
    
    public Appointment createAppointment(Appointment appointment) {
        appointment.setPaymentId("PAY_" + UUID.randomUUID().toString().substring(0, 8));
        appointment.setPaymentStatus(Appointment.PaymentStatus.PAID);
        appointment.setStatus(Appointment.Status.CONFIRMED);
        return appointmentRepository.save(appointment);
    }
    
    public List<Appointment> getCustomerAppointments(Long customerId) {
        return appointmentRepository.findByCustomerId(customerId);
    }
}