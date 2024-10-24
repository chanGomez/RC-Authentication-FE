# 🔐 Authentication App

A full-stack authentication project that includes robust security features like JWT authentication, Redis-based session management, and user login tracking. This project leverages ReactJS for the frontend and Node.js for the backend, with PostgreSQL for persistent data storage.

#### Backend Link = https://github.com/chanGomez/RC-Authentication-BE

##  Table of Contents
- [Features](#features)
- [Security Features](#security-features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)

## 🎯 Features
- **JWT Authentication**: Secure user authentication with JSON Web Tokens.
- **Session Management**: Session data stored in Redis for scalable performance.
- **Password Reset Functionality**: Secure password reset with tokenized URLs.
- **Failed Login Tracking**: Tracks failed login attempts for security monitoring.
- **Email Notifications**: Sends email alerts for sensitive activities like password resets.
- **Rate Limiting**: Prevents brute-force attacks by limiting login attempts.
- **Multi-Factor Authentication (MFA)**: Adds an extra layer of security for users.
- **React-based Frontend**: Modern UI built with ReactJS.
- **PostgreSQL/MongoDB Storage**: Persistent user data storage options.


## 🚨 Security Features

- **JWT Authentication**: Used for token-based authentication across the app.
- **Redis Session Store**: Handles session management and tracking for efficient performance.
- **Password Reset**: Secure password reset via email, with tokens that expire after a set duration.
- **Rate Limiting**: Restricts the number of login attempts to protect against brute-force attacks.
- **Multi-Factor Authentication**: Enables two-factor authentication for added security.
- **Email Notifications**: Alerts users via email for password resets and other sensitive changes.

  
## Technologies
- **Frontend**: ReactJS, Material UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL or MongoDB
- **Session Store**: Redis
- **Authentication**: JWT, bcrypt
- **Testing**: Jest (for backend unit tests)

## Prerequisites
- **Node.js** v14 or higher
- **npm** v6 or higher
- **Redis** server running locally or hosted
- **PostgreSQL or MongoDB** database

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/chanGomez/RC-Authentication-FE
   ```

2. Navigate into the project directory:
   ```bash
   cd rc-authenticator-fe
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Application

clone the backend 
```
https://github.com/chanGomez/RC-Authentication-BE.git
```

1. Start the backend server:
   ```bash
   npm run dev
   ```

2. Start the frontend:
   ```bash
   npm run dev
   ```

3. Redis cloud required:
   ```bash
   redis-server
   ```


## Testing
Run backend tests with jest and supertest:
```bash
npm run test
```
