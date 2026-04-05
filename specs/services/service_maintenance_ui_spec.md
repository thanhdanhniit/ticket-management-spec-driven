# Maintenance Mode UI Specification

## Purpose
The Maintenance Mode drawer allows users to schedule or immediately enable maintenance periods for specific services. Activating maintenance mode temporarily suppresses or alters alert notifications mapped to the selected services, reducing operational noise during planned downtime, deployments, or system upgrades.

## Layout
The interface is structured as a Slide-out Drawer overlay, anchored to the right side of the screen over the parent Services list page.
- **Modal Header**: Contains the "Maintenance Mode" structural title and a dismissive close 'X' icon explicitly placed top-right.
- **Context Area (Selections)**: A dedicated top band displaying the currently selected service(s) affected by the active context.
- **Toggle Section**: A horizontal row featuring the master on/off switch to activate/deactivate the maintenance rules.
- **Dynamic Content Container**: A state-driven central area. It renders either an empty state placeholder illustration (when maintenance is toggled off) or an interactive scheduling form (when enabled).
- **Footer Toolbar**: Positioned at the absolute bottom, housing the primary "Save" and secondary "Cancel" actions.

## Shared Components
- **Global Sidebar**: For standard navigation between application modules, refer to [shared_global_sidebar_ui_spec.md](../../specs/shared_global_sidebar_ui_spec.md).
- **Top Navigation Bar**: For global utility functions, team switching, and search, refer to [shared_top_navigation_bar_ui_spec.md](../../specs/shared_top_navigation_bar_ui_spec.md).

## Components
- **Typography Title (H1)**: Displays the modal title ("Maintenance Mode").
- **Typography Label**: Bold textual elements used for labeling primary states (e.g., "Service(s) Selected:").
- **Tag/Badge**: A bordered pill element visually highlighting the selected target service name representing the system context (e.g., "PAYMENT SERVICE").
- **Switch/Toggle**: A binary interactive control indicating active (blue) or inactive (gray) status.
- **Placeholder Illustration**: An empty state graphic containing a central thematic icon and explanatory subtext indicating no active rules.
- **Form Card**: A bordered visual container ("New Maintenance Schedule") used to group related time-bound inputs. Multiple cards can coexist.
- **Date Picker**: Formatted text input that invokes a standard calendar overlay for date selection.
- **Select Dropdown**: Input menus for constrained variables like specific time blocks or logical recurrence intervals.
- **Icon Button (Danger)**: A red-tinted trash/delete icon acting as a destructive action to remove its enclosing schedule block.
- **Ghost/Link Button**: Text styled to resemble an interactive hyperlink serving as an inline constructive action ("Add New Maintenance Window").
- **Primary Button**: The "Save" action block to persist changes across the entity.
- **Outline Button**: The secondary "Cancel" action block to safely discard context.

## Fields
When Maintenance is **Toggled On**:
- **Start Date**: (Required | Date Picker) Specifies the calendar date the maintenance begins.
- **Start Time**: (Required | Select Dropdown) Specifies the specific starting interval block.
- **End Date**: (Optional | Date Picker) Specifies the calendar date the maintenance concludes.
- **End Time**: (Optional | Select Dropdown) Specifies the concluding interval block.
- **Repeats every**: (Required | Select Dropdown) Determines the rule's recurrence logic. Evaluates to "Never" by default.

## User Actions
- **Close Modal**: Clicking the 'X' icon in the top right header to dismiss the drawer without applying pending changes.
- **Toggle Status**: Clicking the "Enable maintenance for service(s)" switch to toggle the primary view between the placeholder graphic (disabled) and the configuration form boundaries (enabled).
- **Input Dates & Times**: Interacting with "Start/End Date" calendar pickers or "Start/End Time" select dropdowns to frame the precise bounds of the maintenance window.
- **Specify Recurrence**: Utilizing the "Repeats every" dropdown to establish ongoing, recurring maintenance loops.
- **Remove Schedule Card**: Clicking the structural red trash icon embedded within a form card to delete that specific maintenance schedule definition.
- **Add Schedule Window**: Clicking the "Add New Maintenance Window" constructive link to spawn an additional empty "New Maintenance Schedule" form card appended below existing active ones.
- **Save State**: Clicking the "Save" button to validate and transmit structural configurations to the backend entity before closing the drawer.
- **Cancel Flow**: Clicking "Cancel" to revert all unsaved manipulation and retract the side-drawer overlay.

## Forms
**Maintenance Schedule Form:**
The form logic is highly event-driven via the primary boolean toggle switch. It accommodates a one-to-many relationship where users can append multiple unique schedule constraints block (cards) within a primary save payload.

## Tables
*No standard data tables or tabular grid logics reside within this view.*

## Pagination / Filters
*No pagination elements or structural table filters exist on this modal surface.*

## Navigation
* As an overlay mechanism, this view lacks independent navigation loops. Structural navigation via 'Save', 'Cancel', or standard close gestures resolves the drawer display state and resumes prior interaction depth traversing the Services List view.

## Error / Empty States
- **Disabled State (Default Empty State)**: When the toggle rests internally as deactivated, the primary form area transforms into an empty state placeholder communicating that no current configurations apply to the indicated service(s).
- **Validation Errors (Inferred)**: If a user actuates "Save" while explicit required fields (Start Date, Start Time, Repeats every) remain indeterminate, focus should apply visual error boundaries highlighting the missing constraints. Secondary validation should prevent logical mismatches such as End Time preceding Start Time within a single instance.
- **Submission Error (Inferred)**: Network submission failure should trigger a global toast overlay detailing explicit payload flaws or backend connectivity interruptions.
