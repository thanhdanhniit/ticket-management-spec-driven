# Service Details Page

## Purpose
To provide a comprehensive, dedicated view of an individual service's operational status, key metrics, structured metadata, and historical incident analytics.

## Layout
- **Global Sidebar**: Shared sidebar for main application navigation. Reference: [`shared_global_sidebar_ui_spec.md`](../shared_global_sidebar_ui_spec.md).
- **Top Navigation Bar**: Shared header containing global actions. Reference: [`shared_top_navigation_bar_ui_spec.md`](../shared_top_navigation_bar_ui_spec.md).
- **Main Content Area**:
    - **Header Row**: Features the Service Name, optional sub-title/description, and an Action Bar aligned to the right.
    - **Metadata Row**: A horizontal grid immediately below the title containing logical blocks for identifying attributes (Status, Owner, Policy, next scheduled tasks).
    - **Metrics Summary**: Five horizontally-distributed statistical cards isolating current incident loads and resolution pacing.
    - **Tabbed Navigation**: A horizontal tab strip segregating deep-dive content (Summary, Automation, Dependencies, Custom Content Templates).
    - **Tab Content Container**: The main visual body displaying the selected tab's data.
- **Page Context**: Inherently accessed from the Services List. Reference: [`service_list_ui_spec.md`](service_list_ui_spec.md).

## Components
- Page Header / Titles
- Action Buttons (Primary, Secondary, Icon Menu)
- Label-Value Pair groupings (Metadata blocks)
- Statistic Cards (featuring primary integer and secondary percentage labels)
- Navigation Tabs component
- Button GroupToggle (Daily / Weekly)
- Stacked Bar Chart component

## Fields
**Metadata Header Row:**
- **Status**: Evaluated state with a colored indicator dot (e.g., orange "Needs Attention"), accompanied by an informational tooltip icon.
- **Owner**: Text hyperlink reflecting the user's name alongside their avatar (e.g., "Michael Nguyen").
- **Escalation Policy**: Hyperlinked text pointing to the service's designated policy.
- **Next Maintenance**: Text block displaying scheduled maintenance, defaulting to "N/A" if left unconfigured.
- **Extensions**: Text block detailing active integrations/extensions, defaulting to "N/A".

**Metrics Summary (Last 30 Days):**
- **Triggered**: Card showing the total count of triggered incidents and a percentage change/proportion.
- **Acknowledged**: Card showing the total count and percentage.
- **Resolved**: Card showing the total count and percentage.
- **MTTA (Last 30 Days)**: Displays Mean Time To Acknowledge in hours (e.g., "0.37 Hrs") alongside a percentage.
- **MTTR (Last 30 Days)**: Displays Mean Time To Resolve incidents in hours (e.g., "0.00 Hrs") alongside a percentage.

**Summary Tab:**
- **Chart Granularity Toggle**: Buttons configuring the chart aggregation to "Daily" or "Weekly".
- **Incident Chart**: A stacked bar chart plotting Dates (X-axis) against Incident Counts (Y-axis). Slices map to states: Triggered (Purple), Acknowledged (Yellow), Resolved (Green).

## User Actions
- **View Analytics**: Clicking the "View Analytics" secondary button routes the user to a detailed analytical dashboard.
- **View Incidents**: Clicking the "View Incidents" secondary button directs the user to the incident ledger pertaining to this specific service.
- **Add Alert Source**: Clicking the primary "Add Alert Source" button invokes a flow (modal or dedicated page) to integrate monitoring tools.
- **Access More Actions**: Clicking the vertical ellipsis (three dots) opens a dropdown menu harboring additional administrative commands.
- **Navigate via Metadata**: Clicking the hyperlinked Service Owner or Escalation Policy securely routes the user to their respective standalone detail pages.
- **Switch Tabs**: Clicking tab headers ("Summary", "Automation", "Dependencies", "Custom Content Templates") dynamically swaps the lower body content without full page reloads.
- **Toggle Chart View**: Toggling between "Daily" and "Weekly" updates the X-axis units mapping the underlying Incident Chart.
- **Tooltip Interaction**: Hovering over the Status info icon, or individual bars inside the Summary chart, triggers a tooltip providing discrete context.

## Forms
- Generally read-only; mutation forms (e.g., modifying alert sources) are gated behind explicit action buttons.

## Tables
- Implied within tabs not currently pictured (e.g., "Dependencies").

## Pagination / Filters
- The Summary tab leverages the "Daily / Weekly" toggle group which acts as an aggregation filter dictating the visual rendering of the chart.

## Navigation
- **URL Path**: Accessed via `/services/[service_id]`.
- **Inbound Reference**: Triggered hierarchically from the Services List.

## Error / Empty States
- **Entity Not Found (404)**: Render a comprehensive error page if the requested `service_id` has been purged or does not exist.
- **Empty Chart Data**: If the service has no recorded historical incidents for the 30-day window, the Summary tab chart should gracefully render a "No data available" placeholder illustration.
- **Loading State**: Render responsive skeleton loaders mapping to the distinct width and height of the 5 Metric Cards and the Summary Bar Chart during the initial API resolution phase.

## Guidelines
- Use clear and concise descriptions.
- Focus strictly on UI behavior and layout mechanics.
- Prioritize high-fidelity spacing: The 3 top right buttons and the 5 uniform metric cards should dynamically flex to accommodate varying screen resolutions.
