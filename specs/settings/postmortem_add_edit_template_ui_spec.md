# Postmortem Templates - Add/Edit Modal

## Purpose
Provides administrators an isolated, highly focused workspace to author, design, and modify the structure and dynamic content of incident postmortem document templates.

## Layout
The view breaks from the standard page layout by utilizing a prominent, centered modal overlay:
- **Background Context:** The underlying Postmortem Templates list view is darkened/faded, communicating that the user remains within the context of the settings page while focused on a child task.
- **Modal Container:** A large, structured overlay centered on the screen.
  - **Header Row:** Features the dynamic title context (e.g., "Update Template" or "Add Template") left-aligned, alongside a global "Close" (X) icon securely anchored to the top right.
  - **Split Body Layout:** The main form area is symmetrically bisected into two functional columns:
    - **Left Column (Editor Focus):** Contains standard label-input pairings. Features a full-width "Name" text input at the top, immediately followed by the complex "Template" rich text editor area featuring a dense top toolbar.
    - **Right Column (Reference Payload):** Wholly dedicated to a dark-themed, vertically and horizontally scrollable block containing a JSON-formatted mapping of available system variables.
  - **Footer:** Fixed bottom region carrying form-level actions. Left-aligned is the "Set as Default" checkbox, while the left-adjacent area holds the primary submission button (e.g., "Update" or "Save").

## Components
- **Modal/Dialog Wrapper:** Standard overlay component with scrim/backdrop.
- **Text Inputs:** Basic text field for the template "Name".
- **Rich Text Editor:** A complex input area featuring:
  - **WYSIWYG Toolbar:** A functional strip containing formatting actions (Text Hierarchy dropdown, Bold, Italic, Ordered/Unordered Lists, Insert Image, Insert Link, Clear Formatting, Code Block, Quote, Horizontal Rule, Preview Toggle, Fullscreen Toggle).
  - **Body Input:** Supports hybrid input, accepting standard text, markdown patterns (e.g., `###`, `##`), and specific mustache/handlebar bracket syntax for variables (e.g., `{{ #timelines }}`).
- **Data Dictionary / Syntax Reference:** A dark-mode code block element persistently displaying the JSON schema payload for dynamic properties.
- **Checkbox:** Standard binary "Set as Default" toggle selector.
- **Buttons (Primary):** Action submission button ("Update").
- **Icons Elements:** Close modal (X).

## Fields
- **Name:** The human-identifiable string defining the template.
- **Template Context (Body):** The structural core of the postmortem report, capturing boilerplate text, layout formatting, and dynamic variable injection points.
- **Set as Default:** Boolean value determining if this specific template overrides any existing defaults.

## User Actions
- **Update Name:** Type or modify the identifying string in the Name field.
- **Author Template Body:** Type foundational documentation structures into the Template rich text area.
- **Format Content:** Apply structural or aesthetic formatting immediately by clicking related icons in the WYSIWYG editor toolbar.
- **Inject Dynamic Data:** Mentally reference the specific JSON keys showcased in the right-hand dark panel (e.g., `"message"`, `"incident_tag_key1"`), and manually type those keys wrapped in appropriate syntax within the template body to ensure real incident data is pulled dynamically at generation time.
- **Toggle Default Status:** Click the "Set as Default" checkbox to instantly promote the template's status.
- **Commit Changes:** Click the primary "Update" button to save the form state back to the server and exit the overlay.
- **Discard Unsaved Changes:** Click the "X" icon to cancel all current edits and regress safely to the underlying list view state.

## Forms
- **Template Configuration Form:** The modal itself is a complete, self-contained Data Transfer Object form managing the entirety of a single template's schema.

## Tables
- N/A

## Pagination / Filters
- N/A

## Navigation
- **Exiting:** Submitting or canceling the modal destroys the overlay, safely returning keyboard/mouse focus to the parent Postmortem Templates settings page.

## Error / Empty States
- **Validation Blocks:** While not explicitly rendered, attempting an "Update" execution while the "Name" or "Template Body" fields are totally empty would likely trigger prominent inline field-level validation text (e.g., "Template name is required").
