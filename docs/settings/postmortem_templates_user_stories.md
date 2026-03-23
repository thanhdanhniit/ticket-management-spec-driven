# Postmortem Templates - User Stories

These user stories were generated based on the "Postmortem Templates" Settings UI screenshot.

## Epic: Postmortem Template Management

**As an** administrator  
**I want** to see a complete vertical list of all available postmortem templates  
**So that** I can quickly audit what documentation structures are currently available to my team after an incident

**Acceptance Criteria**  
- Given I am navigating the Administrative Settings menu  
- When I click on "Postmortem Templates" in the inner sidebar  
- Then the system renders a clean, stacked list view of all existing templates  
- And the specific total count of available templates is prominently displayed next to the page title.

---

**As an** administrator  
**I want** to immediately identify which template is currently configured as the organizational default  
**So that** I know exactly which structure is automatically applied when my team generates new postmortem reports

**Acceptance Criteria**  
- Given I am viewing the list of postmortem templates  
- When the system has an active default template designated  
- Then the system explicitly renders the text label "Default template" in that specific template's row.

---

**As an** administrator  
**I want** to initiate the creation of a brand new postmortem template  
**So that** I can define custom, standardized incident reporting structures perfectly tailored to our specific organizational compliance needs

**Acceptance Criteria**  
- Given the Postmortem Templates list view actively rendered on screen  
- When I click the "Add New Template" button located at the top right of the view  
- Then the system initiates the template creation workflow, navigating me to the builder form or modal.

---

**As an** administrator  
**I want** to modify the contents, name, or structure of an existing postmortem template  
**So that** I can continually update and improve our incident review documentation as our internal engineering processes evolve over time

**Acceptance Criteria**  
- Given I am assessing the list of available postmortem templates  
- When I click the "Edit" (pencil) icon visually aligned to the right on a specific template's row  
- Then the system opens that specific template in an editable state, allowing me to save changes.

---

**As an** administrator  
**I want** to permanently delete an outdated, redundant, or entirely unused postmortem template  
**So that** our organizational template library remains uncluttered, relevant, and easy for incident responders to navigate

**Acceptance Criteria**  
- Given I am viewing the library list of postmortem templates  
- When I click the red "Delete" (trash can) icon on a specific template's row  
- Then the system initiates a deletion sequence, removing that template entirely from the active list. *(Note: While not pictured, standard UX behavior implies a definitive confirmation prompt will appear prior to final destructive execution).*
