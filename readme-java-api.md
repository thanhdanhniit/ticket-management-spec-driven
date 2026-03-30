# What We Are Building
Screenshots
      ↓
User Stories + UI Specs
      ↓
OpenAPI Spec
      ↓
DB Design and Architecture
      ↓
AI Code Generation
      ↓
Spring Boot Services
      ↓
Docker Deployment

# Generate Code in Stages

Project skeleton (skip if it already exists)
   ↓
Domain Layer
   ↓
Application Layer (Business Logic + API Layer)
   ↓
Cross-Cutting Concerns

# Code genration steps
## Step 0 — Project Skeleton
Purpose: create the base project structure and dependencies.

Prompt:
```
Generate the initial Spring Boot project skeleton for order-api service following the JavaBackendArchitect skill.

Include:
- Maven pom.xml
- main application class
- base package structure
```

## Step 1 — Domain Layer
Purpose: generate persistence + DTO foundation.

Prompt:
```
Generate the domain layer for order-api following the JavaBackendArchitect skill.
Create all required entities, repositories, DTOs, and MapStruct mappers based on the OpenAPI specification.
```

## Step 2 — Application Layer
Purpose: generate controllers and services together.

Prompt:
```
Using docs/order-user-stories.md, generate the application layer for order-api following the JavaBackendArchitect skill.
Implement business workflows from the user stories and expose the REST endpoints defined in the OpenAPI specification.
```

## Step 3 — Cross-Cutting Components
Purpose: generate system infrastructure.

Prompt:
```
Generate cross-cutting components following the JavaBackendArchitect skill.
```

## Step 4 — Docker Support
Prompt:
```
Generate Dockerfile for this Spring Boot application.
```

## Step 5 — Generate Postman Collections
Prompt:
```
Generate Postman collections for this service at ./docs/postman
```
