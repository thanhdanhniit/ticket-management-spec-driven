# Add New Service Page

## Purpose
To provide administrators and system managers a dedicated interface to create and configure a new service entity within the application.

## Layout
- **Global Sidebar**: Standard global sidebar on the left for main application navigation. Reference: [`shared_global_sidebar_ui_spec.md`](../shared_global_sidebar_ui_spec.md).
- **Top Navigation Bar**: Standard top header covering global actions. Reference: [`shared_top_navigation_bar_ui_spec.md`](../shared_top_navigation_bar_ui_spec.md).
- **Main Content Area**:
    - **Page Header**: Displays the page title "Add New Service" and potentially breadcrumbs.
    - **Form Container**: A structured block or card layout containing the inputs necessary to create the service.
    - **Form Footer**: Horizontal layout housing the primary "Save" or "Create Service" button, alongside a "Cancel" button.
- **Page Context**: Navigated to from the Service List. Reference: [`service_list_ui_spec.md`](service_list_ui_spec.md).

## Components
- Page Header / Title
- Standard Text Inputs
- Searchable Dropdown / Autocomplete Input components (for relational data like Owner and Escalation Policy)
- Primary and Secondary Action Buttons

## Fields
- **Name**: Mandatory text input field for the service's primary identifier.
- **Description**: Optional text area field for elaboration on the service's purpose.
- **Escalation Policy**: A mandatory searchable dropdown constraint. As the user types into the input, it dynamically filters and displays matched policies in a list below (e.g., "Example Escalation Policy", "Payment Escalate Policy"). 
- **Owner**: A mandatory searchable dropdown constraint. Typing in the input filters and locates matched owner identities (users or teams). Displays relevant metadata in the dropdown (e.g., Avatar, User Full Name like "Michael Nguyen", and secondary identifier).
- **Tags**: Optional multi-select attribute field.

## User Actions
- **Input Text Attributes**: User focuses and types into the Name and Description fields.
- **Search & Select Escalation Policy**: 
  - User clicks the input to open the dropdown and types a query.
  - User selects a matched policy from the flyout menu by clicking it. The flyout collapses, and the selected policy string populates the input.
- **Search & Select Owner**: 
  - User clicks the input and types a query (e.g., "Michael").
  - The UI updates to show matching users. The user clicks the targeted user block, collapsing the menu and populating the selection.
- **Submit Form**: Clicking the primary action button authenticates required fields and sends the data payload to the server.
- **Cancel**: Clicking the "Cancel" button discards the in-progress form and routes the user back to the Service List view.

## Forms
- **Add Service Form**: A comprehensive validation-wrapped structural form determining the creation payload for the `/services` API endpoint.

## Tables
N/A

## Pagination / Filters
N/A

## Navigation
- **From Service List**: Triggered by the "Add New Service" button on the Services List.
- **On Submit Success**: Redirects the user sequentially either to the newly created `Service Details` page or back to the `Services List`.
- **On Cancel**: Re-routes via history back to the `Services List`.

## Error / Empty States
- **Validation Blocks**: Providing no input to mandatory fields (marked usually by a red asterisk `*` like Escalation Policy and Owner) will flag the fields in red with an inline error message (e.g., "This field is required") upon submission or blur.
- **Empty Search Matches**: If a typed search within the Escalation Policy or Owner dropdowns yields no results, render a discrete inline label specifying "No matches found." inside the dropdown box.
- **API Error Warning**: If the submit action fails due to network or server issues, present a dismissible error toast or banner informing the user of the failure so they don't lose typed data.

## Guidelines
- Use clear and concise descriptions.
- Focus exclusively on UI behavior and interactions.
- Provide real-time autocomplete debounce logic and feedback as the user types in the searchable dropdowns.
