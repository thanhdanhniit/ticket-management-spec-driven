# Epic: Service Management

## User Story 1: Create a Service Successfully
**As a** system administrator  
**I want** to create a new registered service with defined ownership and escalation routing  
**So that** the platform can begin monitoring infrastructure correctly

**Acceptance Criteria**
* **Given** the user is currently filling out the Add New Service form
* **When** the user provides a valid Name, selects an Owner from the dynamic autocomplete, assigns an Escalation Policy
* **And** clicks "Save"
* **Then** the new service is generated within the system
* **And** the user is redirected either to the Services List or the newly generated Service Details view

## User Story 2: Autocomplete Dropdowns & Empty Search State
**As a** system user  
**I want** to easily search for relational data (Owners, Policies) and receive feedback if my search is invalid  
**So that** I don't type invalid entities and can locate the correct team seamlessly

**Acceptance Criteria**
* **Given** the user interacts with the Owner or Escalation Policy fields
* **When** the user types a query string into the field
* **Then** a dropdown flyout renders updating with live matched users or policies dynamically
* **And** selecting an option collapses the flyout and locks the text into the input

* **Given** the user is typing into the relational input fields
* **When** their typed query string does not match any existing Owner or Escalation Policy recorded in the database
* **Then** the dropdown flyout explicitly displays an inline text label stating "No matches found."

## User Story 3: Mandatory Validation and API Errors
**As a** system administrator  
**I want** the system to enforce data integrity constraints gracefully  
**So that** orphaned or un-routable services are never created and I know when actions fail

**Acceptance Criteria**
* **Given** the user attempts to submit the Add New Service form
* **When** a mandatory field (e.g., Name, Owner, Escalation Policy) is left completely blank
* **Then** the system forcibly blocks the form submission
* **And** explicitly highlights the problematic field mapped alongside an inline "This field is required" error message

* **Given** the user submits a thoroughly filled, valid form
* **When** the server rejects the payload due to an external network failure
* **Then** the system prevents catastrophic data abandonment by explicitly catching the sequence and presenting an informative dismissible error toast to the user
