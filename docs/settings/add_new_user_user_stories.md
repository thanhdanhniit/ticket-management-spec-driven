# Add New User - User Stories

These user stories were generated based on the "Add New User(s)" UI screenshot.

## Epic: Manual User Invitation

**As an** administrator  
**I want** to manually enter a new user's details (name, email, and role)  
**So that** I can quickly invite a specific individual to join our organization's workspace

**Acceptance Criteria**  
- Given I am on the "Add New User(s)" page  
- When I type into the "First Name", "Last Name", and "Email" fields for an empty row  
- And I select a "User Type" from the dropdown (e.g., "User" or "Stakeholder")  
- Then all input is captured, and I can successfully proceed to send the invite for that row.

---

**As an** administrator  
**I want** the system to automatically present additional empty input rows as I enter data  
**So that** I can seamlessly invite multiple users sequentially without clicking an "add row" button repeatedly

**Acceptance Criteria**  
- Given I am actively typing data into a previously empty input row  
- When I engage the row and begin data entry  
- Then the system automatically activates the disabled placeholder row directly beneath it, ensuring a continuous multi-user entry flow.

---

**As an** administrator  
**I want** to securely delete an invitee row before I press submit  
**So that** I can correct input mistakes or change my mind about inviting a particular person without reloading the page

**Acceptance Criteria**  
- Given I have populated one or more user input rows manually or via import  
- When I click the red trash bin icon located at the end of a specific row  
- Then the system totally clears that row's data and removes it from the current staging list.


## Epic: Bulk User Import

**As an** administrator  
**I want** to dynamically select a CSV file from my computer to populate the invite list  
**So that** I can efficiently invite a large number of users simultaneously without tedious manual data entry

**Acceptance Criteria**  
- Given I am on the "Add New User(s)" page  
- When I click the active "select a file from your computer" text link  
- Then my operating system's standard file picker dialogue opens to select a local `.csv` file  
- When I select a valid CSV file  
- Then the system processes the file and bulk-populates the dynamic invitation list rows immediately below with the extracted data.

---

**As an** administrator  
**I want** to drag and drop a CSV file onto the page  
**So that** I can quickly trigger a bulk user import through a highly intuitive, visual action

**Acceptance Criteria**  
- Given I am on the "Add New User(s)" page  
- When I drag a valid `.csv` file from my local machine and release it over the designated import text area  
- Then the system immediately ingests the file and parses the data into the invitation list rows.

---

**As an** administrator  
**I want** to view the rigidly required CSV formatting rules directly on the page  
**So that** I structure my CSV file correctly prior to attempting a bulk import

**Acceptance Criteria**  
- Given I am preparing to bulk import users  
- When I hover over or click the informational (`i`) tooltip icon next to the CSV instruction text  
- Then the system elegantly displays the required column formatting (e.g., First Name, Last Name, Email, Role) to guarantee a successful import.


## Epic: User Invitation Validation

**As an** administrator  
**I want** the system to strictly enforce our allowed organizational email domains during the invitation process  
**So that** external or unauthorized individuals cannot be accidentally invited to access our private workspace

**Acceptance Criteria**  
- Given the system defines allowed email domains, explicitly visually stated on the page (e.g., "Allowed email domains for your organization: **nujayar.com**")  
- When I attempt to invite a user with an email residing outside of those allowed domains (e.g., entering a "gmail.com" address)  
- Then the system actively catches and prevents the form submission  
- And it clearly displays an inline validation error message explicitly indicating which specific row violates the organizational domain policy.

---

**As an** administrator  
**I want** the primary submission button to perpetually state exactly how many invites I am about to send  
**So that** I have full confidence I am sending precisely the intended number of invitations 

**Acceptance Criteria**  
- Given I am adding and removing populated user rows (either manually or via CSV)  
- When a valid row is successfully added or actively deleted  
- Then the numerical value rendered inside the primary submit button (e.g., "Send 3 Invite(s)") dynamically updates to match my exact count of valid rows.

---

**As an** administrator  
**I want** to be able to effortlessly cancel the entire invitation process  
**So that** I can discard unintentional changes or safely back out of the page without generating invites

**Acceptance Criteria**  
- Given I have partially filled out or imported user invite information into the grid  
- When I click the secondary "Cancel" button  
- Then my staging data is completely discarded, and the system navigates me back to the primary "Users List" administrative settings view.
