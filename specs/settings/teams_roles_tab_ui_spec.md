# Teams - Roles Tab

## Purpose
Provides administrators a dedicated interface to define, author, and review distinct permission access tiers (Team Roles) explicitly scoped to the active team. Allows deep, granular mapping of CRUD (Create, Read, Update, Delete) capabilities to specific nested sub-entities.

## Layout
The view inherits the baseline hierarchical framework of the Teams settings but introduces a stacked-card read orientation paired with expansive inline editing forms.
- **Global & Setting Sidebars:** Inherited structure (see previous specs).
- **Main Content Area ("Roles" Tab Active):**
  - **Header Configuration:** Contextual introductory text validating the page's purpose. Italicized metric indicating total roles (e.g., "4 Roles in this team").
  - **Search Input:** A unified "Search roles" text field positioned in the upper right.
  - **Role Stacks (Read State):** A vertical stack of bordered, card-like containers representing individual roles.
    - Each container possesses a bold Title (e.g., "Manage Team", "Admin").
    - Each container lists architectural "Entities" on the left and a row of explicit capability tags (read, create, update, delete) on the right.
  - **Kebab Control (`...`):** Hovering or selecting a customizable role card surfaces a kebab menu offering contextual dropdown actions ("Edit" and "Delete").
  - **Footer Action:** A primary "Add new team role" button stationed at the bottom of the active list.
  - **Dynamic Embedded Forms (Write States):** Triggering an "Add" or "Edit" action fundamentally alters the UI by expanding an interactive entity-mapping matrix directly inline.

## Components & Interactive States

### Read-Only Role Cards
- **Locked System Stances:** Fundamental foundational roles (like "Manage Team") distinguish themselves visually utilizing a subtle grey background and a static padlock icon appended to the title, indicating structural immutability (cannot be deleted or fundamentally renamed).
- **Custom Role Cards:** Standard white backgrounds displaying a matrix of Entities mapped against non-interactive capability tags (plain text encased in a bordered pill shape).
- **Kebab Menu:** Contextual trigger housing "Edit" and a destructive "Delete" (red text).

### Inline Dynamic Form ("New role" & "Edit")
- **Form Card Wrapper:** Visually structurally identical to a standard capability matrix card, but aggressively expanded to index the absolute entirety of the system's configurable sub-entities (e.g., Escalation policies, Postmortems, Runbooks, Schedules).
- **TextInput (Name):** A standard bordered text field to dictate the human-readable identifier of the custom role (Pre-populated aggressively during the "Edit" flow).
- **Multi-Select Checkbox Matrix:** The core configuration UI. A sprawling, dense matrix explicitly listing every entity constraint on the Y-axis against the four standard HTTP-equivalent structural capabilities (read, create, update, delete) on the X-axis.
  - *Interaction:* Each distinct capability pill physically contains an interactive boolean checkbox component specifically dictating granular provisioning (e.g., checking "read" but deliberately unchecking "delete" for incident Postmortems).
- **Action Buttons:** Anchored bottom-left. Primary solid blue execution button ("Save") adjacent to a secondary abort trigger ("Cancel").

## Fields
- **Name:** The string literal identifier for the custom role framework.
- **Entities / Permissions Matrix:** A massive boolean array deterministically controlling granular access control logic specifically isolated to the active team context.

## User Actions
- **Search System:** Input text into the "Search roles" field to dynamically filter the stacked card layout.
- **Review Baseline Definitions:** Expand or visually scan the static role cards to mentally audit what capabilities are actively mapped to a specific designation moniker.
- **Instantiate Inline Builder:** Click the "Add new team role" structural button to generate a blank "New role" capability matrix dynamically appended to the bottom of the stack.
- **Generate Custom Permissions:** Type a unique Role Name, and definitively toggle the exact specific entity checkboxes (read, create, update, delete) to hand-craft a profoundly specific operational authorization tier.
- **Edit Existing Matrix:** Click the specific row kebab icon -> "Edit" to dynamically expand and morph an existing custom role card into the interactive checkbox matrix, pre-loaded with its active state values.
- **Execute Permanent Destruction:** Click the kebab icon -> "Delete" (red text) to formally eliminate a custom role from the team entirely (presumably triggering confirmation dialogues or actively checking for orphaned dependencies).
- **Commit Configurations:** Click "Save" inside the dynamic inline form to serialize and physically commit the boolean arrays to the backend permission engine, safely collapsing the UI form back down gracefully to a standard read-only Card.
- **Abort Modifications:** Click "Cancel" to aggressively abandon the state mutations immediately, gracefully resetting the DOM without executing any network calls.

## Forms
- Operates primarily leveraging **Embedded Morphing Forms**. The architectural UI intensely avoids disjointed modal windows or hard page redirects, prioritizing a strategy where "Reading" and "Writing" configuration physically inhabit the exact same DOM grid coordinates, dynamically expanding and collapsing contextually.

## Error / Empty States
- Form validation heavily implies the "Name" text field operates as a strict requirement to physically commit an "Add role" execution.
