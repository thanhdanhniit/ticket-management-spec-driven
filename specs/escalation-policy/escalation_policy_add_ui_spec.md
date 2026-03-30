# Escalation Policy Add Overlay

## Purpose
To provide administrators a frictionless, centered modal form over the main list view to construct and deploy entirely new escalation policies from scratch.

## Layout
- **Container**: Rendered comprehensively as a centered modal overlay superimposed on top of the "Escalation Policies List" page.
- **Header**: Features the modal title (e.g., "Add Escalation Policy") and an 'x' close icon to dismiss the view.
- **Body**: 
   - A scrolling form container divided into logical sections.
   - Top Section: Basic metadata inputs (Name, Description), initially blank.
   - Rules/Steps Section: A uniquely dynamic list containing one empty initial escalation sequence block (e.g., "Wait for X minutes, then escalate to Y").
- **Footer**: A fixed base containing the primary "Create" button horizontally aligned with a secondary "Cancel" dismiss button.
- **Page Context**: Rendered centrally explicitly over the active list view. Reference: [`escalation_policy_list_ui_spec.md`](escalation_policy_list_ui_spec.md).

## Components
- Centered Modal Dialog Component
- Text Input and Text Area Components
- Dynamic List / Repeater Component (for Escalation Steps)
- Dropdown/Select Components (Assignees)
- Number Input / Dropdown (Timeout natively configured)
- Action Buttons ("Create", "Cancel")

## Fields
- **Name**: Required standard string input cleanly configured to capture the policy name.
- **Description**: Optional multi-line text input for policy details.
- **Escalation Rules / Steps**:
  - **Wait Time**: A numerical dropdown or input dictating the delay (in minutes) before escalating to the specified target.
  - **Target/Assignee**: A searchable dropdown for assigning a specific User or Team.

## User Actions
- **Open Modal**: Triggered uniquely via the "New Escalation Policy" button on the main list view.
- **Edit Basic Info**: User interactively modifies the standard Name and Description text.
- **Modify Wait Times**: User configures the time selection fields determining the timeout bounds (e.g., 15 mins).
- **Assign Targets**: The user interacts with the Assignee dropdown, searching for and selecting a User or Team to inherit the escalation block.
- **Add Step**: User visually clicks the "Add Escalation Step" button embedding a new row into the routing array.
- **Remove Step**: User clicks the trash/delete icon mapped beside an escalation step block purging it.
- **Save Policy**: Clicking the primary "Create" button submits the payload cleanly mutating the database and closing the overlay directly.
- **Cancel Modification**: The user clicks "Cancel" or clicks outside the modal entirely aborting the creation seamlessly.

## Error / Empty States
- **Validation Errors**: Completely blocking submission securely structurally explicitly highlighting empty required structural fields (e.g., a "Target" dropdown left blank inside an added step).

## Guidelines
- Modal inherently needs to clearly validate that all added escalation steps have a target assigned before allowing creation to proceed.
