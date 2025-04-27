# LAPR5 - Logistics-G70-2022: Logistics Management System

This repository contains the backend module for the Logistics Management System developed by Group 70 in 2022. The project was built as part of LAPR5 (Laboratory of Software Architecture and Design 5) at ISEP (Instituto Superior de Engenharia do Porto).

## 📋 Table of Contents

- [🚀 Overview](#-overview)
- [🛠️ Technologies & Patterns](#️-technologies--patterns)
- [📂 Repository Structure](#-repository-structure)
- [🚦 Features](#-features)
- [🔧 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
  - [Running Tests](#running-tests)
- [📝 API Documentation](#-api-documentation)
- [🏗️ Architecture](#️-architecture)
- [🔄 Domain Model](#-domain-model)
- [👥 Contributors](#-contributors)

## 🚀 Overview

This logistics management system provides a robust backend for handling fleet management operations, route planning, warehouse management, and delivery optimization. The system is designed using Domain-Driven Design principles and implements a layered architecture to ensure maintainability and scalability.

The backend integrates with an Angular frontend SPA (Single Page Application) to form a complete logistics management solution for planning and optimizing delivery routes, managing warehouse inventories, and tracking fleet vehicles.

## 🛠️ Technologies & Patterns

- **Node.js** - JavaScript runtime environment
- **Express** - Web application framework
- **TypeScript** - Programming language
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Jest** - Testing framework
- **Domain-Driven Design (DDD)** - Design methodology
- **Clean Architecture** - Architectural pattern
- **Swagger/OpenAPI** - API documentation
- **JWT** - Authentication and authorization
- **Docker** - Containerization

## 📂 Repository Structure

```
/
├── src/                      # Source code
│   ├── api/                  # API layer
│   │   ├── controllers/      # Request handlers
│   │   ├── routes/           # API routes
│   │   └── middlewares/      # Express middlewares
│   ├── domain/               # Domain layer
│   │   ├── models/           # Domain models
│   │   ├── services/         # Domain services
│   │   └── interfaces/       # Domain interfaces
│   ├── dto/                  # Data Transfer Objects
│   ├── loaders/              # Application bootstrapping
│   ├── persistence/          # Data access layer
│   │   ├── schemas/          # MongoDB schemas
│   │   └── repositories/     # Data repositories
│   ├── services/             # Application services
│   ├── utils/                # Utility functions
│   └── config/               # Configuration files
├── tests/                    # Test files
│   ├── unit/                 # Unit tests
│   └── integration/          # Integration tests
├── .env                      # Environment variables
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
├── jest.config.js            # Jest configuration
├── docker-compose.yml        # Docker configuration
└── README.md                 # Project documentation
```

## 🚦 Features

- **Route Management** - Create, optimize, and manage delivery routes
- **Vehicle Management** - Track and manage fleet vehicles
- **Warehouse Management** - Inventory tracking and warehouse operations
- **Delivery Planning** - Schedule and optimize deliveries
- **User Authentication** - Secure login and role-based access control
- **Reports & Analytics** - Generate operational insights and statistics

## 🔧 Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm or yarn package manager
- MongoDB (local installation or connection to MongoDB Atlas)
- Docker (optional, for containerized development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GuilhermeCunha79/logistics-g70-2022.git
   cd logistics-g70-2022
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Configuration

1. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/logistics
   JWT_SECRET=your_jwt_secret
   ```

2. Adjust the configuration as needed in the `src/config` directory.

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. For production:
   ```bash
   npm run build
   npm start
   # or
   yarn build
   yarn start
   ```

3. The API will be available at:
   - `http://localhost:3000/api`
   - Swagger UI: `http://localhost:3000/api-docs`

### Running Tests

Execute the test suite:
```bash
npm test
# or
yarn test
```

## 📝 API Documentation

The API is documented using Swagger/OpenAPI. When the application is running, you can access the Swagger UI at `http://localhost:3000/api-docs` to explore available endpoints, request/response models, and test the API directly.

## 🏗️ Architecture

This project follows the principles of Domain-Driven Design and Clean Architecture:

1. **Domain Layer** - Contains business entities, value objects, and business logic
2. **Application Layer** - Orchestrates the flow of data to and from domain entities
3. **Infrastructure Layer** - Implements data persistence and external services
4. **Interface Layer** - Handles HTTP requests and responses

This layered approach ensures separation of concerns and makes the system more maintainable and testable.

## 🔄 Domain Model

The core domain model includes the following entities:

- **Route** - Represents a delivery route with waypoints
- **Vehicle** - Fleet vehicles with attributes like capacity and type
- **Warehouse** - Storage locations with inventory
- **Delivery** - Scheduled delivery with pickup and drop-off details
- **User** - System users with roles and permissions

## 👥 Contributors

This project was developed by ISEP students from Group 70 (2022):
- Guilherme Cunha
- [Other Team Members]

---

This project is part of the Software Engineering curriculum at ISEP, developed for LAPR5.
