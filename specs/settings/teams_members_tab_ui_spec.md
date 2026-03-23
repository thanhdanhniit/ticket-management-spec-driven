# Teams - Members Tab (Merged Specification)

## Purpose
Allows administrators to actively view, search, and manage explicit users comprehensively assigned to a designated team. This includes securely provisioning local team-level roles (e.g., granting local Admin rights) via dynamic inline "Add" and "Edit" forms physically embedded directly within the read-only roster grid.

## Layout
This screen employs a specialized routing layout combining dual-sidebars and horizontal tabs, supplemented heavily by dynamic inline grid morphing:
- **Global & Setting Sidebars:** Inherited structure (see shared navigation specs).
- **Specialized Team Sidebar (Inner Left):**
  - **Header:** Features a back navigation arrow (`<-`), the section title "Teams", and a `+` icon utilizing the New Team configuration generation organically.
  - **List:** Selectable distinct team names explicitly dictating active contextual focus.
- **Main Content Area ("Members" Tab):**
  - **Action Bar:** Textual metrics and a right-aligned "Search members" input field.
  - **Roster Grid (Read State):** The core data table actively listing individual members alongside uniquely assigned role pill tags.
    - **Rows:** Feature Name, Email, "DEFAULT USER" semantic badges, and specific role tags (e.g., `[Manage Team]`, `[Admin]`).
    - **Row Controls:** A kebab menu (`...`) floating on the far right houses "Edit" and "Remove".
  - **Add Member Block:** A primary "Add new members" button anchored definitively physically below the roster.

### Dynamic Inline Views
- **Add New Member Form (Inline Morph):** Clicking "Add new members" smoothly expands a bordered container immediately beneath the active list. It symmetrically features a target "Name" dropdown input (left) explicitly mapped against a multi-select "Team roles" checkbox cluster (right), anchored by "Add X members" / "Cancel" buttons.
- **Edit Member Form (Inline Morph):** Clicking "Edit" on a specific user row abruptly specifically transforms that exact grid row into an expanded functional card. The user's visual identity strictly remains locked completely to the left, while read-only role tags physically transition into an interactive checkbox cluster on the right. An isolated red Trash (Delete) SVG securely appears exclusively on the far right border. A sprawling systemic warning text block renders physically below the checkboxes if critical routing overrides are actively endangered.

## Components
- **Global / Setting Sidebars.**
- **Roster Table Rows (Read-Only).**
- **Dynamic Action Cards (Inline Form Wrappers).**
- **Selectable Role Chips:** Multi-select Boolean checkbox primitives organically layered inside outlined badge shapes.
- **Destructive Action SVG:** An isolated red Trash Can distinctly deployed strictly for targeted identity removal explicitly during the "Edit" workflow.

## Fields & Forms
- **Roster Search:** Dedicated right-aligned team filter.
- **Target User Dropdown (Add Modal):** Securely targets institutional directory.
- **Team Roles Multi-Select:** The sole fundamentally mutable structural capability natively within this localized active view, meticulously deployed explicitly to securely provision specific CRUD boundaries solely for the target team.

## User Actions
- **Select Context:** Select distinct teams from the Inner Sidebar logically loading their configuration.
- **Search:** Input text rigidly identifying the active roster array.
- **Expand Add Entity Matrix:** Click the primary bottom "Add new members" button cleanly exposing the inline creation configuration form seamlessly avoiding jarring modal overlays.
- **Morph Edit Matrix:** Deliberately click any standard roster kebab -> "Edit" structurally dynamically converting the static tabular row actively into the physical interactive permission interface.
- **Provision Checkboxes:** Deliberately toggle explicit role capability primitives (Manage Team, Admin) confidently inside embedded forms.
- **Delete / Remove:** Methodically securely eject users via the foundational kebab "Remove" generic text or the fiercely dedicated localized red Trash SVG inside the edit physical form.
- **Commit Configurations:** Deliberately solidly click localized form primary "Save" / "Add" buttons, intelligently automatically physically collapsing the dynamic UI structures reliably inherently resolving entirely specifically back explicitly to read-only tabular rows natively.

## Error / Systemic Warnings
- **Preemptive Logic Overrides:** Editing a team's physical "Default User" decisively forces highly visible dense warning blocks structurally below the checkbox primitives explicitly demanding users firmly understand the severe systemic reassignment consequences dynamically preventing accidental ownership voids.
