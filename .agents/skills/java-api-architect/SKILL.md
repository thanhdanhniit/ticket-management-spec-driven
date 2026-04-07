---
name: JavaBackendArchitect
description: Generates production-grade Java Spring Boot backend code following API-first architecture and enterprise best practices.
---

# Instructions

## Purpose

Generate maintainable Java Spring Boot backend code that strictly follows the OpenAPI specification.

The OpenAPI specification is the **single source of truth** for the API contract.

Controllers, DTOs, and endpoints must strictly match the API specification.

---

# API-First Development

Always refer to the OpenAPI specification before generating backend code.

Rules:

- Controllers must match endpoints defined in the OpenAPI specification
- Request and response models must match schema definitions
- Do not invent endpoints not defined in the API specification
- Follow HTTP semantics defined in the API specification

---

# Architecture

Follow a layered architecture:

Controller → Service → Repository

Responsibilities:

Controller
- Handles HTTP request and response mapping
- Performs request validation
- Calls service layer

Service
- Contains business logic
- Coordinates domain operations
- Handles transactional boundaries

Repository
- Handles database persistence
- Uses Spring Data JPA

Controllers must remain lightweight.

Business logic must reside only in the Service layer.

---

# Package Structure

Follow a modular package structure organized by domain.

Example:

com.example.incidentmanagement

incident
  controller
  service
  repository
  domain
  dto
  mapper

shared
  exception
  config
  logging

---

# Domain Model

Define domain entities using Jakarta Persistence (JPA).

Rules:

- Use `@Entity` for persistent models
- Use `@Id` with UUID identifiers
- Use `@EntityListeners(AuditingEntityListener.class)` to enable automatic metadata management
- Include metadata fields with auditing annotations:
    - `@CreatedDate`: `id`
    - `@LastModifiedDate`: `updatedAt`
- Define IDs as `UUID` using `@Id @GeneratedValue`.

Use appropriate relationships:

@OneToMany  
@ManyToOne  
@ManyToMany  

Avoid bidirectional relationships unless necessary.

---

# DTO Design

Never expose JPA entities directly through APIs.

Always use DTOs.

Recommended DTO types:

ResourceResponse  
CreateRequest  
UpdateRequest  

Example:

IncidentResponse  
CreateIncidentRequest  
UpdateIncidentRequest

DTOs must match schemas defined in the OpenAPI specification.

---

# Mapping

Use MapStruct for DTO and entity mapping.

Rules:

- Define mapper interfaces
- Use `@Mapper(componentModel = "spring")`
- Avoid manual mapping logic in services

Example:

IncidentMapper  
ServiceMapper  

---

# Validation

Apply validation annotations in request DTOs.

Examples:

@NotNull  
@NotBlank  
@Size  
@Email  

- Controllers must enforce validation using `@Valid`.
- For complex business checks (e.g., cross-field comparisons), implement a custom `ConstraintValidator`.

---

# Pagination

List endpoints must support pagination.

Use Spring Data pagination:

Pageable

Controllers must accept:

page  
size  
sort

Responses should return paginated results.

---

# Error Handling

Implement centralized exception handling using:

@ControllerAdvice

Standard error responses should include:

timestamp  
status  
error  
message  
path  

Handle common scenarios:

- resource not found
- validation errors
- conflict errors
- unexpected server errors

---

# Transactions

Service methods that modify data must use:

@Transactional

Rules:

- Read-only operations should use `@Transactional(readOnly = true)`.
- Write operations should use standard `@Transactional`.
- Use `ApplicationEventPublisher` to decouple side effects (e.g., updating metrics) from the primary transaction. 
- Use `@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)` for listeners to ensure data consistency.

---

# Logging

Add structured logging in service layer.

Rules:

- Log important operations
- Do not log sensitive information
- Include resource identifiers when useful

Example:

Creating incident  
Updating service configuration  

---
---

# Caching

Improve read performance for stable, frequently accessed data.

Rules:

- Use Spring Cache abstraction (`@Cacheable`, `@CacheEvict`).
- Apply caching only in the Service layer.
- Ensure cache eviction logic is tied to update/delete operations.

# Security Preparation

Design services to support future authentication integration.

Avoid embedding authentication logic directly in controllers.

Prepare endpoints for integration with security frameworks such as JWT or OAuth2.

---

# Code Quality

Generated code must follow Java best practices:

- constructor-based dependency injection
- immutable DTOs where possible
- meaningful method names
- avoid duplicated logic

Avoid:

- business logic in controllers
- direct entity exposure
- unnecessary complexity

---

# Output Expectations

Generated backend code should include:

- Controllers
- Services
- Repositories
- Entities
- DTOs
- MapStruct mappers
- Exception handlers

The code must compile and align with the OpenAPI specification.