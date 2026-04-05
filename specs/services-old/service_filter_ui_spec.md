# Services Filter Overlay

## Purpose
To provide an advanced filtering interface allowing users to systematically refine the Services List based on specific criteria, focusing on the dynamic interaction when making selections.

## Layout
- **Container**: Displayed as an overlay, popover, or slide-out panel originating from the "Filter" button on the Services List screen.
- **Header**: Contains the title (e.g., "Filter by") and a "Clear All" or "Reset" button.
- **Body**: An aligned stack of filter criteria input fields (e.g., Service Owner, Status).
- **Footer**: Contains a primary "Apply" button and optionally a "Cancel" button.
- **Shared Reference**: Inherently linked to the Service List view. Reference: [`service_list_ui_spec.md`](service_list_ui_spec.md).

## Components
- Overlay/Popover Container
- Select / Dropdown Inputs
- Selection Badges/Pills (Interactive units showing chosen values)
- Label Text
- Action Buttons ("Apply", "Clear")

## Fields
- **Owner**: Dropdown to select one or multiple users/teams responsible for the service.
- **Tags**: Input to select or type specific service tags.

## User Actions
- **Open Overlay**: Triggered by clicking the "Filter" button on the Services List.
- **Initial State View**: Shows empty input fields with placeholder text (e.g., "Select owner", "Select status").
- **Select Owner (State Transition)**: 
  - Clicking the "Owner" dropdown pulls up a list of users/teams.
  - When a user selects an option (as shown in the transition to the second screenshot), the interface updates. This dynamically renders the selected item within the field as a removable badge/pill.
  - The dropdown list may collapse or stay open for multi-select, and the placeholder text is replaced by the selected value's visual representation.
- **Remove Selection**: The user can click an 'x' icon on the selection badge to remove that specific filter criteria.
- **Apply Filters**: Clicking "Apply" captures the selected parameters, closes the overlay, and triggers a data refresh on the main table.
- **Clear Filters**: Clicking "Clear" or "Reset" empties all populated fields back to the initial state.
- **Close Overlay**: Clicking outside the element or pressing 'Escape' dismisses the overlay without committing changes.

## Forms
- **Filter Form**: Transient form within the overlay used strictly to formulate query parameters.

## Tables
N/A

## Pagination / Filters
N/A - This document specifies the filter behavior natively.

## Navigation
N/A - The overlay is contextual and does not involve routing to a new URL.

## Error / Empty States
- **No Dropdown Data**: Shows a "No matches found" message if the dropdown options list is empty or fails to load.

## Guidelines
- Use clear and concise descriptions.
- Fields must align with API models when possible.
- Avoid describing backend business logic.
- Focus only on UI behavior and interactions.
- Provide clear visual feedback confirming state transitions (e.g., transforming a list selection into a removable badge).
