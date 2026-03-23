---
name: JavaBackendArchitect
description: Ensures backend code follows API-first design and Java enterprise best practices.
---

# Instructions
## API Design
- Always refer to `specs/api-spec.yaml` before generating any Controller, DTO, or API interface.
- Follow the API-first approach: controllers and DTOs must strictly match the OpenAPI specification.
- Ensure REST endpoints follow consistent naming and HTTP semantics defined in the OpenAPI spec.
- Implement pagination for list endpoints (`page`, `size`, optional `sort`).

## Architecture

- Separate layers clearly: Controller -> Service -> Repository.
- Controllers must remain lightweight and only handle HTTP request/response logic.
- Business logic must reside in the Service layer.

## Data Model

- Use Jakarta Persistence (JPA) annotations for all entity classes.
- Use MapStruct for mapping between DTOs and Entity models.
- Avoid exposing entity objects directly in API responses; always use DTOs.
- Generate validation annotations in DTOs where applicable (`@NotNull`, `@Size`, `@Email`).
- Avoid exposing sensitive data in DTOs.

## Error Handling

- Implement centralized exception handling using `@ControllerAdvice`.
- Use standardized error response models for all API errors.

## Observability

- Add structured logging in services and avoid logging sensitive information.

## Testing

- Generate primary unit tests for Controllers and Services.
- Use JUnit 5 as the testing framework.
- Use Mockito for mocking dependencies.
- Controller tests must use `@WebMvcTest` and `MockMvc`.
- Service tests must mock repositories using Mockito.
- Validate request validation rules in controller tests.
- Include basic error scenario tests (e.g., resource not found).

# References
- `specs/api-spec.yaml`
