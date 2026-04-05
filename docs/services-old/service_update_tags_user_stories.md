# Epic: Service Management

## User Story 1: Inline Tag Management Dynamics
**As a** system user  
**I want** to structurally add or remove identifying metadata tags without navigating to a separate dedicated form  
**So that** tracking operational contexts via badges is rapid and completely frictionless

**Acceptance Criteria**
* **Given** the user executes the "Update Tags" row action from a Service List element
* **When** the contextual popover overlay dynamically renders
* **Then** the user can type a new tag string and hitting 'Enter' automatically converts the raw string visibly into an interactive Badge pill component
* **And** previously linked badge pill components can explicitly be eliminated directly by clicking their embedded 'x' close icons

## User Story 2: State Transitions and Errors
**As a** system user  
**I want** explicit assurances that inputs are saved securely structurally and that syntaxes are formatted properly  
**So that** malformed or unsaved tags do not silently plague the deployment database

**Acceptance Criteria**
* **Given** the user attempts to construct a tag badge physically encompassing invalid or unsupported special characters
* **When** they type
* **Then** an explicit inline helper validation restricts or visually warns against invalid additions completely

* **Given** the user attempts to apply structural modifications by clicking "Save"
* **When** the subsequent server request explicitly errors fundamentally returning an invalid payload status
* **Then** an inline contextual error dictates explicitly "Failed to update tags. Please try again." effectively allowing the user to seamlessly attempt the fix without closing the modal
