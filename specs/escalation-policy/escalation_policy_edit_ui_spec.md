# Escalation Policy Edit Overlay

## Purpose
To provide administrators a frictionless, centered modal form over the main list view to modify the foundational attributes and procedural routing steps of an existing escalation policy.

## Layout
- **Container**: Rendered as a centered modal overlay superimposed on top of the "Escalation Policies List" page.
- **Header**: Features the modal title (e.g., "Edit Escalation Policy") and an 'x' icon to dismiss.
- **Body**: 
   - A scrolling form container divided into logical sections.
   - Top Section: Basic metadata inputs (Name, Description), pre-filled with existing policy data.
   - Rules/Steps Section: A dynamic list of escalating sequence blocks. Focus is placed on configuration (e.g., "Wait for X minutes, then escalate to Y").
- **Footer**: A fixed base containing the primary "Save" button horizontally aligned with a "Cancel" dismiss button.
- **Page Context**: Rendered centrally over the list view. Reference: [`escalation_policy_list_ui_spec.md`](escalation_policy_list_ui_spec.md).

## Components
- Centered Modal Dialog Component
- Text Input and Text Area Components
- Dynamic List / Repeater Component (for Escalation Steps)
- Dropdown/Select Components (Assignees)
- Number Input / Dropdown (Timeout natively configured)
- Icon Buttons (Delete/Add Step)
- Action Buttons ("Save", "Cancel")

## Fields
- **Name**: Required standard string input cleanly configured to capture the policy name.
- **Description**: Optional multi-line text input for policy details.
- **Escalation Rules / Steps**:
  - **Wait Time**: A numerical dropdown or input dictating the delay (in minutes) before escalating to the specified target.
  - **Target/Assignee**: A searchable dropdown for assigning a specific User or Team.

## User Actions
- **Open Modal**: Triggered uniquely via the "Edit" command situated inside the list view's Row Action menu.
- **Edit Basic Info**: User interactively modifies the standard Name and Description text.
- **Modify Wait Times**: User configures the time selection fields determining the timeout bounds (e.g., 15 mins to 30 mins).
- **Assign Targets**: The user interacts with the Assignee dropdown, searching for and selecting a User or Team to inherit the escalation block.
- **Add Step**: User visually clicks the "Add Escalation Step" button embedding a new row chronologically into the routing array.
- **Remove Step**: User clicks the trash/delete icon physically mapped beside an escalation step block purging it securely.
- **Save Policy**: Clicking the primary "Save" button submits the updated payload cleanly mutating the database and closing the overlay directly.
- **Cancel Modification**: The user securely clicks "Cancel", clicks outside the bounded modal, or naturally triggers the 'Escape' key entirely aborting un-committed mutations securely.

## Forms
- **Edit Escalation Policy Form**: Deeply contextual, encompassing structured arrays of nested Escalation Steps requiring granular validation physically securely precisely.

## Error / Empty States
- **Validation Errors**: Completely blocking submission structurally by explicitly highlighting empty required fields (e.g., a "Target" dropdown left blank inside an added step).
- **Minimum Step Constraint**: Informing the user if they attempt to logically delete all steps. An escalation policy must have at least one defined routing step.

## Guidelines
- Highlight interactive visual nesting for added rules dynamically to clearly show sequential flow.
