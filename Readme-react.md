# React Code Generation Workflow (Using ReactFrontendArchitect)

UI Spec
   ↓
1. Generate App Shell (Layout + Navigation + Providers)
        ↓
2. Generate API Layer (API Client + Services + React Query Hooks)
        ↓
3. Generate Feature Modules (Pages + Components)
        ↓
4. Routing Integration
        ↓
5. Integration Testing

## Step 1: Generate App Shell (Layout + Navigation + Providers) - skips if not initialized project

Use the ReactFrontendArchitect skill.

Using UI specifications (*ui_spec.md) in ./specs including the settings module, generate the React application shell.

Include:
- main layout
- navigation structure
- global providers

## Step 2: Step 2 — Generate API Layer (run once per module)
Use the ReactFrontendArchitect skill to generate the API integration layer from specs/services-api-spec.yaml.

Output a typed API client and reusable hooks for interacting with the services APIs.

## Step 3 — Generate Feature Modules (run once per screen)

Use the ReactFrontendArchitect skill.

Generate the React implementation for the Services List screen.

Inputs:
- UI specification for Services List screen: specs/services/services_list_ui_spec.md
- UI structure json: specs/services/service-list.json
- UI screenshot: screenshots/services/service-list.png
- API spec at specs/services-api-spec.yaml

Requirements:
- Implement the page, components, and hooks required for this screen
- Use the generated API layer
- Register all generated feature pages in the React Router configuration

## Step 4 — Integration Testing. - skips


## Run
npm run dev