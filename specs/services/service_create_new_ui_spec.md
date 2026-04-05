# Define Service Page

## Purpose
The Define Service page provides a form-based interface allowing users to create a new service and subsequently attach alert source integrations. It acts as the required configuration step to begin receiving incidents.

## Layout
The page is organized using a Sidebar Layout consisting of a primary Header, a central Content Area containing the form, and a Right Help Sidebar:
- **Header**: Contains the page title, a brief description
- **Content Area (Form)**: The main vertical flow containing input fields required for service definition.
- **Footer Toolbar**: Positioned at the bottom of the form section, anchoring the primary submission and cancellation actions.
- **Right Help Sidebar**: A static panel on the right side ("Help and Guide") offering contextual definitions and documentation links pertinent to the form's fields.

## Shared Components
- **Global Sidebar**: For standard navigation between application modules, refer to [shared_global_sidebar_ui_spec.md](../../specs/shared_global_sidebar_ui_spec.md).
- **Top Navigation Bar**: For global utility functions, team switching, and search, refer to [shared_top_navigation_bar_ui_spec.md](../../specs/shared_top_navigation_bar_ui_spec.md).

## Components
- **Typography Title (H1)**: Displays the large page title ("Define Service").
- **Typography Subtitle**: Provides instructional context below the title.
- **Readonly Input**: Displays disabled context information, such as the pre-selected "Team Name".
- **Text Input**: Standard single-line input field used for text entry (e.g., "Service Name").
- **Textarea**: Larger multi-line input field designed for extended explanatory text.
- **Select Dropdown**: Interactive dropdown menu opening a list of predefined selectable options (e.g., for Policies, Owners).
- **Dynamic List**: A composite structural block enabling users to add or remove identical rows of inputs (used for the Tags section).
- **Icon Button**: A minimalist button represented purely by an icon (e.g., the 'X' to remove a list row).
- **Ghost/Link Button**: Text styled to resemble a hyperlink acting as a local action trigger ("Add Tag").
- **Primary Button**: The visually prominent "Save" button driving the primary workflow.
- **Outline Button**: The visually subdued "Cancel" button.
- **Help Section**: A stylized sidebar block displaying FAQ-style headings paired with informational text and "Read More" links.

## Fields
- **Team Name**: (Readonly) Indicates the active team context under which the service is being generated (e.g., "Default Team").
- **Service Name**: (Required Text Input) The user-defined identifier for the new service.
- **Service Description**: (Textarea) An optional field allowing users to provide a detailed overview of the service's function.
- **Escalation Policy**: (Required Select) The routing policy assigned to receive incidents for this service.
- **Owner**: (Required Select) The individual user or team defined as the principal maintainer of the service.
- **Tags**: A repetitive key-value section used for operational metadata.
    - **Key**: (Select) The categorization label.
    - **Value**: (Select) The corresponding data assigned to the key.

## User Actions
- **Type Service Details**: Entering characters into the "Service Name" and "Service Description" text fields.
- **Select Policy/Owner**: Expanding dropdowns and picking values to satisfy the Escalation Policy and Owner requirements.
- **Add Tag**: Clicking the "Add Tag" link button to insert a new, empty Key-Value row into the Tags list.
- **Configure Tags**: Using the dropdown inputs within a tag row to specify classifications.
- **Remove Tag Row**: Clicking the specialized 'X' icon button on a given tag row to delete that specific key-value pair from the list.
- **Access Documentation**: Clicking "Read More" within the Help and Guide sidebar to open detailed documentation (likely in a new tab or slide-out drawer).
- **Submit Form**: Clicking the "Save" button to validate the form inputs and invoke API call to create the service.
- **Cancel Process**: Clicking "Cancel" to abandon all input and navigate back to the previous screen (e.g., the Services List).

## Forms
**Define Service Form:**
The central form orchestrates the collection of Service entity data. It enforces `required` validation logic specifically on the "Service Name", "Escalation Policy", and "Owner" fields while managing the state for the dynamic list of custom Tags.

## Tables
*No tabular data components are utilized on this specific view.*

## Pagination / Filters
*No list controls, pagination elements, or structural filters are present on this form view.*

## Navigation
- **Form Actions**: The form controls serve as localized navigation. "Cancel" retreats to the parent list context. "Save" validates state and save the service.
- *(Global and top-level navigation relies on the shared sidebar and header).*

## Error / Empty States
- **Validation Error (Inferred)**: Interacting with "Save" while required fields remain incomplete should prevent navigation. The interface should highlight the missing fields with an error boundary (e.g., red outline) and display localized help text (e.g., "This field is required").
- **Submission Error (Inferred)**: If the backend fails to process the valid form (e.g., network timeout, duplicate service name conflict), an alert bar or toast notification should emerge conveying the exact reason for failure.
