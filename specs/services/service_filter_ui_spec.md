# Service Filter UI Specification

## Purpose
The Filter drawer provides an interface for users to refine the master list of services based on specific granular criteria, such as the designated Service Owner. This reduces visual noise and enables quicker navigation during incident triaging.

## Layout
The interface is presented as a Slide-out Drawer overlay, anchored to the right side of the screen extending over the parent Services List page.
- **Drawer Header**: Contains the structural "Filter" title and a dismissive close 'X' icon flush right.
- **Filter Content Area**: The main vertical scrollable block containing categorized filter groups (e.g., "Service Owner").
- **Drawer Footer**: Fixed at the bottom of the drawer, housing global actions (`Apply`, `Cancel`, `Clear all filters`).

## Shared Components
- **Global Sidebar**: For standard application navigation, refer to [shared_global_sidebar_ui_spec.md](../../specs/shared_global_sidebar_ui_spec.md).
- **Top Navigation Bar**: For global search and team context, refer to [shared_top_navigation_bar_ui_spec.md](../../specs/shared_top_navigation_bar_ui_spec.md).

## Components
- **Typography Title (H1)**: Displays the dominant drawer title ("Filter").
- **Filter Group Title**: Bold labels preceding discrete sections of related inputs (e.g., "Service Owner").
- **Icon Button**: Interactive icon-only elements (e.g., collapsing the drawer via 'X', or removing a chip).
- **Ghost/Link Button**: Text styled to resemble a hyperlink serving as an inline action trigger ("Clear" for a specific group, or "Clear all filters" globally).
- **Combobox Input**: A text input paired with a dropdown caret indicating an expandable/searchable list of selectable items.
- **List Group**: An expanded block displaying categorized selectable options (acting as a secondary popover relative to the combobox, e.g., showing a "YOU & YOUR SQUADS" grouping).
- **List Item**: Individual interactive list elements. These can contain rich formatting including primary text, secondary subtext, and user avatars.
- **Chip/Pill**: A segmented graphical component representing a successfully applied filter criterion, displaying the selected value text alongside an inline remove action ('x').
- **Primary Button**: The "Apply" action block used to commit the filter state.
- **Outline Button**: The secondary "Cancel" block.

## Fields
- **Service Owner**: A categorical filter criteria.
    - **Search Combobox**: Accepts literal text input to "Search for users or squads" and spawns the dropdown menu.

## User Actions
- **Dismiss Overlay**: Clicking the 'X' icon in the top right header to cancel and dismiss without applying changes.
- **Activate Combobox**: Clicking into the "Search for users or squads" field to invoke focus and reveal the attached dropdown list.
- **Search/Filter Options**: Typing text into the combobox input to filter the rendered rows within the attached list group dynamically.
- **Select Option**: Clicking an interactive user/squad list item (e.g., "Michael Nguyen (You)") from the dropdown. This action injects a visible active selection Chip beneath the input block.
- **Select All**: Clicking the "Select All" list command to bulk-activate all available owners.
- **Remove Single Criterion**: Clicking the 'x' close icon embedded on an active selection Chip to selectively unassign that entity from the filter.
- **Clear Category**: Clicking the textual "Clear" link aligned right of the group title ("Service Owner") to strip all active chips strictly within that category.
- **Clear All Filters**: Clicking the "Clear all filters" text button located in the footer to purge all filter configurations across the entire drawer.
- **Apply State**: Clicking the primary "Apply" button to transmit the accumulated chip configurations, update the parent Services table, and dismiss the drawer.
- **Cancel Modifications**: Clicking "Cancel" to revert any pending UI selections back to the last explicitly applied state and retract the drawer.

## Forms
**Filter Interface:**
Rather than a traditional data submission form, this acts as an interactive state container accumulating strings/IDs representing query targets. The primary interaction is not text entry (though search relies on it) but rather populating the interface with explicit `chip` representations parsed from the dropdown catalog.

## Tables
*No tabular data schema logic is present within the UI bounds of the drawer overlay.*

## Pagination / Filters
* This interface component itself serves as a structural filter parameter mechanism for the broader Service table view. Extended directories loaded into the combobox dropdown may employ virtualization or infinite scrolling to accommodate long lists.

## Navigation
* As an overlay, no true page-to-page navigation happens here. Structural navigation via 'Apply', 'Cancel', or standard close gestures resolves the drawer display state and resumes context on the Services list page.

## Error / Empty States
- **No Search Results (Inferred)**: If input text within the combobox string matches zero entries regarding active users or squads, the resulting dropdown panel should replace user rows with an empty state block reading "No results found".
