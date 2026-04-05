# Escalation Policies

## Purpose
To display a list of all escalation policies within the system. It allows users to view policy details (including escalation steps and repeat configurations), search for specific policies, and initiate the creation of new escalation policies.

## Layout
- **Global Sidebar**: Shared sidebar for main application navigation.
- **Top Navigation Bar**: Shared header encompassing global actions (e.g., team selection, global search, profile).
- **Main Content Area**:
    - **Header Section**: Features the page title ("Escalation Policies") with a total count, a filter icon, a search bar, and a primary action button ("Add Escalation Policy").
    - **Informational Text**: A short description explaining escalation policies with a "Learn more" link.
    - **Policy Cards List**: A vertical list of complex cards, where each card represents a specific escalation policy and details its escalation steps inline.

## Components
- Page Title Header (with total count)
- Filter Button component (funnel icon)
- Search Input component (with magnifying glass icon)
- Primary Action Button ("Add Escalation Policy")
- Informational Text paragraph with an inline documentation link
- Escalation Policy Card component:
    - **Card Header**: Displays the Policy Name, tags/badges for Associated Services, tags/badges for Assigned Users/Owners, and an Action Menu (three horizontal dots).
    - **Card Subheader**: Displays the Policy Description.
    - **Escalation Steps List (Inner List)**: Rows detailing each escalation step (e.g., "Escalate after 10 minutes", an assigned user/team tag, and a "Personal Notification Rules" indicator box).
    - **Card Footer**: Displays the repeat rule configuration text (e.g., "If no one acknowledges, repeat this policy an additional X time(s) after Y min(s)").

## Fields
- **Search Input**: A text input placeholder "Search escalation policy by name or service".

## User Actions
- **View Policies**: Scroll through the list of escalation policy cards to see configurations, steps, and assignments at a glance.
- **Search Policies**: Enter text in the search bar to filter the displayed policies by name or service.
- **Filter Policies**: Click the filter icon next to the search bar to potentially apply advanced filtering criteria.
- **Add Escalation Policy**: Click the primary "Add Escalation Policy" button to navigate to the creation flow.
- **Manage Policy**: Click the three-dot action menu on a specific policy card to access contextual actions like Edit or Delete for that specific policy.
- **Learn More**: Click the inline link in the informational text to view documentation.

## Forms
- No inline forms are present on this primary read-only list view.

## Tables
- There are no traditional data tables on this page. The data is presented using a Card-based list layout to accommodate the complex hierarchical data (where an escalation policy contains multiple escalation steps).

## Pagination / Filters
- **Filters**: Text-based filtering via the Search bar. A dedicated filter icon button is also visible.
- **Pagination**: While not explicitly visible with only 2 items, standard pagination or infinite scroll should be implemented for larger sets of policies.

## Navigation
- **Inbound Context**: Accessible via the "Escalation Policies" link in the Global Sidebar navigation.
- **Outbound (Creation)**: Clicking "Add Escalation Policy" navigates to the policy creation interface.
- **Outbound (Documentation)**: Clicking the "Learn more" link navigates to external or internal documentation regarding escalation policies.

## Error / Empty States
- **Empty List State**: If no escalation policies exist, an empty state illustration with a message should encourage the user to create their first policy.
- **No Search Results**: If the search query yields no matches, a message such as "No escalation policies found matching criteria" should be displayed.
- **API Fetch Failure**: If the network request fails, an inline toast or banner should communicate the error and offer a retry action.

## Guidelines
- Use clear and concise descriptions.
- The UI MUST use the hierarchical card-based layout to accurately represent the nested escalation steps clearly, completely abandoning standard flat data tables for this view.
- Ensure the Action Menu (three dots) is easily accessible on each card.
- Component spacing and visual hierarchy should clearly delineate the separation between different escalation steps within the same policy card.
