### Approach
- Generate UI specs and user stories per domain, with priority for dependencies domain
- One finished UI specs and user stories, then generate API specs for that domain
- After that, generate database schema for that domain
- Finnaly, then generate code for that domain

### prompt for generating UI specs:

Using the UISpecArchitect skill, analyze the provided incident filter UI screenshot to generate UI spec at specs folder for this screen.

organize global sdebar (left) and top navigation bar into different ui-spec and reuse it for multiple screens since we have a lots of screens

### second ui screen

Using the UISpecArchitect skill, analyze this UI screenshot to generate UI spec at spec folder. Recommend to reference to shared global sidebar and shared top navigation bar ui-specs.

### generate user stories

Using the UserStoryArchitect skill, analyze this UI screenshot to generate user stories for this screen and save it at docs folder.

### generate api specs
prompt:
Using the APISpecArchitect skill to generate api specs for settings domain based on user stories at docs/settings/*.md and ui-specs at specs/settings/*.md.

### architecture
React
   ↓
SAM Local API Gateway
   ↓
Lambda (Node.js)
   ↓
MySQL

Authentication flow:

POST /auth/login
      ↓
Validate username/password
      ↓
Generate JWT
      ↓
Frontend stores token
      ↓
Send token in Authorization header

### Step-by-Step Backend Generation Wor
User Stories
      ↓
OpenAPI Spec
      ↓
Database Schema
      ↓
Project Skeleton
      ↓
Repository Layer
      ↓
Service Layer
      ↓
Lambda Handlers
      ↓
Auth + Middleware
      ↓
SAM Template
      ↓
Tests

#### Step 1 — Generate Project Skeleton
prompt:
Generate a Node.js serverless backend project following the AWSServerlessBackendArchitect skill.

Requirements:

- Use AWS SAM project structure
- Implement folder structure defined in the skill
- Prepare project for Lambda + API Gateway
- Include package.json with required dependencies
- Include environment configuration

Dependencies must include:
- mysql2
- jsonwebtoken
- bcrypt
- dotenv
- jest

Generate:

- project folder structure
- package.json
- config files
- base Lambda handler template

save them all at ticket-mgt-api folder

#### Step 2 — Generate MySQL Schema

Using the following artifacts:

- user stories at docs/settings folder
- UI specifications at specs/settings folder
- OpenAPI specifications at specs/settings folder

Design the MySQL database schema for the system.

Requirements:

1. Identify core domain entities.
2. Generate normalized tables.
3. Define relationships using foreign keys.
4. Include audit fields (created_at, updated_at).
5. Add indexes based on API queries and UI filters.
6. Avoid storing derived data when possible.

Provide:

- ERD explanation
- CREATE TABLE statements
- indexes
- constraints

#### step 3 - Generate Database Repository Layer
Generate repository classes for MySQL access following AWSServerlessBackendArchitect rules.

Requirements:

- Use mysql2 and this schema
- Use connection pooling
- Encapsulate SQL queries inside repositories
- Do not include business logic

#### Step 4 — Generate Service Layer
Using the user stories *.md at docs/settings and API specification specs/settings-api-spec.yaml,
generate service classes implementing the business logic.

Requirements:

Follow AWSServerlessBackendArchitect rules.

Services must:

- call repositories
- implement business validation
- enforce authorization rules
- throw standardized errors

#### Step 5 — Generate Lambda Handlers
Using the OpenAPI specification in specs/settings-api-spec.yaml,
generate Lambda handlers for all API endpoints.

Requirements:

Handlers must:

- be located in src/handlers
- only parse HTTP request and call services
- return API responses
- follow REST status codes

#### Step 6 — Generate JWT Authentication Middleware

Generate authentication middleware for JWT validation.

Requirements:

- verify JWT token
- extract userId and role
- attach user context to request
- reject unauthorized requests

Libraries:

jsonwebtoken
bcrypt

Place middleware in:

src/middleware/jwtAuth.js

#### Step 7 — Generate Error Handling Utilities
Generate centralized error handling utilities.

#### Step 8 — Generate AWS SAM Template
Generate AWS SAM template.yaml for the serverless backend.

#### Step 9 — Generate Unit Tests
Generate unit tests for services and repositories.

Use Jest.

Tests must:

- mock repositories
- test business logic
- test failure scenarios
- test authorization rules