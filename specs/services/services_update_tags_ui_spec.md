# Add/Update Tags Modal Page

## Purpose
The Add/Update Tags modal provides an interface to manage operational metadata (tags) for a specific service. Users can add new tags, modify existing tag values, or remove tags to maintain accurate categorization, priority indexing, and incident routing context.

## Layout
The interface is structured as a Slide-out Drawer overlay, positioned on the right side of the screen over the parent Services list.
- **Modal Header**: Contains the modal title and a dismissive close 'X' icon.
- **Content Area (Tags Management Form)**: The core section featuring a list of key-value pair rows with column headers ("Key", "Value").
- **Footer Toolbar**: Positioned at the bottom, housing primary and secondary action buttons (`Update Tag(s)`, `Cancel`).

## Shared Components
- **Global Sidebar**: For standard navigation between application modules, refer to [shared_global_sidebar_ui_spec.md](../../specs/shared_global_sidebar_ui_spec.md).
- **Top Navigation Bar**: For global utility functions, team switching, and search, refer to [shared_top_navigation_bar_ui_spec.md](../../specs/shared_top_navigation_bar_ui_spec.md).

## Components
- **Typography Title (H1)**: Displays the modal title ("Add/Update Tags").
- **Header Row Typography**: Labels for the form columns ("Key", "Value").
- **Icon Button**: Interactive icons for specific utility actions (e.g., closing the modal, removing an individual tag row).
- **Select Dropdown**: Input menus allowing users to choose predefined values for tag keys and values (e.g., setting Key to `impact`).
- **Autocomplete Input**: An input field allowing free-text entry with inline suggestions (e.g., displaying `+ whole` as a suggestion while the user types `whole`).
- **Indicator/Dot**: A small colored visual dot (e.g., green) indicating the active status or validity of a selected tag pairing.
- **Ghost/Link Button**: Text styled as a link to append a new empty tag row ("Add Tag").
- **Primary Button**: The visually pronounced "Update Tag(s)" action button to persist changes.
- **Outline Button**: The secondary "Cancel" action button to discard changes and close the overlay.
- **Dynamic List Row**: A repeatable block representing a single tag entry (contains Key input, Value input, Indicator, Remove action).

## Fields
- **Key**: (Select / Input) Specifies the primary category or identifier for the tag (e.g., `prioirty`, `impact`).
- **Value**: (Select / Autocomplete Input) The specific data assigned to the tag key (e.g., `high`, `widespead`, `whole`).

## User Actions
- **Close Modal**: Clicking the 'X' icon in the top right to dismiss the drawer without saving.
- **Select Key/Value**: Using the dropdown menus to update existing tag properties.
- **Input Custom Value**: Typing into the autocomplete input field and optionally selecting the system-provided inline suggestion. If the value does not exist in the system, it will be added to the system as a new tag value.
- **Remove Tag**: Clicking the 'X' icon at the end of a specific tag row to delete it.
- **Add Tag**: Clicking "Add Tag" text link to spawn a new, empty tag configuration row.
- **Save Changes**: Clicking "Update Tag(s)" to submit the modified tag array to the backend and close the drawer. If the tag key or value does not exist in the system, it will be added to the system as a new tag key or value.
- **Cancel Process**: Clicking "Cancel" to dismiss the drawer without persisting any state modifications.

## Forms
**Tags Management Form:**
The form manages the state of an array of tag objects. It supports dynamic row addition and removal. The interface handles varying input types per field, transitioning between simple select dropdowns and autocomplete text inputs depending on user input context.

## Tables
*No standard data tables are present; tags utilize a tabular grid layout.*

## Pagination / Filters
*No pagination elements or structural filters are present in this modal.*

## Navigation
* The slide-out drawer functions as an overlay to the current context. All terminal form actions (Save, Cancel, Close) collapse the drawer and return user interaction focus to the underlying parent page (e.g., Services List).

## Error / Empty States
- **Validation Error (Inferred)**: Leaving a Key or Value blank in an active row during submission may highlight the row and display an inline warning. Duplicate keys may also trigger an error boundary preventing submission.
- **Backend Error (Inferred)**: Payload submission failures will trigger a global toast notification detailing the failure reason.
- **Empty List State (Inferred)**: If a service is stripped of all tags, the form should initialize a single empty row or display a placeholder block encouraging the user to "Add Tag".
