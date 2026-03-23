# Incident Filter User Stories

These user stories were generated based on the Incident Filter Panel UI screenshot.

## Epic: Incident Advanced Filtering

**As an** incident responder  
**I want** to filter incidents by assignee  
**So that** I can see incidents assigned to specific team members or unassigned incidents  

**Acceptance Criteria**  
- Given the incident filter panel is open  
- When I interact with the "Assignee" dropdown  
- Then I can search for and select one or more assignees to filter the list.

---

**As an** incident responder  
**I want** to filter incidents by creation date  
**So that** I can focus on incidents that occurred within a specific time period  

**Acceptance Criteria**  
- Given the incident filter panel is open  
- When I interact with the "Created" dropdown  
- Then I can type or select a specific date range to filter the list.

---

**As an** incident responder  
**I want** to filter incidents by service owner  
**So that** I can see issues related to services owned by specific individuals or teams  

**Acceptance Criteria**  
- Given the incident filter panel is open  
- When I interact with the "Service Owner" dropdown  
- Then I can search for and select a service owner to filter the list.

---

**As an** incident responder  
**I want** to filter incidents by specific services  
**So that** I can isolate issues impacting the services I care about  

**Acceptance Criteria**  
- Given the incident filter panel is open  
- When I interact with the "Services" dropdown  
- Then I can type or select one or more services to filter the list.

---

**As an** incident responder  
**I want** to filter incidents by custom tags  
**So that** I can find incidents based on specific custom metadata  

**Acceptance Criteria**  
- Given the incident filter panel is open  
- When I interact with the "Tags" dropdown  
- Then I can type or select a tag "Key" and a corresponding tag "Value" to filter the list.

---

**As an** incident responder  
**I want** to filter incidents by alert source  
**So that** I can identify issues coming from a specific monitoring integration  

**Acceptance Criteria**  
- Given the incident filter panel is open  
- When I interact with the "Alert Sources" dropdown  
- Then I can type or select one or more alert sources to filter the list.

---

**As an** incident responder  
**I want** to filter incidents by priority  
**So that** I can focus on high-severity issues first  

**Acceptance Criteria**  
- Given the incident filter panel is open  
- When I interact with the "Priority" dropdown  
- Then I can type or select one or more priority levels to filter the list.

---

**As an** incident responder  
**I want** to filter incidents based on whether they have an associated postmortem  
**So that** I can find incidents that have been reviewed or still need a review  

**Acceptance Criteria**  
- Given the incident filter panel is open  
- When I select the "Yes" or "No" radio button under "Show Incidents with Postmortem"  
- Then the incident list is filtered accordingly.

## Epic: Filter Panel Interactions

**As an** incident responder  
**I want** to apply my selected filter criteria  
**So that** the incident list updates to reflect my search parameters  

**Acceptance Criteria**  
- Given I have selected one or more filter criteria in the panel  
- When I click the "Apply" button  
- Then the filter panel applies the criteria, and the main incident list updates to show the filtered results.

---

**As an** incident responder  
**I want** to save my current filter configuration  
**So that** I can easily reuse these search criteria in the future without re-selecting them  

**Acceptance Criteria**  
- Given I have configured filter criteria in the panel  
- When I click the "Save Filter" link/button  
- Then the system allows me to save the filter configuration, which can later be accessed via the "Saved Filter" tab.

---

**As an** incident responder  
**I want** to clear all currently selected filter criteria at once  
**So that** I can easily reset my search and start over  

**Acceptance Criteria**  
- Given I have selected one or more filter criteria in the panel  
- When I click the "Clear All" link/button  
- Then all input fields and selections in the filter panel are reset to their default unselected state.

---

**As an** incident responder  
**I want** to close the filter panel  
**So that** I can focus purely on the incident list  

**Acceptance Criteria**  
- Given the incident filter panel is open  
- When I click the 'X' (close) icon at the top right of the panel  
- Then the panel closes and the UI returns to the standard incident dashboard view.
