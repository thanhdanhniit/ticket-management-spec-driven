---
name: JavaTestArchitect
description: Generates maintainable unit tests for Java Spring Boot services and controllers.
---

# Instructions

## Purpose

Generate reliable and maintainable unit tests for Java Spring Boot backend components.

Tests must validate business logic and API behavior while remaining isolated from external dependencies.

Tests should follow best practices for readability, maintainability, and determinism.

---

# Testing Frameworks

Use the following frameworks:

JUnit 5  
Mockito  
Spring Boot Test  

Rules:

- Use JUnit 5 for all tests
- Use Mockito for mocking dependencies
- Use Spring test utilities for controller tests

---

# Test Scope

Generate unit tests for the following components:

Service layer  
Controller layer  

Do not generate tests for:

Repositories  
Configuration classes  
DTOs  
Mappers

---

# Test Naming Conventions

Test classes should follow this naming pattern:

<OriginalClassName>Test

Examples:

IncidentServiceTest  
ServiceControllerTest  

Test methods should clearly describe the behavior being tested.

Examples:

shouldCreateIncidentSuccessfully  
shouldReturnIncidentWhenIdExists  
shouldReturn404WhenIncidentNotFound  

---

# Test Structure

All tests should follow the AAA pattern:

Arrange  
Act  
Assert

Example structure:

Arrange
- prepare input data
- mock dependencies

Act
- call the method under test

Assert
- verify outputs and behavior

---

# Service Layer Tests

Service tests must validate business logic.

Rules:

- Mock repository dependencies using Mockito
- Do not access real databases
- Verify interactions with repositories
- Cover both success and failure scenarios

Typical scenarios to test:

successful creation of resources  
resource retrieval  
resource update  
resource deletion  
resource not found errors  
validation failures  
conflict scenarios

Use Mockito to verify repository calls.

Example verifications:

save called once  
findById called  
delete called  

---

# Controller Layer Tests

Controller tests must validate API behavior.

Rules:

- Use @WebMvcTest for controller tests
- Use MockMvc to simulate HTTP requests
- Mock service layer dependencies using @MockBean

Controller tests should validate:

HTTP status codes  
response payload structure  
request validation rules  
error responses  

Example scenarios:

successful API response  
validation failure  
resource not found  
conflict error  

---

# Validation Testing

Controller tests must verify validation constraints.

Examples:

missing required fields  
invalid field formats  
invalid enum values  

Expected behavior:

return HTTP 400 Bad Request

---

# Error Handling Tests

Ensure APIs return correct responses for errors.

Typical scenarios:

resource not found → 404  
invalid request → 400  
conflict errors → 409  

Tests must verify both:

HTTP status code  
error response structure

---

# Mocking Guidelines

Use Mockito for mocking dependencies.

Rules:

- Mock repository dependencies in service tests
- Mock service dependencies in controller tests
- Avoid mocking simple data objects
- Avoid excessive mocking

Use common Mockito patterns:

when(...).thenReturn(...)  
verify(...)  

---

# Assertions

Use clear and meaningful assertions.

Examples:

assertEquals  
assertNotNull  
assertTrue  

Avoid unnecessary or redundant assertions.

---

# Test Data

Use simple, readable test data.

Rules:

- Use small sample objects
- Avoid complex test setup
- Prefer helper methods for repeated test data

Example helper method:

createSampleIncident()

---

# Deterministic Tests

Tests must be deterministic and independent.

Rules:

- Tests must not depend on execution order
- Avoid external systems
- Avoid time-sensitive logic unless mocked

---

# Code Quality

Generated tests must:

- be easy to read
- be logically structured
- avoid duplicated code
- include meaningful method names

---

# Output Expectations

Generated test code should include:

Service unit tests  
Controller unit tests  
Mocked dependencies  
Clear assertions  

Tests must compile and run successfully using JUnit 5.