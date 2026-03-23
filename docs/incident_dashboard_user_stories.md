# Incidents Page User Stories

These user stories were generated based on the Incidents Page UI screenshot.

## Epic: Incident Management

**As an** incident responder  
**I want** to see a list of incidents from the last 7 days  
**So that** I have visibility into recent system issues  

**Acceptance Criteria**  
- Given the user navigates to the Incidents page  
- When the page loads  
- Then the system displays a list of incidents from the past 7 days in a tabular format  
- And the table includes the following columns: Incident Message, Service, Alert Source, Assignee, Status, Priority, Created At, Elapsed, Postmortems, and Notes.

---

**As an** incident responder  
**I want** to manually create a new incident  
**So that** I can track issues that were not automatically detected by the system  

**Acceptance Criteria**  
- Given the user is on the Incidents page  
- When the user clicks the "Create New Incident" button  
- Then the system opens a form to enter details for a new incident.

---

**As an** incident responder  
**I want** to update the priority of an incident  
**So that** my team understands the severity and urgency of the issue  

**Acceptance Criteria**  
- Given the user is viewing the incidents list  
- When the user clicks the "Update Priority" button on an incident row  
- Then the system displays a dropdown with options: "P1 Priority 1", "P2 Priority 2", "P3 Priority 3", "P4 Priority 4", "P5 Priority 5", and "Unset"  
- When the user selects a priority  
- Then the incident's priority is immediately updated and reflected in the list.

---

**As an** incident responder  
**I want** to acknowledge a triggered incident  
**So that** my team knows that I am actively investigating the issue  

**Acceptance Criteria**  
- Given an incident with a "Triggered" status in the list  
- When the user clicks the "Acknowledge" button for that incident  
- Then the system updates the incident's status to "Acknowledged".

---

**As an** incident responder  
**I want** to snooze an incident for a defined period  
**So that** I can temporarily silence alerts and focus on more urgent tasks  

**Acceptance Criteria**  
- Given an incident in the list  
- When the user clicks the "Snooze" button for that incident  
- Then a dropdown appears with predefined duration options (e.g., 30 Mins, 1 Hr, 4 Hrs, 8 Hrs, 24 Hrs)  
- When the user selects a duration  
- Then the incident alerts are suppressed for the selected time period.

---

**As an** incident responder  
**I want** to select multiple incidents at once  
**So that** I can perform bulk actions for updating priority on them efficiently  

**Acceptance Criteria**  
- Given the user is on the Incidents page  
- When the user checks the checkbox next to one or more incidents  
- Then the system allows the user to apply actions (like Acknowledge, Resolve, etc.) to all selected incidents simultaneously.

## Epic: Incident Filtering and Navigation

**As an** incident responder  
**I want** to filter the incident list by status  
**So that** I can focus exclusively on incidents that require my attention  

**Acceptance Criteria**  
- Given the incidents page is loaded  
- When the user clicks on any of the status tabs (All, Open, Triggered, Acknowledged, Resolved, Suppressed)  
- Then the incident list updates to show only the incidents matching the selected status.

---

**As a** team member  
**I want** to search for specific incidents  
**So that** I can quickly locate an issue using keywords  

**Acceptance Criteria**  
- Given there are incidents displayed on the page  
- When the user enters text in the search bar  
- Then the system filters the list to display incidents containing the matching keywords.

---

**As an** engineering manager  
**I want** to download the list of incidents  
**So that** I can perform offline analysis or generate performance reports  

**Acceptance Criteria**  
- Given the user is viewing the incidents list  
- When the user clicks the "Download" link  
- Then the system generates and initiates a file download containing the currently displayed incidents data.

## Epic: UI Customization

**As a** user  
**I want** to toggle between list and grid views for incidents  
**So that** I can choose the data presentation format that works best for me  

**Acceptance Criteria**  
- Given the user is on the Incidents page  
- When the user clicks the view toggle button (list/grid icon near Download)  
- Then the layout of the incidents shifts to the selected visual representation.

---

**As a** user  
**I want** to adjust the number of rows displayed per page  
**So that** I can control the density of information visible without scrolling  

**Acceptance Criteria**  
- Given the incidents table contains multiple pages of data  
- When the user selects a different value in the "Show rows per page" dropdown (e.g., 20)  
- Then the table refreshes to display the selected number of rows on a single page.
