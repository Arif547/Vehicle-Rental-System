# 🚗 Vehicle Rental System – Backend API

**Live URL:** [https://vehicle-rental-system-tawny-pi.vercel.app/](https://vehicle-rental-system-tawny-pi.vercel.app/)

A complete backend solution for managing users, vehicles, and bookings for a vehicle rental business.
Built with clean architecture, secure authentication, role-based access control, and full CRUD operations.

---

## ✨ Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Secure password hashing
* Role-based access control (Admin & Customer)
* Admin-only routes for sensitive actions
* Customers can only manage their own bookings/profile

### 🚗 Vehicle Management

* Add, update, delete vehicles (Admin only)
* Public vehicle listing
* Prevent deleting vehicles with active bookings
* Automatic status updates: *available → booked → returned*

### 👤 User Management

* Admin can manage all users
* Customers can only update their own profile
* Prevent deleting users with active bookings
* Hidden sensitive fields such as password

### 📅 Booking Management

* Create bookings with auto price calculation
* Admin sees all bookings, customers see their own
* Auto-return system marks overdue bookings as `"returned"`
* Booking status updates: *active, cancelled, returned*
* Vehicle availability updates tied to booking lifecycle

### 🏗️ Robust Business Logic

* Total price = daily rent × rental days
* Prevent bookings on unavailable vehicles
* Strong validation & error handling
* Clean, consistent API response structure

---

## 🛠️ Technology Stack

### Backend

* Node.js, Express.js
* TypeScript

### Database

* PostgreSQL
* pg (node-postgres)

### Authentication

* JWT
* bcrypt

### Others

* dotenv
* CORS
* RESTful API design

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Arif547/Vehicle-Rental-System.git
cd vehicle-rental-system
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```
PORT=5000
DATABASE=postgresql://username:password@localhost:5432/vehicle_rental_system
JWT_KEY=your_jwt_secret
```

### 4️⃣ Initialize database

```bash
npm run init:db
```

### 5️⃣ Start development server

```bash
npm run dev
```

### 6️⃣ Production build

```bash
npm run build
npm start
```

**Base URL:** `http://localhost:5000/api/v1`

---

## 📄 API Reference

### 🔐 Authentication Endpoints

#### 1. User Registration

```
POST /auth/signup
```

**Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "phone": "01712345678",
  "role": "customer"
}
```

**Success (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": { "id": 1, "name": "John Doe", "email": "john.doe@example.com", "phone": "01712345678", "role": "customer" }
}
```

#### 2. User Login

```
POST /auth/signin
```

**Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Success (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "<JWT_TOKEN>",
    "user": { "id": 1, "name": "John Doe", "email": "john.doe@example.com", "phone": "+1234567890", "role": "customer" }
  }
}
```

---

### 🚗 Vehicle Endpoints

#### 3. Create Vehicle (Admin)

```
POST /vehicles
Authorization: Bearer <token>
```

**Body:**

```json
{
  "vehicle_name": "Toyota Camry 2024",
  "type": "car",
  "registration_number": "ABC-1234",
  "daily_rent_price": 50,
  "availability_status": "available"
}
```

#### 4. Get All Vehicles (Public)

```
GET /vehicles
```

**Response:**

```json
{
  "success": true,
  "message": "Vehicles retrieved successfully",
  "data": [ {...}, {...} ]
}
```

#### 5. Get Vehicle by ID

```
GET /vehicles/:vehicleId
```

#### 6. Update Vehicle (Admin)

```
PUT /vehicles/:vehicleId
Authorization: Bearer <token>
```

**Body (optional fields):**

```json
{
  "vehicle_name": "Toyota Camry Premium",
  "daily_rent_price": 55
}
```

#### 7. Delete Vehicle (Admin)

```
DELETE /vehicles/:vehicleId
Authorization: Bearer <token>
```

---

### 👥 User Endpoints

#### 8. Get All Users (Admin)

```
GET /users
Authorization: Bearer <token>
```

#### 9. Update User (Admin or Self)

```
PUT /users/:userId
Authorization: Bearer <token>
```

**Body (optional fields):**

```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "role": "admin"
}
```

#### 10. Delete User (Admin)

```
DELETE /users/:userId
Authorization: Bearer <token>
```

---

### 📅 Booking Endpoints

#### 11. Create Booking (Customer/Admin)

```
POST /bookings
Authorization: Bearer <token>
```

**Body:**

```json
{
  "customer_id": 1,
  "vehicle_id": 2,
  "rent_start_date": "2024-01-15",
  "rent_end_date": "2024-01-20"
}
```

#### 12. Get All Bookings

```
GET /bookings
Authorization: Bearer <token>
```

#### 13. Update Booking

```
PUT /bookings/:bookingId
Authorization: Bearer <token>
```

**Body (Customer cancel):**

```json
{ "status": "cancelled" }
```

**Body (Admin mark returned):**

```json
{ "status": "returned" }
```

---

### 🔒 Authentication Header

```
Authorization: Bearer <JWT_TOKEN>
```

---



