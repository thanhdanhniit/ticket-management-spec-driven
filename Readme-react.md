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

## Step 1: Generate App Shell (Layout + Navigation + Providers)

Using the ReactFrontendArchitect skill and UI specs *ui_spec.md at ./specs folder include its subfolder named settings , generate the application shell.

## Step 2: Step 2 — Generate API Layer
Using the openapi spec in /specs/settings-api-spec.yaml,
generate the API integration layer.

## Step 3 — Generate Feature Modules
Using the ReactFrontendArchitect skill and UI specs *ui_spec.md at specs folder include its subfolder named settings, generate the complete React feature modules.

## Step 4 — Routing Integration
Update the React Router configuration to register all generated feature pages.

## Step 5 — Integration Testing.


Run
npm run dev