# Escalation Policy — React Code Generation Prompts

> Run these prompts **sequentially**. Each step depends on the previous one.
> All files live inside `ticket-mgt-app/src/`.

---

## Context (read before running any prompt)

| Item | Value |
|---|---|
| Framework | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS (already configured) |
| Data fetching | `@tanstack/react-query` |
| HTTP client | `axios` via `src/services/apiClient.ts` (base URL: `http://localhost:8080/v1/settings`) |
| Existing pattern | Settings module in `src/features/settings/`, types in `src/types/settings.ts`, hooks in `src/hooks/` |
| API spec | `specs/escalation-policies-api-spec.yaml` |
| UI specs | `specs/escalation-policy/escalation_policy_list_ui_spec.md` · `_add_ui_spec.md` · `_edit_ui_spec.md` |
| User stories | `docs/escalation-policy/escalation_policy_list_user_stories.md` · `_add_*` · `_edit_*` |

---

## Step 1 — TypeScript Types

**Prompt:**

```
Using the ReactFrontendArchitect skill, read the OpenAPI spec at
specs/escalation-policies-api-spec.yaml and the existing type file at
ticket-mgt-app/src/types/settings.ts as a reference for naming and style conventions.

Generate a new TypeScript type file at:
  ticket-mgt-app/src/types/escalationPolicy.ts

It must include the following types, all strictly matching the OpenAPI schema:

1. EscalationStepDTO
   - id: string (UUID)
   - stepOrder: number
   - waitTimeMinutes: number
   - targetId: string (UUID)
   - targetType: 'USER' | 'TEAM'

2. EscalationPolicyDTO
   - id: string (UUID)
   - name: string
   - description?: string
   - steps: EscalationStepDTO[]
   - createdAt: string
   - updatedAt: string

3. EscalationPolicyListResponse (paginated envelope)
   - content: EscalationPolicyDTO[]
   - page: number
   - size: number
   - totalElements: number
   - totalPages: number

4. EscalationStepRequest (for form submissions)
   - waitTimeMinutes: number
   - targetId: string
   - targetType: 'USER' | 'TEAM'

5. EscalationPolicyMutationRequest
   - name: string
   - description?: string
   - steps: EscalationStepRequest[]

6. EscalationPolicyListParams (query params for the list endpoint)
   - page?: number
   - size?: number
   - sort?: string
   - search?: string

Do NOT produce any component code in this step.
```

---

## Step 2 — API Service + React Query Hooks

**Prompt:**

```
Using the ReactFrontendArchitect skill, read:
- specs/escalation-policies-api-spec.yaml
- ticket-mgt-app/src/services/teamService.ts        (service pattern reference)
- ticket-mgt-app/src/hooks/useTeams.ts              (hook pattern reference)
- ticket-mgt-app/src/types/escalationPolicy.ts      (types from Step 1)

The API base URL for escalation policies is:
  http://localhost:8080/v1/escalation-policies
This is a SEPARATE base URL from the settings client (which uses /v1/settings).
Create a dedicated axios client for this domain, or extend apiClient.ts to support
a second base URL. Do not break the existing settings apiClient.

Generate the following two files:

─── FILE 1: ticket-mgt-app/src/services/escalationPolicyService.ts ───
Implement these methods, matching the OpenAPI spec exactly:
  - listPolicies(params?: EscalationPolicyListParams): Promise<EscalationPolicyListResponse>
      GET /v1/escalation-policies
  - getById(id: string): Promise<EscalationPolicyDTO>
      GET /v1/escalation-policies/{id}
  - createPolicy(payload: EscalationPolicyMutationRequest): Promise<EscalationPolicyDTO>
      POST /v1/escalation-policies
  - updatePolicy(id: string, payload: EscalationPolicyMutationRequest): Promise<EscalationPolicyDTO>
      PUT /v1/escalation-policies/{id}
  - deletePolicy(id: string): Promise<void>
      DELETE /v1/escalation-policies/{id}

─── FILE 2: ticket-mgt-app/src/hooks/useEscalationPolicies.ts ───
Implement React Query hooks following the exact same pattern as useTeams.ts:
  - ESCALATION_POLICY_KEYS  (query key factory with: all, list(params), detail(id))
  - useEscalationPolicies(params?)  → useQuery wrapping listPolicies
  - useEscalationPolicy(id)         → useQuery wrapping getById
  - useCreateEscalationPolicy()     → useMutation; onSuccess: invalidate 'all'
  - useUpdateEscalationPolicy()     → useMutation(id, payload); onSuccess: invalidate 'all' + detail(id)
  - useDeleteEscalationPolicy()     → useMutation(id); onSuccess: invalidate 'all'

Do NOT generate any component code in this step.
```

---

## Step 3 — Feature Components

**Prompt:**

```
Using the ReactFrontendArchitect skill, read the following specs carefully before writing any code:
- specs/escalation-policy/escalation_policy_list_ui_spec.md
- specs/escalation-policy/escalation_policy_add_ui_spec.md
- specs/escalation-policy/escalation_policy_edit_ui_spec.md
- docs/escalation-policy/escalation_policy_list_user_stories.md
- docs/escalation-policy/escalation_policy_add_user_stories.md
- docs/escalation-policy/escalation_policy_edit_user_stories.md

Also read these for style/structure reference:
- ticket-mgt-app/src/features/settings/pages/       (existing page pattern)
- ticket-mgt-app/src/features/settings/components/  (existing component pattern)
- ticket-mgt-app/src/hooks/useEscalationPolicies.ts (from Step 2)
- ticket-mgt-app/src/types/escalationPolicy.ts      (from Step 1)

Generate the complete feature module under:
  ticket-mgt-app/src/features/escalation-policy/

Required file structure:
  features/
  └── escalation-policy/
      ├── pages/
      │   └── EscalationPoliciesPage.tsx     ← main list page
      └── components/
          ├── EscalationPolicyTable.tsx       ← table with search bar + pagination
          ├── EscalationPolicyRow.tsx         ← single table row with delete action
          ├── EscalationStepRow.tsx           ← single step row inside forms
          ├── AddEscalationPolicyModal.tsx    ← Add overlay (from add UI spec)
          └── EditEscalationPolicyModal.tsx   ← Edit overlay (from edit UI spec)

Component requirements for each file:

EscalationPoliciesPage.tsx:
  - Full page layout matching the list UI spec
  - Hosts search bar (live search with 300ms debounce), pagination controls, and table
  - "New Escalation Policy" button opens AddEscalationPolicyModal
  - Clicking a row's edit icon opens EditEscalationPolicyModal pre-populated via useEscalationPolicy(id)
  - Uses useEscalationPolicies(params) from Step 2

EscalationPolicyTable.tsx:
  - Columns: Name, Description, Steps count, Created At, Actions (Edit + Delete)
  - Empty state when no policies exist
  - Loading skeleton rows while fetching

EscalationPolicyRow.tsx:
  - Shows policy name, description (truncated), step count badge
  - Edit icon → triggers onEdit(policy) callback
  - Delete icon → shows inline confirmation → calls useDeleteEscalationPolicy()

EscalationStepRow.tsx:
  - Reusable in both Add and Edit modals
  - Fields: waitTimeMinutes (number input), targetType (USER | TEAM select), targetId (text/UUID input)
  - Drag handle or up/down arrows for reordering (basic version: up/down buttons)
  - Remove button per row

AddEscalationPolicyModal.tsx:
  - Controlled modal/overlay (isOpen, onClose props)
  - Form fields: name (required), description (optional)
  - Dynamic step list using EscalationStepRow (minimum 1 step enforced)
  - "Add Step" button appends a new blank EscalationStepRow
  - Submit calls useCreateEscalationPolicy(), closes modal on success
  - Shows server-side validation errors inline

EditEscalationPolicyModal.tsx:
  - Same layout as Add modal but pre-populated from useEscalationPolicy(id)
  - Submit calls useUpdateEscalationPolicy()
  - Shows loading state while fetching existing policy data

All components must:
  - Follow Tailwind CSS utility classes (not ad-hoc inline styles)
  - Use proper TypeScript types from ticket-mgt-app/src/types/escalationPolicy.ts
  - Match the visual design of the existing settings module components
```

---

## Step 4 — Routing Integration

**Prompt:**

```
Read the existing routing setup in ticket-mgt-app/src/App.tsx and the existing
settings module routing to understand the current pattern.

Also read:
- ticket-mgt-app/src/layouts/                         (if a shared layout exists)
- ticket-mgt-app/src/features/escalation-policy/pages/EscalationPoliciesPage.tsx  (Step 3)
- specs/shared_global_sidebar_ui_spec.md              (sidebar navigation spec)

Do the following:
1. Register the new route in the React Router config:
     path: /escalation-policies
     element: <EscalationPoliciesPage />
   Use lazy loading (React.lazy + Suspense) if the settings module already uses it.

2. Add "Escalation Policies" as a navigation item in the global sidebar/navigation
   (matching the position described in shared_global_sidebar_ui_spec.md).
   The nav item should be active when the current path starts with /escalation-policies.

3. Ensure the EscalationPoliciesPage is wrapped in the same layout shell (e.g. MainLayout)
   used by the settings pages.

Do NOT re-generate any previously created files — only update App.tsx and the
layout/navigation components that need to change.
```

---

## Execution Order Summary

```
Step 1  →  src/types/escalationPolicy.ts
Step 2  →  src/services/escalationPolicyService.ts
           src/hooks/useEscalationPolicies.ts
Step 3  →  src/features/escalation-policy/**
Step 4  →  src/App.tsx (route)
           src/layouts/* or sidebar component (nav item)
```

> **Note:** After Step 4, run `npm run dev` inside `ticket-mgt-app/` and verify
> the Escalation Policies page loads, search works, and Add/Edit/Delete flows
> complete end-to-end against the running Spring Boot API.
