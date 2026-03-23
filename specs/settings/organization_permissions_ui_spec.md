# Organization Level Permissions

## Purpose
Allows administrators to granularly view and manage feature-level access and permissions for all users across the organization workspace.

## Layout
The screen leverages the standard triple-column settings layout, slightly modified to accommodate a horizontal matrix:
- **Global Sidebar (Left, Collapsed):** See [shared_global_sidebar_ui_spec.md](../shared_global_sidebar_ui_spec.md). In this view, it is explicitly shown in its collapsed state (icons only).
- **Top Navigation Bar:** See [shared_top_navigation_bar_ui_spec.md](../shared_top_navigation_bar_ui_spec.md). (The Team Context selector is intentionally omitted on organization-level settings).
- **Secondary Settings Sidebar (Inner Left):** See [shared_settings_sidebar_ui_spec.md](./shared_settings_sidebar_ui_spec.md). The "Permissions" link is highlighted within the "Organization" category.
- **Main Content Area (Right):**
  - **Page Header:** Features the primary title "Organization Level Permissions," instructional subtext, and an embedded documentation link.
  - **Action Bar:** Top right area containing a dedicated search bar.
  - **Permissions Matrix (Table):** A specialized data grid occupying the remainder of the view, mapping users (rows) to module permissions (columns).

## Components
- **Global & Shared Components:** Global Sidebar (Collapsed), Top Nav Bar, Settings Sidebar.
- **Text Inputs:** Search input field dedicated to filtering the matrix, featuring a `/` hotkey visual hint.
- **Data Table / Matrix:** A wide grid combining detailed user metadata cells with simple interactive checkbox cells.
- **Checkboxes:** State toggles used to indicate and modify individual permissions.
- **Inline Icons:** User metadata rows utilize tiny icons to denote Email, Workspace context, and User Role.

## Fields
- **Search Input:** Text field to filter the data grid by user details.
- **Name (Matrix Column):** A composite field displaying:
  - Full Name (and "- you" identifier).
  - Email Address (preceded by a mail icon).
  - Account/Workspace identifier (preceded by an ID card icon).
  - Role Assignment (preceded by a person icon, e.g., "Account Owner").
- **Permission Checkbox Columns:** A broad set of Boolean (checked/unchecked) columns mapping to distinct application features:
  - Users
  - Teams
  - Postmortem Templates
  - Audit Logs

## User Actions
- **Navigate Settings:** Use the inner sidebar to jump between related administrative views.
- **Access Documentation:** Click the "Learn more about permissions here." text link.
- **Search Users:** Click or type `/` to focus the search bar, enabling rapid filtering of the permissions matrix to find a specific team member.
- **Modify Access (Toggle Checkboxes):** Click individual checkboxes intersecting a User row and a Module column to grant or revoke specific permissions (Assuming non-owner rows are interactive; Account Owner roles typically have these locked/disabled).

## Forms
- Operates entirely as a massive inline "auto-save" form grid. There is no explicit "Save" or "Submit" button; toggling a checkbox immediately persists the permission change.

## Tables
- **Permissions Matrix Table:** The central focus of the UI. It features a dense, multi-line "Name" column on the left to provide necessary user context without wasting horizontal space, dedicating the rest of the table's width to the sprawling list of permission checkboxes.

## Pagination / Filters
- **Filters:** Exclusively controlled by the textual Search input.

## Navigation
- Employs the standard settings routing pattern defined in the shared sidebar specs.

## Error / Empty States
- Though not shown, searching for a non-existent user would yield a standard "No results found" empty state replacing the matrix.
