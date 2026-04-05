# Service Maintenance User Stories

## Epic: Maintenance Operations Control

### Story: Open and Manage Maintenance Mode Side Drawer
**As an** Operations Specialist  
**I want** to see a side-drawer focused strictly on managing maintenance windows for my services  
**So that** I can enable or disable alerting suppression without leaving the service list view.

**Acceptance Criteria:**
- **Given** I am on the Services list page
- **When** I click "Maintenance Mode" for a specific service in the row actions
- **Then** the "Maintenance Mode" side drawer overlays the right side of the screen.
- **And** I can see the list of service(s) currently selected for this maintenance session.

### Story: Toggle Service Maintenance State
**As an** Operations Specialist  
**I want** to enable or disable the maintenance state using a single switch  
**So that** I can control the display of maintenance rules centrally.

**Acceptance Criteria:**
- **Given** I open the "Maintenance Mode" drawer
- **When** the "Enable maintenance for service(s)" switch is toggled OFF
- **Then** I see an empty state illustration with the message "Enable maintenance for the selected service(s)".
- **And** if I toggle the switch ON, the placeholder graphic disappears and the configuration form is revealed.

### Story: Schedule a New Maintenance Window
**As an** Operations Specialist  
**I want** to define the duration and recurrence of my maintenance period  
**So that** alerts are automatically suppressed during a specific deployment or migration window.

**Acceptance Criteria:**
- **Given** the maintenance switch is toggled ON in the drawer
- **When** I fill in the "Start Date", "Start Time", and "End Date", "End Time" fields
- **And** I select an interval from the "Repeats every" dropdown (e.g., "Never" or a specific recurrence)
- **And** I click "Save"
- **Then** the maintenance schedule is created and saved for the indicated services.
- **And** any required fields (marked with red asterisks) must be filled before saving is allowed.

### Story: Manage Multiple Maintenance Windows
**As an** Operations Specialist  
**I want** to add multiple non-contiguous maintenance schedules or delete existing ones  
**So that** I can plan for recurring work without overwriting my one-off maintenance events.

**Acceptance Criteria:**
- **Given** maintenance is enabled for a service
- **When** I click the "Add New Maintenance Window" link
- **Then** an additional "New Maintenance Schedule" block is appended to the drawer.
- **And** I can click the red trash/delete icon on any specific schedule block to remove it.
- **And** clicking "Save" persists all active blocks in a single transaction.

### Story: Cancel Maintenance Modifications
**As an** Operations Specialist  
**I want** to discard my schedule changes without applying them  
**So that** I don't accidentally suppress alerts if I realize my planned work isn't happening.

**Acceptance Criteria:**
- **Given** I have modified one or more schedules in the side drawer
- **When** I click the "Cancel" outline button or the "X" close icon in the header
- **Then** the drawer closes and all unsaved manipulation is discarded.
- **And** the service returns to its last explicitly saved maintenance state.
