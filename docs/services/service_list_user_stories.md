# Epic: Service Management

## User Story 1: View Services List
**As a** system user  
**I want** to view a paginated list of all services with their key metrics  
**So that** I can assess the operational health of my infrastructure

**Acceptance Criteria**
* **Given** the user navigates to the services directory
* **When** the page successfully loads with services data
* **Then** the system displays a tabular list including Name, Alerts, Owner, and 30-day metrics (MTTA, MTTR, Open Incidents)
* **And** the data is appropriately paginated

## User Story 2: Row Actions and Tag Displays
**As a** system user  
**I want** to easily discern multiple tags and access row-level functions without cluttering the UI  
**So that** the table remains clean and readable while still offering quick actions

**Acceptance Criteria**
* **Given** a service row has multiple tags
* **When** the user views the row
* **Then** only the first tag is shown explicitly alongside a "..." button
* **And** clicking the "..." button gracefully reveals a popover containing the full array of tags

* **Given** the user is viewing the Services list
* **When** the user hovers their cursor over a specific service row
* **Then** contextual action buttons specifically for that row (Update Tags, Maintenance Mode) dynamically appear between the MTTA and Status columns

## User Story 3: Empty and Error States
**As a** system user  
**I want** explicit feedback when data cannot be shown  
**So that** I know how to proceed to resolve the issue

**Acceptance Criteria**
* **Given** there are absolutely zero recorded services within the system
* **When** the user attempts to load the Services list
* **Then** an explicit Empty State view is rendered instructing the user that "No services are available", accompanied by a prominent "Create your first Service" action button

* **Given** the user is attempting to view the Services list
* **When** the API request fails due to a network or server issue
* **Then** an error banner stating "Failed to load data. Please try again." is displayed alongside an explicit "Retry" button
