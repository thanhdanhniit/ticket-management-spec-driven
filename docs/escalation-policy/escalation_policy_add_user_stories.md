# Epic: Escalation Policies Management

## User Story 1: Open Initial Add Configuration Modal
**As a** system administrator
**I want** to spawn a cleanly contextual overlay form for building policies
**So that** I do not lose my place in the main list view context

**Acceptance Criteria**
* **Given** the user is on the main list view
* **When** they click the "New Escalation Policy" primary action button
* **Then** a centered modal dialog renders securely over the list
* **And** the form contains blank validation inputs for Name and Description
* **And** the form mandates exactly one empty initial Escalation Sequence block exists by default

## User Story 2: Construct Escalation Steps
**As a** system administrator
**I want** to string multiple sequential routing blocks together chronologically
**So that** I can build advanced delayed routing logic

**Acceptance Criteria**
* **Given** the user has the overlay modal opened
* **When** the user configures the Wait Time input (e.g., 15 minutes) and assigns a specific User via the Target dropdown
* **And** the user clicks "Add Escalation Step"
* **Then** a new empty sequence block renders below the initial one
* **And** the user can remove any step by clicking its adjacent Delete trash icon

## User Story 3: Save and Validate Completion
**As a** system administrator
**I want** the system to enforce relational data constraints before saving my policy
**So that** broken or incomplete escalation logic doesn't reach the production database

**Acceptance Criteria**
* **Given** the user is modifying the unified modal
* **When** they click the main "Create" button
* **Then** the system validates the payload
* **And** if the Name is empty or if any escalation step contains a blank "Target" dropdown, the submission is blocked and the missing fields are highlighted in red
* **And** if validation passes, the policy is uniquely saved and the modal dismisses automatically
* **And** clicking "Cancel" completely aborts the un-committed work without saving
