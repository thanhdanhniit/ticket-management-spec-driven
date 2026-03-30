# Service Maintenance Mode Overlay

## Purpose
To provide administrators and service owners an interface to quickly enable, disable, or schedule maintenance mode downtime for a specific service directly from the Services List view.

## Layout
- **Container**: Rendered as a modal, popover, or slide-out panel that overlays the current screen context upon clicking the Maintenance Mode row action.
- **Header**: Contains an identifying title (e.g., "Maintenance Mode Configure") and a close ('x') button to dismiss the view.
- **Body**: A constrained form area presenting a primary "Enable Maintenance" checkbox/toggle. When enabled, this area dynamically expands to reveal any existing maintenance windows and an "Add New Maintenance Window" label. Clicking this label acts as a trigger to reveal the embedded form controls (datetime pickers and dropdowns).
- **Footer**: Sticky bottom area containing the primary action button (e.g., "Save" or "Apply") and a secondary dismiss button (e.g., "Cancel").
- **Layout References**: Uses the standard overlay behavior atop the global application frame defined by [`shared_global_sidebar_ui_spec.md`](../shared_global_sidebar_ui_spec.md) and [`shared_top_navigation_bar_ui_spec.md`](../shared_top_navigation_bar_ui_spec.md).
- **Page Context**: Instantiated from the Services List page. Reference: [`service_list_ui_spec.md`](service_list_ui_spec.md).

## Components
- Overlay/Modal Container
- Checkbox / Toggle component
- Date Picker and Time Picker components
- Select / Dropdown component
- Text Link/Button ("Add New Maintenance Window")
- Icon Button (Delete / Trash)
- Action Buttons ("Save", "Cancel")

## Fields
- **Enable Maintenance Checkbox**: The primary control. When checked, it enables maintenance mode and reveals the detailed configuration fields below it.
- **Start Date & Time**: Input fields utilizing a calendar/clock picker to specify when the maintenance period begins.
- **End Date & Time**: Input fields utilizing a calendar/clock picker to define when the maintenance period concludes.
- **Repeats every**: A mandatory dropdown selection field specifying the recurrence pattern for the maintenance window. Valid options: `Never`, `Day`, `Week`, `Two Weeks`, `Three Weeks`, `One Month`.

## User Actions
- **Open Overlay (Initial State)**: Displays a minimal modal with just the "Enable Maintenance" checkbox. If the service is currently NOT in maintenance, the additional fields are hidden. If existing maintenance constraints already exist, it opens directly into the expanded state.
- **Enable Maintenance (State Transition)**: The user clicks the enable checkbox. The UI dynamically expands to load and display any existing maintenance configurations and reveals the "Add New Maintenance Window" action label.
- **Add New Maintenance Window**: The user clicks on the "Add New Maintenance Window" label. This action dynamically renders the "Maintenance Configuration Form" (Start Date, End Date, and Repeats Every controls) below it to define a new downtime schedule.
- **Remove Maintenance Window**: The user clicks the trash/delete icon displayed adjacent to a Maintenance Configuration Form. This action immediately removes that specific scheduling block from the screen display.
- **Schedule Maintenance & Recurrence**: The user configures future downtime via the Date/Time pickers and must select a recurrence frequency from the mandatory "Repeats every" dropdown.
- **Save Configuration**: Clicking the "Save" button sends the updated maintenance parameters to the server, closes the overlay, and updates the service's visual status indicator on the underlying list table.
- **Dismiss Overlay**: Clicking "Cancel", pressing 'Escape', or clicking the background backdrop discards all uncommitted inputs and closes the modal.

## Forms
- **Maintenance Configuration Form**: The structured inputs within the overlay used to determine the `maintenance` property of the service dataset.

## Tables
N/A

## Pagination / Filters
N/A

## Navigation
N/A - Contextual action; keeps the user located on the Services List.

## Error / Empty States
- **Validation Error (Time Range)**: If a user enters an End Date/Time that occurs *before* the Start Date/Time, display an inline error explicitly rejecting the invalid timeline.
- **Missing Required Data**: If mandatory fields such as end-time or the "Repeats every" dropdown are left blank, disable the "Save" button and/or show an inline requirement error.
- **API Error**: If the server rejects the save payload, display an error banner near the top of the overlay stating "Failed to update maintenance settings."

## Guidelines
- Use clear and concise descriptions.
- Focus explicitly on UI behavior and interactions.
- Avoid detailing backend scheduling cron-job logic.
- Validate date/time sequencing meticulously on the frontend to protect data integrity.
