# Users List (Settings)

## Purpose
To provide administrators with an interface to view, search, and manage organizational users, their contact details, and their designated roles within the platform.

## Layout
The screen follows a sophisticated nested layout for configuration sections:
- **Global Sidebar (Left):** See [shared_global_sidebar_ui_spec.md](../shared_global_sidebar_ui_spec.md). (On this screen, "Settings" is the active global module).
- **Top Navigation Bar:** See [shared_top_navigation_bar_ui_spec.md](../shared_top_navigation_bar_ui_spec.md). (Note: The Team Selector is absent on this screen as settings apply at the organization level).
- **Secondary Settings Sidebar (Inner Left):** See [shared_settings_sidebar_ui_spec.md](./shared_settings_sidebar_ui_spec.md) for the internal configuration navigation menu.
- **Main Content Area (Right):**
  - **Page Header:** Features the primary title "Users" with a dynamic count suffix (e.g., "(1)"), followed by instructional subtext and a documentation link.
  - **Action Bar:** Right-aligned controls for filtering, searching, and adding new users.
  - **Data Table:** A grid listing all registered users with their details and inline actions.

## Components
- **Global Components:** Sidebar and Top Nav (see shared specs).
- **Inner Navigation Sub-menu:** See shared specs for the Settings Sidebar component.
- **Dropdowns / Selectors:** "Filter User" dropdown.
- **Text Inputs:** "Search users" search bar featuring a keyboard shortcut visual hint (`/`).
- **Buttons (Primary):** "Add Users" (Solid blue).
- **Buttons (Secondary):** "View Profile" (Outlined).
- **Icons Elements:** ID card icon indicating workspace/context under user names, Alert icon in the notification banner.
- **Status Badges:** Text blocks with colored backgrounds/icons to indicate states (e.g., "Verification pending" highlighted in yellow/red).

## Fields
These fields map to the column headers and data visible in the main Data Table:
- **Name:** Displays the user's full name, a suffix identifying the current logged-in user (e.g., "- you"), and secondary contextual text/icon (e.g., workspace "carolynne").
- **Email:** The user's registered email address.
- **Phone:** The user's phone number, paired with a verification status badge (e.g., "Verification pending") if necessary.
- **Organization role:** The user's assigned role within the shared workspace (e.g., "Account Owner").
- **Actions (Implicit column):** Contains the "View Profile" button for each user row.

## User Actions
- **Global Actions:** See shared specs for sidebar navigation, global search, profile interaction, and help menus.
- **Secondary Navigation:** See shared specs for navigating between settings sub-pages via the inner left sidebar.
- **Filter Users:** Use the "Filter User" dropdown to refine the visible list by predefined criteria (e.g., role, status).
- **Search Users:** Click or use the `/` hotkey to type in the "Search users" input to instantly filter the list by name, email, or phone.
- **Add Users:** Click the primary "Add Users" button to launch the user invitation/creation flow.
- **Row-Level Actions:** Click the "View Profile" button on a specific user row to view or edit their full profile details.
- **Access Documentation:** Click the "Learn more about users here." link to open external or internal help guides.

## Forms
- No active data entry forms on this main read-only view. Input fields act immediately as local filters. 

## Tables
- **Users Data Table:** A straightforward grid prioritizing user identity, contact points, authorization levels, and management actions via rows.

## Pagination / Filters
- **Filters:** Driven by the dedicated "Filter User" dropdown and the "Search users" input.
- **Pagination:** None explicitly shown in this view due to limited item count, but standard list controls would be expected at the bottom as the data set expands.

## Navigation
- Employs a dual-sidebar navigation structure. The outer sidebar handles global application context, while the inner sidebar handles localized routing within the "Settings" module (see [shared_settings_sidebar_ui_spec.md](./shared_settings_sidebar_ui_spec.md)).

## Error / Empty States
- **Incomplete States:** Warns administrators of incomplete user registrations directly via inline badges, like the orange/red "Verification pending" alert underneath unverified phone numbers.
