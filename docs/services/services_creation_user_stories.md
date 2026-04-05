# Service Creation User Stories

## Epic: Inventory Onboarding

### Story: Define a New Service
**As a** System Architect  
**I want** to create a new logical unit within the system  
**So that** I can map application alerts to a designated service owner and escalation policy.

**Acceptance Criteria:**
- **Given** I have navigated to the "Add New Service" page (Defined as "Define Service")
- **When** I enter a unique "Service Name" in the required text field
- **And** I provide an optional descriptive summary in the "Description" field
- **And** I click the primary "Save" button
- **Then** the service is successfully created and persists in the registry.
- **And** I am automatically redirected to the Services List page with the new record visible.

### Story: Validate Duplicate Service Names
**As a** DevOps Engineer  
**I want** the system to prevent me from creating duplicate service identifiers  
**So that** I don't confuse multiple alerting pipelines with the same name.

**Acceptance Criteria:**
- **Given** I am on the Define Service page
- **When** I enter a name that already exists in the system registry
- **And** I click "Save"
- **Then** I see an inline validation error highlighting the "Service Name" field.
- **And** the record is not created until I provide a unique name.

### Story: Handle Service Creation Empty Registry
**As a** first-time user  
**I want** to see a call to action on the Services list  
**So that** I am guided to the service definition form when my dashboard is empty.

**Acceptance Criteria:**
- **Given** the service inventory has zero records
- **When** I navigate to the Services module
- **Then** I see the message "Let's align your sources" with a prominent "Add New Service" button.
- **And** clicking that button takes me directly to the creation form.
