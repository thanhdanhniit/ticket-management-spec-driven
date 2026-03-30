# Service Update Tags Overlay

## Purpose
To allow users to modify (add or remove) tags for a specific service directly from the Services List view through a quick, contextual overlay, ensuring efficient metadata management.

## Layout
- **Container**: Displayed as a popover or compact modal overlaid near the specific service row where the action was triggered.
- **Header**: Contains a brief title (e.g., "Update Tags") and a close ('x') control.
- **Body**: 
  - An input field for typing or searching new tags.
  - An area displaying currently applied tags formatted as interactive pills/badges.
- **Footer**: Potentially contains action buttons (e.g., "Save", "Cancel") if auto-save is not the paradigm.
- **Layout References**: Adheres to the overall layout provided by the Global Sidebar and Top Navigation Bar. Refer to [`shared_global_sidebar_ui_spec.md`](../shared_global_sidebar_ui_spec.md) and [`shared_top_navigation_bar_ui_spec.md`](../shared_top_navigation_bar_ui_spec.md).
- **Page Context**: Activated directly from the Service List. Reference: [`service_list_ui_spec.md`](service_list_ui_spec.md).

## Components
- Popover/Modal Container
- Text Input component (with autocomplete/suggestion flyout)
- Tag Badges component (incorporating a definitive remove icon)
- Action Buttons ("Save", "Cancel")

## Fields
- **Tag Search/Input**: A text input field designed to accept string values for tags. May provide type-ahead auto-suggestions based on existing tags used in the system.

## User Actions
- **Open Overlay**: Triggered by the user hovering over a service row and clicking the resulting "Update Tags" icon/button.
- **Add Tag**: 
  - The user types text into the input field. 
  - Pressing 'Enter', comma, or selecting from suggested autocomplete results converts the text into a tag badge situated above or below the input field.
- **Remove Tag**: The user can delete an already applied tag by clicking the small 'x' (close) icon on its badge.
- **Save Changes**: Clicking the "Save" (or Apply) button commits the updated tag array to the service and successfully closes the overlay.
- **Dismiss Overlay**: Clicking "Cancel", pressing 'Escape', or clicking outside the popover dismisses the overlay without committing the most recent un-saved changes.

## Forms
- **Tag Management Form**: A highly focused, transient form managing the `tags` array for the target service without requiring a full page redirection.

## Tables
N/A

## Pagination / Filters
N/A

## Navigation
- This is a contextual overlay that keeps the user anchored to their current position safely in the Services List view.

## Error / Empty States
- **API Error on Save**: If the tag update fails upon saving, an inline error message (e.g., "Failed to update tags. Please try again.") should appear near the save button.
- **Validation Error**: Restrict invalid characters from being added as tags by rendering an inline hint if an unsupported character is typed.

## Guidelines
- Use clear and concise descriptions.
- Focus strictly on UI behavior and interactions.
- Provide strong visual feedback during the tag addition state transition (e.g., text converts visibly to a styled pill).
