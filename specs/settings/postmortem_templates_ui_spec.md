# Postmortem Templates (Settings)

## Purpose
Allows administrators to view, manage, edit, and create structured documentation templates used consistently across the organization during incident postmortem reviews.

## Layout
The screen adheres to the standard nested settings layout:
- **Global Sidebar (Left, Collapsed):** See [shared_global_sidebar_ui_spec.md](../shared_global_sidebar_ui_spec.md). Displays only icons.
- **Top Navigation Bar:** See [shared_top_navigation_bar_ui_spec.md](../shared_top_navigation_bar_ui_spec.md). Contains general search, notification banners, and profile interactions.
- **Secondary Settings Sidebar (Inner Left):** See [shared_settings_sidebar_ui_spec.md](./shared_settings_sidebar_ui_spec.md). The "Postmortem Templates" link is actively highlighted within the navigation group.
- **Main Content Area (Right):**
  - **Page Header:** Features the title "Postmortem Templates" appended with a dynamic, parenthesis-wrapped total count (e.g., "(6)"). Beneath it is an instructional subtext validating the page's purpose.
  - **Action Button:** A top-right aligned "Add New Template" button parallel to the title.
  - **Template List Container:** A vertically stacked list of bordered rows representing each individual template.

## Components
- **Global Components:** See shared specs for the global sidebar, top nav, and settings sidebar.
- **Header Elements:** Page Title with count, descriptive instructional subtext.
- **Buttons (Secondary / Outline):** "Add New Template".
- **List Rows:** Individually identifiable horizontal blocks containing text and right-aligned action icon groups.
- **Badges / Text Labels:** A plain text indicator reading "Default template".
- **Action Icons:** 
  - Pencil icon (Edit action).
  - Red trash can icon (Delete action).

## Fields
Data displayed within the main list container:
- **Template Name:** The full string literal title of the postmortem template (e.g., "Microsoft Azure status history").
- **Default Indicator:** Text displayed only on the single organizational default template.

## User Actions
- **Navigate Settings:** Deep link to other administrative tasks using the inner left sidebar.
- **Initiate Creation:** Click the "Add New Template" button to open the interface for building a new structure.
- **Identify Default:** Visually scan the list to verify which document is currently tagged as the "Default template".
- **Modify Template:** Click the Pencil (Edit) icon on any specific row to alter its contents or title.
- **Delete Template:** Click the red Trash can (Delete) icon to permanently remove that specific template from the organization's library.

## Forms
- This is purely a read-only list view. Actions like creating or editing will route the user to separate form interfaces or modals not pictured here.

## Tables
- **Template List:** Rather than a grid-style data table with defined column headers, this is structured as an interactive, bordered list/stack of rows prioritized for high readability and discrete row-level actions.

## Pagination / Filters
- **Filters/Search:** None exist actively on this specific page view.
- **Pagination:** None displayed. It is assumed the list either scrolls infinitely or pagination appears only when the count exceeds a certain threshold (currently at 6).

## Navigation
- Employs the standard dual-sidebar routing architecture detailed in the shared configurations. Adding or editing templates will trigger internal navigation to the respective builder interfaces.

## Error / Empty States
- None currently displayed in the screenshot. An empty state would likely replace the list view entirely with an illustration and a prominent CTA urging the user to "Add New Template".
