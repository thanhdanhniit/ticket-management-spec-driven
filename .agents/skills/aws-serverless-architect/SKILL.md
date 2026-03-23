---
name: AWSServerlessBackendArchitect
description: Generates scalable AWS serverless backend APIs using Node.js Lambda, API Gateway, MySQL, and JWT authentication following enterprise best practices.
---

# Instructions

## Architecture Principles

- Follow a **serverless architecture** using:
  - AWS Lambda
  - API Gateway
  - MySQL database
- APIs must follow **API-first design** using the OpenAPI specification located in `/specs`.
- The system must be **stateless**.
- Business logic must be separated from Lambda handlers.

---

# Project Structure

The generated project must follow this structure:

src/
  handlers/
  services/
  repositories/
  models/
  middleware/
  utils/
  config/

Structure definitions:

handlers/
- Lambda entry points
- Responsible only for HTTP parsing and response formatting

services/
- Business logic layer
- Orchestrates repositories and validations

repositories/
- Database access layer
- Contains SQL queries

models/
- Request and response DTOs

middleware/
- Authentication
- Authorization
- Request validation

utils/
- Shared utilities

config/
- Database connection
- Environment configuration

---

# API Design

- Always follow the OpenAPI specification in `/specs`.
- Controllers must strictly match defined routes.
- HTTP status codes must follow REST standards.

Examples:

200 → success  
201 → resource created  
400 → validation error  
401 → unauthorized  
403 → forbidden  
404 → resource not found  
500 → internal error

Pagination parameters:

page
size
sort

---

# Lambda Handler Design

Lambda handlers must be **thin controllers**.

Responsibilities:

- parse request
- call service
- return response

Example flow:

Request  
→ Handler  
→ Service  
→ Repository  
→ Database  

Handlers must NOT contain business logic.

---

# Database Access (MySQL)

Use MySQL with connection pooling.

Libraries:

- mysql2

Connection must be initialized once and reused across Lambda executions.

Example pattern:

Global database pool reused across invocations.

Repositories must:

- encapsulate SQL queries
- return plain objects
- never expose database logic to services.

---

# Authentication & Authorization

Authentication uses **JWT tokens**.

Libraries:

- jsonwebtoken
- bcrypt

Provide authentication endpoint:

POST /auth/login

Login flow:

1. Validate username and password.
2. Password must be compared using bcrypt.
3. If valid, generate JWT token.
4. Return access token.

Example response:

{
  "accessToken": "<jwt-token>"
}

JWT payload must include:

- userId
- role

Example payload:

{
  "userId": "123",
  "role": "engineer"
}

Protected APIs must require:

Authorization: Bearer <token>

---

# JWT Middleware

Create reusable middleware for authentication.

Responsibilities:

1. Extract Authorization header.
2. Validate JWT token.
3. Decode payload.
4. Attach user to request context.

Example context:

{
  "userId": "123",
  "role": "engineer"
}

Handlers must call middleware before executing service logic.

---

# Authorization Rules

Implement role-based access control.

Roles:

admin  
engineer  
viewer  

Example rules:

admin → full access  
engineer → manage incidents  
viewer → read-only access

Authorization checks must be implemented in the service layer.

---

# Error Handling

All APIs must return standardized error responses.

Example structure:

{
  "errorCode": "RESOURCE_NOT_FOUND",
  "message": "Incident not found"
}

Common error codes:

VALIDATION_ERROR  
UNAUTHORIZED  
FORBIDDEN  
RESOURCE_NOT_FOUND  
INTERNAL_ERROR

Error handling must be centralized in a shared utility.

---

# Validation

Validate requests before calling service layer.

Use:

- schema validation
- required fields
- type checking

Validation must return HTTP 400 errors when invalid.

---

# Observability

Implement structured logging.

Rules:

- never log passwords
- never log tokens
- log requestId
- log errors with stack traces

Logging should include:

timestamp  
requestId  
operation  
result  

---

# Security Guidelines

- passwords must be hashed using bcrypt
- JWT secret must come from environment variables
- never store plain text credentials
- avoid logging sensitive data

---

# Testing

Generate unit tests for:

services  
repositories  

Testing tools:

- Jest

Service tests must:

- mock repositories
- test business rules
- test failure scenarios

---

# Deployment

Deployment must use:

AWS Serverless Application Model (SAM)

SAM template must define:

Lambda functions  
API Gateway routes  
environment variables  

---

# Environment Configuration

Use environment variables for:

DB_HOST  
DB_PORT  
DB_USER  
DB_PASSWORD  
DB_NAME  
JWT_SECRET  

Configuration must be centralized in `config`.

---

# References

- API Specifications: `/specs/*.yaml`
- Follow the API-first approach strictly.