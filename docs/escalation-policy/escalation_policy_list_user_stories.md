# Epic: Escalation Policies Management

## User Story 1: View Escalation Policies List
**As a** system administrator
**I want** to view a paginated list of all configured escalation policies
**So that** I can easily audit and manage the incident routing rules within the system

**Acceptance Criteria**
* **Given** the user navigates to the Escalation Policies list view
* **When** the application data loads successfully
* **Then** a tabular datatable displays consisting of policy Names and Key Associations
* **And** bottom-aligned pagination controls allow the user to navigate through multiple pages of results
* **And** if zero policies exist across the system, an empty state illustration prompts the user to "Create your first Escalation Policy"

## User Story 2: Search Policies Dynamically
**As a** system administrator
**I want** to search the table by policy name
**So that** I can rapidly locate a specific configuration

**Acceptance Criteria**
* **Given** the policies list is displayed with records
* **When** the user types a query string into the search input
* **Then** the table automatically filters to show only rows that match the query
* **And** if no records match the query, the table explicitly displays a "No Escalation Policies found matching criteria" message

## User Story 3: Manage Row Level Actions
**As a** system administrator
**I want** to trigger contextual actions on an individual policy row
**So that** I can edit or delete a policy without needing to open its full detail view first

**Acceptance Criteria**
* **Given** a user is viewing the policies datatable
* **When** the user clicks the "..." action menu icon on a specific row
* **Then** a dropdown opens displaying "Edit" and "Delete" options
* **And** clicking "Delete" triggers a destructive confirmation modal warning the user before proceeding

## User Story 4: Protected Deletion Errors
**As a** system administrator
**I want** the system to gracefully block destructive actions on protected records
**So that** I do not accidentally break routing logic for active services

**Acceptance Criteria**
* **Given** an escalation policy is actively assigned to an operational service
* **When** the user attempts to execute the "Delete" action on that policy
* **Then** the backend rejects the logical deletion
* **And** the UI displays an explicit error message stating the policy cannot be deleted while assigned
