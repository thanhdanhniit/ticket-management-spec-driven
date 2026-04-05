# Services List Page

## Purpose
The Services list page provides a directory of logical units (services) mapped to alert sources. It offers an overview of services, health metrics, dependencies, and open incidents, enabling users to manage configurations and monitor their infrastructure's operational status.

## Layout
The page is structured using a Sidebar Layout with a prominent Header and main Content Area:
- **Top Banner**: Displays system-wide alerts and necessary notifications below the main navigation bar.
- **Header**: Contains the page title, a brief description, and primary page-level actions (Search, Filter, Add New Service).
- **Navigation Tabs**: Positioned directly beneath the header text to toggle between different perspectives (Overview, Graph).
- **List Controls Toolbar**: Sits above the main data grid displaying record counts and view toggle controls (list/grid).
- **Content Area (Table)**: Houses a data table listing all services with their respective details.
- **Pagination**: Located at the bottom of the list for navigating through multiple records.

## Shared Components
- **Global Sidebar**: For standard navigation between application modules, refer to [shared_global_sidebar_ui_spec.md](../../specs/shared_global_sidebar_ui_spec.md).
- **Top Navigation Bar**: For global utility functions, team switching, and search, refer to [shared_top_navigation_bar_ui_spec.md](../../specs/shared_top_navigation_bar_ui_spec.md).

## Components
- **Alert Banner**: An informational banner with a dismiss option (e.g., "Verify your Phone Number...").
- **Typography Title (H1)**: Displays the current page name, "Services".
- **Typography Body**: Provides context or helpful text describing the page's function.
- **Icon Buttons**: Used for "Search" and "Filter" tools, styled with an outline variant.
- **Primary Button**: Used for the primary call-to-action "Add New Service".
- **Tabs**: Used to switch contexts between the "Overview" list and the "Graph" view.
- **View Toggle**: A group of segmented buttons allowing users to switch data presentations between grid and list formats.
- **Data Table**: A comprehensive HTML/React table component with columns, headers, and interactive rows.
- **Checkboxes**: Positioned as the first item in table rows for record selection.
- **Avatars**: Representing the assigned user or team owner.
- **Tags/Badges**: Visual labels indicating properties like priority or impact (`priority: high`, `impact: widespread`).
- **Status Indicator**: Simple dot or icon paired with text indicating health (e.g., "Healthy").
- **Dropdown List (Select)**: For pagination controls dictating the visible amount of rows.
- **Dropdown Menu (Action)**: Located in individual rows, revealing actions spanning beyond the visible column data.

## Fields
- **Name**: The declarative name for the service.
- **Tags**: Key-value pairs used for metadata classification.
- **Alert Source**: Displays linked systems from which alerts originate.
- **Owner**: Identifies the primary user or team responsible for maintaining the service.
- **Escalation Policy**: Specifies the notification tree used when an alert occurs.
- **Open Incidents (Last 30 Days)**: Summary count of incidents categorized by status (Triggered, Acknowledged).
- **MTTA (Last 30 Days)**: Mean Time To Acknowledge metric (e.g., "21.98 min").
- **MTTR (Last 30 Days)**: Mean Time To Resolve metric (e.g., "27.22 hr").
- **Status**: The real-time health indicator of the service.

## User Actions
- **Dismiss Notification**: Clicking the close/cross icon on the top banner alert to hide the message.
- **Search Services**: Executing the search button to filter services by text string (typically name or tags).
- **Filter View**: Triggering the filter button to open a side drawer to apply complex conditional filters (e.g., filter by Service Owner) (see [service_filter_ui_spec.md](service_filter_ui_spec.md)).
- **Add New Service**: Clicking the primary button to open a form or navigate to the service creation page. (see [service_create_new_ui_spec.md](service_create_new_ui_spec.md)).
- **Switch Views**: Toggling between 'Overview' and 'Graph' tabs.
- **Toggle Layout**: Switching between a list display and a grid (card) display.
- **Select Records**: Interacting with checkboxes to perform bulk actions on multiple services (e.g., bulk assignment).
- **Row Actions**: Pressing the ellipsis or caret on the far right of a row to reveal actions specific to that service, such as entering "Maintenance Mode" (see [service_maintenance_ui_spec.md](service_maintenance_ui_spec.md)) or updating tags (see [services_update_tags_ui_spec.md](services_update_tags_ui_spec.md)).
- **Update Pagination**: Using the dropdown select component at the screen's bottom to change how many items exist per page format (e.g., 10, 25, 50).

## Forms
- *No standalone forms are active in the provided view. Search and Filter actions generally trigger modal or inline popover forms.*

## Tables
**Service Table Schema:**
- **Selection**: Interactive column containing a checkbox for bulk selection scenarios.
- **NAME**: The title of the given service.
- **ALERT SOURCE**: Connected platforms firing incidents specifically to this group.
- **OWNER & ESCALATION POLICY**: Vertically stacks the avatar/name of the owner along with the associated escalation policy text link.
- **OPEN INCIDENTS (LAST 30 DAYS)**: Displays integer indicators indicating current counts for Triggered and Acknowledged events.
- **MTTA (LAST 30 DAYS)**: Displays the time value associated with acknowledgement.
- **MTTR (LAST 30 DAYS)**: Displays the time value associated with resolution.
- **STATUS**: Visual display of the current health state; column terminates with a discrete dropdown control for row-specific actions.

## Pagination / Filters
- **List Metrics**: At the table's header, a textual format specifies current counts (e.g., "Showing 2 of 2").
- **Row Count Control**: Beneath the table, a select dropdown offers varying records per page (default visual: 10).
- **Filters**: Triggered via an outer interface button in the main header space. Used to prune the table presentation.

## Navigation
- **Top Level Sidebar**: (Inferred from UI Structure) Navigating entirely distinct modules like 'Dashboard', 'Incidents', 'Services', 'Teams'.
- **Local Tab Navigation**: Users switch strictly their interface mode by choosing "Overview" (list page standard) or "Graph" (map dependency standard).

## Error / Empty States
- **Empty State (Inferred)**: If the system contains zero services, the main table component transforms into an empty state block reading "Let's align your sources" paired with an "Add New Service" action prominently displayed within a placeholder illustration context.
- **Search Empty State (Inferred)**: If search filters generate zero matches, the table should state "No services match your criteria" allowing the user to readily clear applied filters.
- **Error State (Inferred)**: Should the service catalog fail to fetch from API, a global notification and localized table overlay present an error explanation coupled with a single "Retry Request" button.
