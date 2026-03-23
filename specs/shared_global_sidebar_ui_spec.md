# Global Sidebar

## Purpose
Provides global, persistent navigation to all main modules and configurations across the entire application.

## Layout
A vertical, collapsible and fixed-position panel located on the left side of the screen.
- **Top Section:** Displays the current overarching workspace or organizational context and the active user.
- **Middle Section (Scrollable):** Contains the primary navigation links to all sub-modules.
- **Bottom Section:** Displays application branding, versioning/copyright, and a toggle to collapse the sidebar.

## Components
- Navigation Links (with accompanying icons)
- Menu items
- Branding area
- Icons (User, Module-specific, Collapse arrows)

## Fields
- **Workspace Context:** Text indicating the overarching organizational account (e.g., "datumconsulting").
- **Current User Context:** Avatar/Icon and text indicating the active user (e.g., "Michael").
- **Navigation Items:**
  - Dashboard
  - Incidents
  - Escalation Policies
  - Services
  - Schedules
  - Runbooks
  - Postmortems
  - Analytics
  - Settings
- **Footer Text:** Branding ("Squadcast") and copyright year ("© Squadcast Inc. 2017-2026").
- **Collapse Toggle:** A button with arrows and the text "Collapse".

## User Actions
- Navigate to different modules by clicking the corresponding links.
- Identify the current organizational workspace and logged-in user context.
- Collapse the sidebar to increase the main content area width by clicking the "Collapse" toggle at the bottom.
- Hover over items to see full names if the sidebar is collapsed.

## Forms
- N/A

## Tables
- N/A

## Pagination / Filters
- N/A

## Navigation
- Clicking any active link navigates the primary content area to that respective module. Distinct active states (e.g., solid background color or border highlight) visually indicate the currently active route.

## Error / Empty States
- N/A
