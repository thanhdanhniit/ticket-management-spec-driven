# What We Are Building
Screenshots
      ↓
UI structure JSON
      ↓
UI Specs
      ↓
User Stories
      ↓
OpenAPI Spec
      ↓
DB Design and Architecture
      ↓
AI Code Generation
      ↓
Docker Deployment
      ↓
Postman API Collections

# Generate Code in Stages

Project skeleton (skip if it already exists)
   ↓
Domain Layer
   ↓
Application Layer (Business Logic + API Layer)
   ↓
Cross-Cutting Concerns
   ↓
Unit Tests
   ↓
Postman API Collections

# Code genration steps
## Step 0 — Project Skeleton (optional)
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
**Model**: Gemini 3.1 Pro High / Claude Sonnet

Purpose: generate persistence + DTO foundation.

Prompt:
```
Use the JavaBackendArchitect skill.

Generate the Domain Layer for the services domain.

Inputs:
- OpenAPI specification: specs/services-api-spec.yaml
- Backend design document: docs/technical-design/services_backend_design.md

Tasks:
- Generate JPA entities based on API schemas
- Create repositories using Spring Data JPA
- Generate DTOs that match the OpenAPI schemas
- Generate MapStruct mappers for DTO ↔ Entity mapping

Output:
Domain entities, repositories, DTOs, and mapper interfaces.
```

## Step 2 — Application Layer
**Model**: Gemini 3.1 Pro High / Claude Sonnet

Purpose: generate controllers and services together.

Prompt:
```
Use the JavaBackendArchitect skill.

Generate the Application Layer for the services domain.

Inputs:
- OpenAPI specification: specs/services-api-spec.yaml
- Backend design document: docs/technical-design/services_backend_design.md
- User stories: docs/services/*_user_stories.md
- Domain layer implementation

Tasks:
- Implement service classes containing business logic derived from user stories
- Implement REST controllers that expose endpoints defined in the OpenAPI specification
- Ensure controllers delegate all business logic to the service layer

Output:
Service classes and REST controllers implementing the API specification.
```

## Step 3 — Cross-Cutting Components
**Model**: Gemini 3.1 Pro High / Claude Sonnet

Purpose: generate system infrastructure.

Prompt:
```
Use the JavaBackendArchitect skill.

Generate cross-cutting infrastructure components for the backend.

Tasks:
- Implement centralized exception handling
- Implement standardized API error responses
- Configure structured logging for services
- Provide shared configuration and utilities used across modules

Output:
Exception handlers, shared configuration classes, and logging utilities.
```

## Step 4 — Unit Tests
**Model**: Gemini 3.1 Pro Low

Prompt:
```
Use the JavaTestArchitect skill.

Generate unit tests for the services domain.

Inputs:
- Service classes
- REST controllers

Tasks:
- Generate service layer unit tests
- Generate controller layer unit tests using MockMvc

Output:
JUnit 5 unit tests for services and controllers.
```

## Step 5 — Docker Support (optional)
Prompt:
```
Generate Dockerfile for this Spring Boot application.
```

## step 6 - generate initial or mock data
**Model**: Gemini 3.1 Pro (Low)
Prompt:
```
Use the JavaBackendArchitect skill.

Generate a database seeder for the Services Management module with 3 records and their related entities.
```

## Step 7 — Generate Postman Collections
**Model**: Gemini 3.1 Pro (Low)| Flash

Prompt:
```
Generate a Postman collection for this service using specs/services-api-spec.yaml.

Save the collection JSON to: ticket-mgt-api-java/docs/
```
