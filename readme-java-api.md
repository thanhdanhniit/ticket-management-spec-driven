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

# Design
Using the JavaBackendArchitect skill, analyze specs/escalation-policies-api-spec.yaml, the UI specs in specs/escalation-policy/, and the user stories in docs/escalation-policy/.

Suggest the Java Spring Boot architecture and Database Design for the Escalation Policies module. Please provide:
- ER Diagram/Schema Design: Define JPA entities, relationships (One-to-Many for Maintenance Windows, Many-to-One for Owners/Policies), and data types.
- Escalation Execution Engine: Explain how to handle the escalation execution engine logic.
- Timer & Scheduling Strategy: Escalation depends heavily on accurate timers.
- Incident State Synchronization: Escalation must always check the latest incident state.
- Concurrency & Race Conditions: Escalation policies run in parallel with incident updates.

-- for maintenance mode
- Concurrency & Logic: Explain how to handle the Maintenance Mode recurrence logic and calculation of MTTR/MTTA stats.


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
Purpose: generate persistence + DTO foundation.

Prompt:
```
Generate the domain layer for escalation-policy domain, following the JavaBackendArchitect skill.
Create all required entities, repositories, DTOs, and MapStruct mappers based on the OpenAPI specification: specs/escalation-policies-api-spec.yaml
```

## Step 2 — Application Layer
Purpose: generate controllers and services together.

Prompt:
```
Using api-spec specs/escalation-policies-api-spec.yaml and user stories docs/escalation-policy/*.md, generate the application layer for escalation-policy domain following the JavaBackendArchitect skill.
Implement business workflows from the user stories and expose the REST endpoints defined in the OpenAPI specification.
```

## Step 3 — Cross-Cutting Components
Purpose: generate system infrastructure.

Prompt:
```
Generate cross-cutting components following the JavaBackendArchitect skill.
```

## Step 4 — Docker Support (optional)
Prompt:
```
Generate Dockerfile for this Spring Boot application.
```

## step 4 - generate initial or mock data
generate class to initialize 2 escalation policies if there is no records in database.

## Step 6 — Generate Postman Collections
Prompt:
```
Generate Postman collections for this service at ./docs/postman
```
