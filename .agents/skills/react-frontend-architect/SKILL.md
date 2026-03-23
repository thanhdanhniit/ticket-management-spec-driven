---

name: ReactFrontendArchitect
description: Ensures React frontend applications follow scalable architecture, modern best practices, and consistent integration with backend APIs.
---------------------------------------------------------------------------------------------------------------------------------------------------

# React Frontend Architect Skill

This skill enforces scalable architecture and best practices for building modern React applications using a **spec-driven development approach**.

It should be used when generating, reviewing, or refactoring React frontend code.

---

# Framework

Use the following frontend stack:

* React 18+ with **functional components only**
* TypeScript for type safety
* Vite as the build tool

Libraries used across the application:

* React Router v6 (routing)
* TanStack Query (server state management)
* React Hook Form (form management)
* Zod (schema validation)
* Axios (API communication)
* Tailwind CSS (styling)
* shadcn/ui and Radix UI (UI components)
* TanStack Table (data tables)

---

# Project Structure

The application must follow a **feature-based modular architecture**.

```
src/
  app/              # application bootstrap and global providers
  components/       # reusable UI components
  features/         # domain modules
  hooks/            # shared custom hooks
  services/         # API clients and integrations
  store/            # lightweight global state
  utils/            # helper utilities
  types/            # shared TypeScript types
  layouts/          # page layouts
```

---

# Feature-Based Architecture

Each domain must live inside the `features` directory.

Example:

```
features/
  incidents/
  services/
  users/
  runbooks/
```

Each feature must follow this structure:

```
features/<feature-name>/

  components/
  hooks/
  services/
  types/
  pages/
```

Example:

```
features/incidents/

  components/
    IncidentTable.tsx
    IncidentCard.tsx

  hooks/
    useIncidents.ts

  services/
    incidentService.ts

  types/
    incident.ts

  pages/
    IncidentListPage.tsx
    IncidentDetailsPage.tsx
```

This structure keeps **UI, logic, and services within the same domain module**.

---

# Routing

Use React Router v6 for client-side routing.

Routes must be defined centrally in the `app` layer.

Example routes:

```
/incidents
/incidents/:id
/services
/runbooks
```

Each route must load the page component from its corresponding feature module.

---

# API Contract

All frontend API integrations must follow the **OpenAPI specifications** located in the `/specs` directory.

Service methods must map directly to API endpoints defined in the backend specification.

Example mapping:

```
GET /incidents
→ incidentService.getIncidents()
```

Frontend services must remain consistent with backend API resources.

---

# API Integration Layer

API communication must be centralized inside the **services layer**.

Example:

```
services/
  apiClient.ts
  incidentService.ts
  serviceService.ts
```

Rules:

* Use Axios as the HTTP client
* Do not call APIs directly inside React components
* Handle request configuration and interceptors inside `apiClient.ts`

---

# Data Fetching Pattern

Use **TanStack Query** for all server state management.

Components must never call API services directly.

Follow this pattern:

```
Component
   ↓
Custom Hook (React Query)
   ↓
Service Layer
   ↓
API Client
```

Example:

```
useIncidents()
   ↓
incidentService.getIncidents()
   ↓
Axios request
```

Hooks must expose:

* data
* loading state
* error state

---

# State Management

Use **TanStack Query** for server state.

Use **Zustand** only for lightweight global UI state such as:

* sidebar state
* UI preferences
* theme settings

Avoid large global state stores.

---

# Forms

Forms must use:

* React Hook Form for form state
* Zod for schema validation

Example:

```
CreateIncidentForm
```

Validation rules should match backend validation where possible.

---

# UI Components

Reusable UI components should live in the global `components` directory.

Examples:

```
Button
Modal
Table
Input
FormField
Select
```

Guidelines:

* components must be stateless when possible
* keep UI components reusable and composable
* avoid business logic inside shared UI components

---

# Data Tables

Use **TanStack Table** for scalable table implementations.

Tables must support:

* pagination
* filtering
* sorting

Example table filters for incidents:

```
status
service
severity
created date
```

---

# Styling

Use **Tailwind CSS** for styling.

Guidelines:

* prefer utility classes
* ensure responsive design
* avoid inline styles
* avoid large custom CSS files

---

# Error Handling

Frontend must gracefully handle:

* API failures
* validation errors
* network issues

Provide reusable UI states:

```
ErrorBanner
EmptyState
LoadingSpinner
```

---

# Loading States

All asynchronous operations must show loading states.

Examples:

* skeleton loaders
* loading spinners
* disabled form buttons during submission

---

# Performance Optimization

Follow these practices:

* lazy load route pages using React.lazy
* avoid unnecessary re-renders
* use memoization when appropriate
* split large components into smaller ones

Example:

```
const IncidentPage = React.lazy(() =>
  import("../features/incidents/pages/IncidentListPage")
)
```

---

# Testing

Use:

* Vitest for unit testing
* React Testing Library for component testing

Tests should cover:

* component rendering
* user interactions
* form validation
* API calls with mocked services

---

# Security

Frontend must follow security best practices:

* never expose sensitive tokens
* validate user input
* sanitize dynamic content
* attach JWT tokens via Axios interceptor

---

# References

UI Specifications:

```
/ui-specs
```

Backend API Specifications:

```
/specs
```

Generated frontend code must follow these specifications when implementing UI pages and API integrations.
