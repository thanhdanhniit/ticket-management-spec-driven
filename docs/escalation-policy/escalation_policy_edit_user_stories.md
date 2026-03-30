# Epic: Escalation Policies Management

## User Story 1: Invoke Edit Modal
**As a** system administrator
**I want** to edit a policy via a lightweight modal rather than navigating away
**So that** I can make fast routing updates and immediately return to the table view

**Acceptance Criteria**
* **Given** the user clicks the "Edit" action from a row's dropdown menu
* **When** the centered modal overlay renders
* **Then** the form's Name, Description, and dynamic sequence blocks are pre-populated with the exact backend configuration for that policy

## User Story 2: Update Escalation Intervals
**As a** system administrator
**I want** to manually adjust the wait times or target endpoints for existing rules
**So that** I can re-route alert flows as team schedules change

**Acceptance Criteria**
* **Given** the user is actively engaged in the centered edit modal
* **When** they swap values within the Wait Time input or change the searchable Target Assignee dropdown
* **And** click the "Save" action
* **Then** the updated JSON payload modifies the database configuration entirely
* **And** the modal gracefully closes

## User Story 3: Prevent Total Step Deletion
**As a** system administrator
**I want** structural safeguards preventing me from removing the last escalation step
**So that** meaningless policies that don't escalate to anyone cannot exist in the system

**Acceptance Criteria**
* **Given** the edit modal is populated with a single remaining escalation sequence block
* **When** the user attempts to click the "Delete" trash icon to remove the final step
* **Then** the system fundamentally blocks the action
* **And** displays an informative constraint indicating a policy must have at least one defined routing step
