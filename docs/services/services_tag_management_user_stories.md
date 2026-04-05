# Service Tag Management User Stories

## Epic: Metadata Classification

### Story: Open Tag Management Side Drawer
**As an** SRE  
**I want** to see a side-drawer focused strictly on managing tags for a specific service  
**So that** I can add, update, and remove metadata without leaving the list view context.

**Acceptance Criteria:**
- **Given** I am on the Services list page
- **When** I click "Update Tags" for a specific service in the row actions
- **Then** the "Add/Update Tags" side drawer overlays the right side of the screen.
- **And** I can see any existing Key/Value tags for that service.

### Story: Add New Service Tag
**As an** SRE  
**I want** to add a new key-value pair as a tag for my service  
**So that** I can categorize services by priority, impact, or application team.

**Acceptance Criteria:**
- **Given** I open the "Add/Update Tags" drawer for a service
- **When** I click the "Add Tag" ghostly/link button
- **And** I select a "Key" (e.g., `priority`) and an associated "Value" (e.g., `high`) from the dropdowns
- **Then** a new row is added and the "Status" dot shows green to indicate a valid pairing.
- **And** if I type a custom "Value" in the autocomplete input, I see a system suggestion with a "+" (e.g., `+ whole`).

### Story: Bulk Update and Persist Tags
**As an** SRE  
**I want** to save all modified, added, and removed tags in a single action  
**So that** correctly categorized metadata is available to the alerting engine immediately.

**Acceptance Criteria:**
- **Given** I have modified one or more sets of Key/Value pairs in the drawer
- **When** I click the primary "Update Tag(s)" button
- **Then** the changes are submitted to the backend as an array.
- **And** the drawer closes with a success notification.
- **And** if a new key or value was entered, it is automatically added to the system registry.

### Story: Remove a Tag Pairing
**As an** SRE  
**I want** to delete redundant or incorrect tags from my service  
**So that** only relevant metadata is processed during an incident.

**Acceptance Criteria:**
- **Given** I open the "Add/Update Tags" drawer for a service
- **When** I click the "X" (close) icon on the right side of a specific tag row
- **Then** that tag row is immediately removed from the interface list.
- **And** the deletion is finalized upon clicking "Update Tag(s)".
