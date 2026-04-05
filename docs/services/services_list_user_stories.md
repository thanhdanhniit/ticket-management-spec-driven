# Services List User Stories

## Epic: Service Inventory Management

### Story: View Comprehensive Service Directory
**As a** DevOps Engineer  
**I want** to see a tabular directory of all logical services  
**So that** I can assess the operational health, ownership, and performance metrics (MTTA/MTTR) of my infrastructure at a glance.

**Acceptance Criteria:**
- **Given** I am on the Services page
- **When** the service data loads
- **Then** I see a table displaying: Service Name, Alert Sources, Owner & Escalation Policy, Open Incident counts (Last 30 Days), MTTA/MTTR metrics, and current Health Status.
- **And** the "Status" column uses visual status indicators (e.g., green dot for "Healthy").
- **And** owners are represented by their Avatar and Name link.

### Story: Search the Service Registry
**As a** Support Engineer  
**I want** to search for services by text input  
**So that** I can filter the inventory to a specific set of services I'm responsible for or testing.

**Acceptance Criteria:**
- **Given** I am on the Services page
- **When** I click the search tool and type a service name or tag
- **Then** the table is filtered in real-time to match the query.
- **And** if zero results match, I see a "No services match your criteria" message.

### Story: Navigate Paginated Results
**As an** Administrator  
**I want** to adjust the number of services displayed per page  
**So that** I can efficiently browse through large catalogs without excessive scrolling.

**Acceptance Criteria:**
- **Given** I am at the bottom of the Services table
- **When** I select a value (e.g., 25 or 50) from the "Show rows per page" dropdown
- **Then** the table refreshes to show the specified number of records.
- **And** I can navigate between pages using the pagination controls.

### Story: Acknowledge System Notifications
**As a** System User  
**I want** to dismiss informational banners (like the phone verification alert)  
**So that** I can maximize the visible screen real estate for service data.

**Acceptance Criteria:**
- **Given** an alert banner is visible at the top of the Services page
- **When** I click the close/cross icon on the right side of the banner
- **Then** the banner is removed from view and the layout adjusts accordingly.

---

## Epic: User Experience & Reliability

### Story: Handle Data Fetching Failures
**As a** DevOps Engineer  
**I want** the system to inform me if service data fails to load  
**So that** I can distinguish between an empty registry and a technical disconnection.

**Acceptance Criteria:**
- **Given** the service API is unreachable
- **When** I navigate to the Services page
- **Then** I see a localized error message explaining the failure.
- **And** I see a "Retry Request" button to attempt to reload the data.
