# Service Filter User Stories

## Epic: Inventory Filtering

### Story: Open and Manage Filtering Side Drawer
**As a** DevOps Engineer  
**I want** to see a side-drawer focused strictly on filtering the services inventory  
**So that** I can apply complex criteria (like Service Owners) without cluttering the main table UI.

**Acceptance Criteria:**
- **Given** I am on the Services page
- **When** I click the filter icon on the right side of the main header
- **Then** the "Filter" side drawer overlays the right side of the screen.
- **And** the background is dimmed to maintain focus.

### Story: Filter by Service Owner or Squad
**As a** Team Lead  
**I want** to filter the service list by assigning owners or squads to a persistent filter state  
**So that** I can narrow down my operational focus to specific teams.

**Acceptance Criteria:**
- **Given** I open the Filter drawer
- **When** I click into the "Search for users or squads" combobox
- **And** I type "Michael Nguyen" or select an option from the "YOU & YOUR SQUADS" grouping
- **Then** a visible "Chip" is created below the search field (e.g., "Michael Nguyen (You)").
- **And** I can add multiple owners, with each appearing as a removable chip.

### Story: Apply and Clear Multiple Filters
**As a** DevOps Engineer  
**I want** to commit my filter selections and clear all active filters globally  
**So that** I can modulate my dashboard results efficiently.

**Acceptance Criteria:**
- **Given** I have one or more owners selected internally as chips
- **When** I click the primary "Apply" button in the drawer footer
- **Then** the drawer closes and the Services list refreshes based on my criteria.
- **And** if I click "Clear all filters" in the footer, all current selections are purged.

### Story: Select All Owners/Squads
**As a** DevOps Engineer  
**I want** to select all owners in a grouping at once  
**So that** I don't have to manually click individual items in large teams.

**Acceptance Criteria:**
- **Given** I have the "Service Owner" dropdown open
- **When** I click the "Select All" link action
- **Then** all available owners are added as chips to the filter state.
- **And** if I click "Clear" next to the category label ("Service Owner"), all chips for that specific grouping are removed.
