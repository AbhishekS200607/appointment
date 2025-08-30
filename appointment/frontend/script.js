const API_BASE = 'http://localhost:8080/api';
let currentUser = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    checkAutoLogin();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('loginFormElement').addEventListener('submit', handleLogin);
    document.getElementById('registerFormElement').addEventListener('submit', handleRegister);
}

function checkAutoLogin() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    showLoading('loginFormElement');
    
    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            currentUser = data.user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showSuccess('Login successful!');
            setTimeout(() => showDashboard(), 1500);
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please check if the server is running.');
    }
    
    hideLoading('loginFormElement');
}

async function handleRegister(e) {
    e.preventDefault();
    const userData = {
        fullName: document.getElementById('regFullName').value,
        username: document.getElementById('regUsername').value,
        email: document.getElementById('regEmail').value,
        phone: document.getElementById('regPhone').value,
        password: document.getElementById('regPassword').value
    };
    
    showLoading('registerFormElement');
    
    try {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Registration successful!');
            setTimeout(() => showLogin(), 1500);
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please check if the server is running.');
    }
    
    hideLoading('registerFormElement');
}

function showLogin() {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('registerForm').classList.remove('active');
    document.getElementById('dashboard').classList.remove('active');
}

function showRegister() {
    document.getElementById('registerForm').classList.add('active');
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('dashboard').classList.remove('active');
}

function showDashboard() {
    document.getElementById('dashboard').classList.add('active');
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('registerForm').classList.remove('active');
    
    // Hide left panel after login
    document.querySelector('.left-panel').style.display = 'none';
    document.querySelector('.right-panel').style.flex = '1';
    
    document.getElementById('userName').textContent = currentUser.fullName || currentUser.username;
    loadServices();
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    
    // Show left panel again
    document.querySelector('.left-panel').style.display = 'flex';
    document.querySelector('.right-panel').style.flex = '1';
    
    showLogin();
}

function showServices() {
    document.querySelector('.nav-btn.active').classList.remove('active');
    document.querySelectorAll('.nav-btn')[0].classList.add('active');
    document.getElementById('servicesSection').classList.add('active');
    document.getElementById('appointmentsSection').classList.remove('active');
}

function showAppointments() {
    document.querySelector('.nav-btn.active').classList.remove('active');
    document.querySelectorAll('.nav-btn')[1].classList.add('active');
    document.getElementById('appointmentsSection').classList.add('active');
    document.getElementById('servicesSection').classList.remove('active');
    loadAppointments();
}

async function loadServices() {
    try {
        const response = await fetch(`${API_BASE}/services`);
        const services = await response.json();
        displayServices(services);
    } catch (error) {
        console.error('Error loading services:', error);
        displaySampleServices();
    }
}

function displayServices(services) {
    const servicesList = document.getElementById('servicesList');
    
    if (services.length === 0) {
        displaySampleServices();
        return;
    }
    
    servicesList.innerHTML = services.map(service => `
        <div class="service-card" onclick="bookService(${service.id})">
            <div class="service-header">
                <div>
                    <div class="service-name">${service.name}</div>
                    <div class="service-details">${service.category} • ${service.duration} mins</div>
                </div>
                <div class="service-price">₹${service.price}</div>
            </div>
            <div class="service-location">📍 ${service.location || 'Multiple locations'}</div>
        </div>
    `).join('');
}

function displaySampleServices() {
    const sampleServices = [
        { id: 1, name: 'General Health Checkup', category: 'Healthcare', duration: 30, price: 800, location: 'Thiruvananthapuram, Pattom' },
        { id: 2, name: 'Dental Cleaning', category: 'Dental', duration: 45, price: 1200, location: 'Kochi, Ernakulam' },
        { id: 3, name: 'Hair Cut & Styling', category: 'Beauty', duration: 60, price: 600, location: 'Kottayam, MC Road' },
        { id: 4, name: 'Full Body Massage', category: 'Wellness', duration: 90, price: 1500, location: 'Alappuzha, Beach Road' },
        { id: 5, name: 'Physiotherapy Session', category: 'Therapy', duration: 45, price: 800, location: 'Kollam, Chinnakada' },
        { id: 6, name: 'Yoga Session', category: 'Wellness', duration: 60, price: 600, location: 'Palakkad, Fort Maidan' },
        { id: 7, name: 'Eye Checkup', category: 'Healthcare', duration: 30, price: 500, location: 'Kasaragod, Vidyanagar' },
        { id: 8, name: 'Facial Treatment', category: 'Beauty', duration: 75, price: 800, location: 'Thrissur, Round South' }
    ];
    
    displayServices(sampleServices);
}

async function searchServices() {
    const location = document.getElementById('locationSearch').value;
    if (!location) {
        loadServices();
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/services/location?location=${encodeURIComponent(location)}`);
        const services = await response.json();
        displayServices(services);
    } catch (error) {
        console.error('Error searching services:', error);
        // Show filtered sample services based on location
        displaySampleServices();
    }
}

let selectedServiceData = null;

function bookService(serviceId) {
    const services = [
        { id: 1, name: 'General Health Checkup', category: 'Healthcare', duration: 30, price: 800, location: 'Thiruvananthapuram, Pattom' },
        { id: 2, name: 'Dental Cleaning', category: 'Dental', duration: 45, price: 1200, location: 'Kochi, Ernakulam' },
        { id: 3, name: 'Hair Cut & Styling', category: 'Beauty', duration: 60, price: 600, location: 'Kottayam, MC Road' },
        { id: 4, name: 'Full Body Massage', category: 'Wellness', duration: 90, price: 1500, location: 'Alappuzha, Beach Road' },
        { id: 5, name: 'Physiotherapy Session', category: 'Therapy', duration: 45, price: 800, location: 'Kollam, Chinnakada' },
        { id: 6, name: 'Yoga Session', category: 'Wellness', duration: 60, price: 600, location: 'Palakkad, Fort Maidan' },
        { id: 7, name: 'Eye Checkup', category: 'Healthcare', duration: 30, price: 500, location: 'Kasaragod, Vidyanagar' },
        { id: 8, name: 'Facial Treatment', category: 'Beauty', duration: 75, price: 800, location: 'Thrissur, Round South' }
    ];
    
    selectedServiceData = services.find(s => s.id === serviceId);
    if (selectedServiceData) {
        document.getElementById('selectedService').innerHTML = `
            <div class="service-card">
                <div class="service-name">${selectedServiceData.name}</div>
                <div class="service-details">${selectedServiceData.category} • ${selectedServiceData.duration} mins • ₹${selectedServiceData.price}</div>
                <div class="service-location">📍 ${selectedServiceData.location}</div>
            </div>
        `;
        
        const now = new Date();
        now.setHours(now.getHours() + 1);
        document.getElementById('appointmentDateTime').min = now.toISOString().slice(0, 16);
        
        document.getElementById('bookingModal').style.display = 'flex';
        document.getElementById('bookingForm').addEventListener('submit', handleBooking);
    }
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.getElementById('bookingForm').removeEventListener('submit', handleBooking);
}

async function handleBooking(e) {
    e.preventDefault();
    
    const appointmentData = {
        customerId: currentUser.id,
        serviceId: selectedServiceData.id,
        appointmentDateTime: document.getElementById('appointmentDateTime').value,
        totalAmount: selectedServiceData.price,
        notes: document.getElementById('appointmentNotes').value,
        paymentMethod: document.getElementById('paymentMethod').value
    };
    
    try {
        const response = await fetch(`${API_BASE}/appointments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointmentData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            closeBookingModal();
            showSuccess('Appointment booked & payment successful!');
            document.getElementById('appointmentDateTime').value = '';
            document.getElementById('appointmentNotes').value = '';
            document.getElementById('paymentMethod').value = '';
        } else {
            alert(data.message || 'Booking failed');
        }
    } catch (error) {
        console.error('Booking error:', error);
        alert('Booking failed. Please try again.');
    }
}

async function loadAppointments() {
    const appointmentsList = document.getElementById('appointmentsList');
    
    try {
        const response = await fetch(`${API_BASE}/appointments/customer/${currentUser.id}`);
        const appointments = await response.json();
        
        if (appointments.length === 0) {
            appointmentsList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #666;">
                    <h3>No appointments yet</h3>
                    <p>Book your first appointment to see it here!</p>
                </div>
            `;
        } else {
            appointmentsList.innerHTML = appointments.map(apt => `
                <div class="service-card">
                    <div class="service-header">
                        <div>
                            <div class="service-name">Appointment #${apt.id}</div>
                            <div class="service-details">${new Date(apt.appointmentDateTime).toLocaleString()}</div>
                        </div>
                        <div class="service-price">₹${apt.totalAmount}</div>
                    </div>
                    <div class="service-location">Status: ${apt.status} | Payment: ${apt.paymentStatus}</div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading appointments:', error);
        appointmentsList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <h3>No appointments yet</h3>
                <p>Book your first appointment to see it here!</p>
            </div>
        `;
    }
}

function showLoading(formId) {
    const form = document.getElementById(formId);
    const button = form.querySelector('button[type="submit"]');
    const btnText = button.querySelector('.btn-text');
    const spinner = button.querySelector('.loading-spinner');
    
    btnText.style.display = 'none';
    spinner.style.display = 'block';
    button.disabled = true;
}

function hideLoading(formId) {
    const form = document.getElementById(formId);
    const button = form.querySelector('button[type="submit"]');
    const btnText = button.querySelector('.btn-text');
    const spinner = button.querySelector('.loading-spinner');
    
    btnText.style.display = 'block';
    spinner.style.display = 'none';
    button.disabled = false;
}

function filterServices() {
    const category = document.getElementById('categoryFilter').value;
    const services = [
        { id: 1, name: 'General Health Checkup', category: 'Healthcare', duration: 30, price: 800, location: 'Thiruvananthapuram, Pattom' },
        { id: 2, name: 'Dental Cleaning', category: 'Dental', duration: 45, price: 1200, location: 'Kochi, Ernakulam' },
        { id: 3, name: 'Hair Cut & Styling', category: 'Beauty', duration: 60, price: 600, location: 'Kottayam, MC Road' },
        { id: 4, name: 'Full Body Massage', category: 'Wellness', duration: 90, price: 1500, location: 'Alappuzha, Beach Road' },
        { id: 5, name: 'Physiotherapy Session', category: 'Therapy', duration: 45, price: 800, location: 'Kollam, Chinnakada' },
        { id: 6, name: 'Yoga Session', category: 'Wellness', duration: 60, price: 600, location: 'Palakkad, Fort Maidan' },
        { id: 7, name: 'Eye Checkup', category: 'Healthcare', duration: 30, price: 500, location: 'Kasaragod, Vidyanagar' },
        { id: 8, name: 'Facial Treatment', category: 'Beauty', duration: 75, price: 800, location: 'Thrissur, Round South' }
    ];
    
    const filtered = category ? services.filter(s => s.category === category) : services;
    displayServices(filtered);
}

function showSuccess(message) {
    document.getElementById('successMessage').textContent = message;
    document.getElementById('successAnimation').style.display = 'flex';
    
    setTimeout(() => {
        document.getElementById('successAnimation').style.display = 'none';
    }, 2000);
}