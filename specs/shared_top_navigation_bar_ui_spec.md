# Top Navigation Bar

## Purpose
Provides an overarching, persistent header area that handles global context switching, search, system-wide notifications, account status, and user profile management.

## Layout
A horizontal, fixed-position bar located at the top of the screen, extending from the right edge of the Global Sidebar to the right edge of the browser window.
- **Left Section:** Team context switcher.
- **Center Section:** Global search functionality and system-wide action banners.
- **Right Section:** Account status, quick actions, on-call status, and user profile.

## Components
- Dropdown selector (Team)
- Search Input/Icon
- Notification/Alert Banner
- Badges / Status Indicators
- Quick Action Icons
- Profile Avatar

## Fields
- **Team Selector:** Dropdown to switch the current active team context (e.g., "Default Team").
- **Search:** A magnifying glass icon/input for unified global search across the platform.
- **System Notification Banner:** Full width distinct banner (e.g., blue) prompting for important account actions (e.g., "Verify your Phone Number to enable Phone and SMS notifications") with a close (X) icon.
- **Help/Support Action:** A question mark icon. When clicked, it opens a dropdown menu containing links to:
  - API Docs
  - Support Docs
  - Take a Product Tour
  - FAQ
  - Contact Us
- **On Call Status:** Text indicating the user's current page duty status (e.g., "On Call: None").
- **User Profile Avatar:** A circular badge containing the user's initials (e.g., "MN"), which may display a red notification dot. Clicking it opens a dropdown menu containing:
  - User and Workspace details header (Name, Workspace, and Role, e.g., "Michael Nguyen", "carolynne", "account owner").
  - "Profile" navigation link.
  - Contextual action links (e.g., "Verify Phone Number" highlighted in red).
  - "Logout" action.

## User Actions
- Change the currently active Team to filter all subsequent dashboard data by that team's scope.
- Perform a platform-wide search for incidents, services, users, etc.
- Dismiss system notifications (if dismissible).
- Click the Help/Support icon to access various support resources (API docs, support docs, tour, FAQ, contact).
- Check current on-call status.
- Access user details, navigate to the internal Profile page, resolve contextual account alerts, or log out via the Profile Avatar dropdown menu.

## Forms
- The Team selector acts as a standalone input altering global state.
- The global search functions as a form input, often triggering a dropdown or modal.

## Tables
- N/A

## Pagination / Filters
- The Team selector inherently acts as a global, top-level data filter for all views beneath it.

## Navigation
- The elements in this bar primarily trigger modals, dropdowns, or overarching context changes rather than standard page navigation, except for clicking the profile settings.

## Error / Empty States
- N/A
