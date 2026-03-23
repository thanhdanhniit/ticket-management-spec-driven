# Audit Logs

## Purpose
Provides administrators and compliance officers with a deeply detailed, chronological record of all user activities, status changes, and configuration modifications made within the system.

## Layout
The view utilizes the standard administrative settings framework but introduces dedicated tabbed routing and a dense data grid:
- **Global Sidebar (Left, Collapsed):** See [shared_global_sidebar_ui_spec.md](../shared_global_sidebar_ui_spec.md). Operating in a collapsed, icon-only state.
- **Top Navigation Bar:** See [shared_top_navigation_bar_ui_spec.md](../shared_top_navigation_bar_ui_spec.md). Standard layout without the specific team context selector.
- **Secondary Settings Sidebar (Inner Left):** See [shared_settings_sidebar_ui_spec.md](./shared_settings_sidebar_ui_spec.md). The "Audit Logs" link is actively highlighted.
- **Main Content Area (Right):**
  - **Page Header:** Features the "Audit Logs" title and a descriptive subtitle characterizing the page's security tracking purpose.
  - **Tab Navigation:** Secondary navigation tabs positioned immediately underneath the header ("Live logs" and "Export history").
  - **Filter & Export Bar:** A dedicated row sitting above the table spanning the content width. Left-aligned date range text; Right-aligned timezone indicator, Filter icon button, and "Export" button.
  - **Data Table:** A structured, multi-column grid displaying the chronological event data.
  - **Pagination Footer:** Bottom right alignment containing rows-per-page selection and sequential paging controls.

## Components
- **Global Components:** Sidebar, top nav, settings navigation (see shared specs).
- **Tab Group:** Text-based tabs indicating primary sub-views ("Live logs", "Export history").
- **Labels:** Dynamic text conveying current state bounds (e.g., "Showing Logs from [Date] to [Date]", "Timezone:...").
- **Buttons (Primary):** "Export" (Solid blue background).
- **Buttons (Icon):** Filter icon button (outline/tertiary style).
- **Table Elements:** Standard grid with defined column headers and categorized data rows featuring inline user avatars.
- **Pagination Controls:** Dropdown selector for "Show rows per page" (defaulting to 10) and clickable chevron arrows (`<` `>`) for navigating pages.

## Fields
Data fields mapped specifically to the audit table columns:
- **RESOURCE:** The system entity or module affected by the change (e.g., Runbook, Schedules, Services).
- **TYPE OF ACTION:** A concise description of the modification or event (e.g., "Added new service", "Updated service alert source(s)").
- **ACTORS:** The user responsible for the action, visually represented by an avatar initials bubble and their corresponding full name.
- **TIMESTAMP:** The precise date and time the action occurred, localized to the indicated timezone.
- **TEAM:** The organizational sub-team context within which the action occurred (e.g., "Default Team").
- **CLIENT:** The interface or source originating the action (e.g., "web").

## User Actions
- **View Navigation:** Click between the "Live logs" and "Export history" tabs to shift context.
- **Apply Filters:** Click the Filter icon to presumably open a dedicated interface (modal or drawer) to refine the log results by specific criteria (resource, actor, date, etc.).
- **Export Data:** Click the primary "Export" button to initiate a package download of the current or filtered log view.
- **Adjust View Density:** Use the "Show rows per page" dropdown in the footer to display more or fewer log entries concurrently.
- **Navigate History:** Click the `<` or `>` pagination arrows to traverse chronologically older or newer log events.

## Forms
- No explicit primary data entry forms on this view. Filtering and exporting likely invoke secondary form modals or side-panels not depicted here.

## Tables
- **Audit Event Table:** A standard, structured data grid prioritized for high information density and strict scanning of chronological events.

## Pagination / Filters
- **Filters:** Supported via a dedicated Filter icon button in the action bar, supplemented by an active structural date-range limit shown in plain text.
- **Pagination:** Fully supported with a dedicated footer component allowing structural control over list length and iterative page-by-page viewing.

## Navigation
- Operates primarily as an isolated, deep-linked tool within the Settings menu structure.

## Error / Empty States
- None visibly rendered. If no logs exist within a selected date range, an empty state illustration reading "No activity logged for this period" would likely replace the table body.
