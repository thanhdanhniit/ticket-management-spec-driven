# Epic: Service Management

## User Story 1: Enable and Interact with Progressive Maintenance Mode
**As a** service owner  
**I want** to activate Maintenance Mode and define recurring downtime windows  
**So that** monitoring systems ignore alerting during planned outages

**Acceptance Criteria**
* **Given** the user opens the Maintenance Mode overlay initially
* **When** the active service structurally has zero maintenance windows established
* **Then** the system presents an uncluttered, minimal modal containing solely the "Enable Maintenance" checkbox
* **And** immediately upon checking "Enable Maintenance", the UI dynamically expands vertically to progressively reveal the "Add New Maintenance Window" action label

## User Story 2: Manage Specific Scheduling Blocks
**As a** service owner  
**I want** to manipulate arrays of schedules dynamically  
**So that** complex downtime configurations are mapped appropriately

**Acceptance Criteria**
* **Given** the user explicitly acts upon the "Add New Maintenance Window" label
* **When** the action resolves
* **Then** the UI natively renders the complex "Maintenance Configuration Form" directly beneath it displaying the Start Date/Time, End Date/Time, and "Repeats every" controls
* **And** the user can explicitly purge this particular active block from visual display by clicking the mapped Trash/Delete icon button positioned organically adjacent linearly

## User Story 3: Strict Validation Logic
**As a** system administrator  
**I want** strict programmatic boundaries blocking invalid input mapping specifically for cron-job timelines  
**So that** bad backend schedules are explicitly blocked at the UI layer

**Acceptance Criteria**
* **Given** the user is creating a Maintenance Configuration Form configuration
* **When** they physically pick an End Date or End Time that chronologically resolves explicitly *before* the Start Date logic
* **Then** the system visually flags an inline error validating "Invalid Time Range" explicitly rejecting the submission capability

* **Given** the user interacts with the Configuration Form
* **When** the "Repeats every" structural dropdown or End Time bounds are completely ignored
* **Then** the system inherently restricts or physically disables the main "Save" button triggering a requirements error immediately highlighting missing criteria
