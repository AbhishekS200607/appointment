# 🏥 BookMyService - Appointment Booking System

A modern, full-stack web application for booking appointments with healthcare providers, beauty salons, and wellness centers.

## 🚀 Quick Start

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   
   The backend will start on `http://localhost:8080`

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 3000
   
   # Using Node.js
   npx serve .
   ```

## 🔑 Default Login Credentials

- **Admin**: username: `admin`, password: `admin123`
- **Customer**: username: `customer`, password: `customer123`

## 🛠️ Technology Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- H2 Database (development)
- Maven

### Frontend
- HTML5, CSS3, JavaScript
- Inter Font
- CSS Grid & Flexbox
- CSS Animations

## 📊 Features

✅ **Implemented:**
- User registration and login
- Modern split-screen UI design
- Service browsing and search
- Location-based service discovery
- Responsive design
- Success animations
- Sample data with 15+ services

🚧 **Coming Soon:**
- Complete booking flow
- Payment integration
- Appointment management
- Email notifications
- Admin dashboard

## 🎨 UI Features

- **Split-screen Layout**: Branding panel + forms
- **Smooth Animations**: Slide-up cards, floating backgrounds
- **Interactive Elements**: Hover effects, loading spinners
- **Success Feedback**: Animated checkmarks
- **Mobile Responsive**: Works on all devices

## 🔧 Development

### Database Access
- H2 Console: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (empty)

### API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/services` - Get all services
- `GET /api/services/search?name={name}` - Search services
- `GET /api/services/location?location={location}` - Location-based search

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎯 Next Steps

1. **Complete Booking Flow**: Add appointment creation
2. **Payment Integration**: Implement payment processing
3. **Dashboard Enhancement**: Add appointment management
4. **Notifications**: Email and SMS alerts
5. **Advanced Features**: Calendar sync, reviews, ratings

---

**Note**: This is a development version with sample data. The password for default users is `admin123` and `customer123` (BCrypt encoded in database).