# Add New User(s)

## Purpose
Allows administrators to invite one or multiple new users to the organization, either through manual data entry row-by-row or by executing a bulk import using a CSV file.

## Layout
This screen replaces the main content dashboard area with a focused input form:
- **Global Sidebar (Left):** See [shared_global_sidebar_ui_spec.md](../shared_global_sidebar_ui_spec.md).
- **Top Navigation Bar:** See [shared_top_navigation_bar_ui_spec.md](../shared_top_navigation_bar_ui_spec.md).
- **Main Content Area (Right):**
  - **Page Header:** Primary title "Add New User(s)".
  - **Organizational Context:** A notice detailing the "Allowed email domains for your organization", with the domain explicitly bolded.
  - **Bulk Import Zone:** A textual drag-and-drop area with an actionable text link to select a file manually, followed by an informational tooltip icon.
  - **Dynamic Input Grid:** A multi-row form organized visually into columns for structured data entry. It dynamically displays empty placeholder rows beneath active inputs.
  - **Action Footer:** Fixed buttons at the bottom for submission or cancellation.

## Components
- **Global Components:** Sidebar and Top Nav (see shared specs).
- **File Upload Trigger:** Text link ("select a file from your computer") and implicit drag-and-drop zone.
- **Informational Icon:** Tooltip 'i' icon near the CSV import text for detailed file specifications.
- **Text Inputs:** First Name, Last Name, Email fields.
- **Dropdown Selectors:** User Type dropdown.
- **Action Icons:** Trash bin icon for deleting individual input rows.
- **Buttons:** 
  - Primary (Solid blue): "Send X Invite(s)" (Dynamic text based on filled rows).
  - Secondary (Text/Outline): "Cancel".

## Fields
Organized as a repeating input row for each invitee:
- **First Name:** Text input field. Placeholder "First Name".
- **Last Name:** Text input field. Placeholder "Last Name".
- **Email:** Text input field expecting a valid email format (and implied to enforce the allowed organization domain). Placeholder "Email".
- **User Type:** Dropdown selector to grant specific roles. Visually defaults to "User", with other options like "Stakeholder" available.
- **Row Action (Delete):** A red trash can icon located at the end of each row.

## User Actions
- **Bulk Import (CSV):** Drag and drop a properly formatted `.csv` file onto the browser window, or click the text link to open the OS file picker.
- **View Import Rules:** Hover over the 'i' tooltip icon for details on the CSV staging format.
- **Manual Data Entry:** Type invitee details into the First Name, Last Name, and Email text fields.
- **Assign Roles:** Use the "User Type" dropdown to assign different authorization levels per invitee.
- **Delete Row:** Click the red trash icon on an active row to remove that invitee from the current staging list.
- **Submit Invites:** Click the primary "Send X Invite(s)" button. The button's text dynamically updates 'X' to reflect the total number of populated, valid rows.
- **Cancel Operation:** Click "Cancel" to discard all entered data and return to the previous User List view.

## Forms
- **Multi-Invitee Form:** Serves as a dynamic array form. Filling out an empty row causes a new, disabled placeholder row beneath it to become active, allowing for continuous data entry without manual "add row" clicks.

## Tables
- N/A (While visually arranged in a grid, this operates exclusively as a form input area).

## Pagination / Filters
- N/A

## Navigation
- This page acts as a temporary state. Submitting invites or clicking "Cancel" will navigate the admin back to the main Users directory.

## Error / Empty States
- **Disabled Rows:** Inactive placeholder rows (e.g., the third row when only one is filled) are styled with subdued, grayed-out colors and disabled action icons, preventing interaction until the row above is utilized.
- **Validation (Implied):** A prominent note states the strictly allowed email domain (e.g., "nujayar.com"). Submitting emails outside of this domain bounds (e.g., entering a gmail.com address) is expected to trigger field-level validation errors upon submission.
