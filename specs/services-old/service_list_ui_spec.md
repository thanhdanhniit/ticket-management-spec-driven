# Services List

## Purpose
To display a list of all services managed within the system, allowing users to view, search, filter, and navigate to individual service details or create new services.

## Layout
- **Global Sidebar**: Shared sidebar for main application navigation. Reference: [`shared_global_sidebar_ui_spec.md`](../shared_global_sidebar_ui_spec.md)
- **Top Navigation Bar**: Shared header containing global actions (user profile, notifications, search). Reference: [`shared_top_navigation_bar_ui_spec.md`](../shared_top_navigation_bar_ui_spec.md)
- **Main Content Area**:
    - **Header Section**: Displays the page title "Services" and primary action button (e.g., "New Service").
    - **Filter Section**: Search bar and advanced filter toggles.
    - **Data Table**: Tabular layout displaying the list of services.
    - **Pagination**: Controls located at the bottom of the content area.

## Components
- Page Title Label
- Primary Action Button ("New Service")
- Search Input component
- Filter Button component
- Data Table component
- Status Badge component
- Action Menu component (More options)
- Pagination controls

## Fields
- **Search Input**: Free-text field to search services by attributes such as Name or Description.

## User Actions
- **View Services List**: Default view loading the paginated table of services.
- **Global Search & Filter**: Users can filter results via text search. Clicking the "Filter" button opens the advanced filter overlay (Reference: [`service_filter_ui_spec.md`](service_filter_ui_spec.md)).
- **Create Service**: Clicking the "Add New Service" button navigates the user to the Add New Service page. Reference: [`service_create_new_ui_spec.md`](service_create_new_ui_spec.md).
- **View Service Details**: Clicking directly on a service name (link) navigates the user to the detail view of that specific service. Reference: [`service_details_ui_spec.md`](service_details_ui_spec.md).
- **Row Actions**: Users can click the "Actions" menu (e.g., three dots icon) to access commands like Edit or Delete for that individual row.
- **Pagination Change**: Users can transition between pages of records or change the page size.

## Forms
There are no standalone submission forms on this page; search and filter controls directly mutate the table's state.

## Tables
**Services Table**
*Expected Columns:*
- **Name**: The primary identifier for the service (hyperlinked).
| Condition | Behavior |
| Service has no tags | Only the service name is displayed |
| Service has one tag | Show the tag next to the service name |
| Service has multiple tags | Show the first tag and a **"…" button** |

- **Alert Source**: The monitoring or event system that generated alerts leading to incidents for the service (example: email, Datadog).
- **Owner & Escalation Policy**: The specific team or user accountable for the service and escalation policies associated with the service (list of escalation policies where feasible).
- **Open Incidents (Last 30 Days)**: The total number of incidents created in the last 30 days that are still open (not resolved or closed) for the service. Shows the number of triggered and acknowledged incidents.
- **MTTA (Last 30 Days)**: The average time it takes to acknowledge and resolve incidents for the service in the last 30 days. Shows the average time to acknowledge and the average time to resolve incidents.
- **MTTR (Last 30 Days)**: The average time it takes to resolve incidents for the service in the last 30 days. Shows the average time to resolve incidents.
- **Status**: The operational state of the service (e.g., Active, Deprecated, Maintenance) formatted as a pill or badge.

**Row Action Buttons**
Contextual actions are available for each service row. These actions appear when the user hovers over a row in the Services table. The goal is to provide quick operational controls while keeping the table visually clean.
- **Visibility Behavior**
| Event | Behavior |
|------|----------|
| Mouse hover on row | Display action buttons |
| Mouse leave row | Hide action buttons |
| Keyboard focus | Buttons become visible for accessibility |

The action buttons appear **between the MTTA column and the Status column**.

- **Interaction Behavior**
| Action | Result |
|---|---|
| Click "Update Tags" | Opens the Add/Update Tags popover to modify service tags (Ref: [`service_update_tags_ui_spec.md`](service_update_tags_ui_spec.md)) |
| Click "Maintenance Mode" | Opens an overlay to configure maintenance status. (Ref: [`service_maintenance_ui_spec.md`](service_maintenance_ui_spec.md)) |
| Click "…" | Opens a popover showing all tags |
| Hover tag | Tooltip may show full tag value if truncated |

Clicking the **"…" button** opens a small popover displaying all service tags.

## Pagination / Filters
- **Pagination**: Includes display text (e.g., "1-10 of 100"), size selector, and directional arrows (Back / Next).
- **Search**: Includes a debounced search input field.
- **Filter Overlay**: Clicking the Filter button triggers an overlay to apply structured filtering. Reference: [`service_filter_ui_spec.md`](service_filter_ui_spec.md).

## Navigation
- Selecting a specific service directs the user to `/services/[service_id]`. Reference: [`service_details_ui_spec.md`](service_details_ui_spec.md).
- Triggering the primary action ("Add New Service") directs the user to `/services/new`. Reference: [`service_create_new_ui_spec.md`](service_create_new_ui_spec.md).
- Refer to the shared UI specifications for Sidebar and Top Navigation behaviors.

## Error / Empty States
- **Empty State**: Rendered when zero services are present in the system. Displays user-friendly text ("No services available") and an inline button to "Create your first Service".
- **No Results State**: Rendered when search queries or filters yield zero records. Displays "No matching services found" with an action to "Clear Search/Filters".
- **Loading State**: Rendered as a skeleton loader or a spinner superimposed on the table while fetching data.
- **Error State**: Rendered if the API call fails, showing an error banner (e.g., "Failed to load data. Please try again.") and an explicit "Retry" button.

## Guidelines
- Use clear and concise descriptions.
- Fields must align with API models when possible.
- Avoid describing backend business logic.
- Focus only on UI behavior and interactions.
- Ensure consistent component padding, typography, and interactive hover states adhering to the core design system.
