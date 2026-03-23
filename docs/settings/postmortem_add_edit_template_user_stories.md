# Postmortem Add/Edit Template - User Stories

These user stories were generated based on the "Update Template" modal UI screenshot.

## Epic: Template Authoring and Editing

**As an** administrator  
**I want** to author or update template content within a focused modal overlay  
**So that** I am not redirected away from my workflow on the main settings page while performing complex edits

**Acceptance Criteria**  
- Given I click to edit an existing postmortem template  
- When the action successfully processes  
- Then the system renders a large, centered "Update Template" modal distinctly overlaid above the underlying faded "Postmortem Templates" list view.

---

**As an** administrator  
**I want** to heavily format the structural boilerplate text of my template using a comprehensive rich text editor  
**So that** generated postmortem reports look professional, consistent, and strictly follow our organization's required structural hierarchy

**Acceptance Criteria**  
- Given I am authoring documentation inside the Template modal  
- When my cursor is active within the primary "Template" body area  
- Then I have perpetual access to a fully-featured WYSIWYG toolbar along the top edge of the editor  
- And I can instantly trigger text formatting options (e.g., Bold, Italics) or structural elements (e.g., Heading levels, Lists, Image insertion) which immediately reflect in the editor.

---

**As an** administrator designing an advanced postmortem template  
**I want** to directly view an explicit reference schema mapping all valid system variables while I am actively editing my text  
**So that** I can seamlessly inject dynamic incident data placeholders without wasting time digging through external documentation or guessing syntax keys

**Acceptance Criteria**  
- Given I am authoring documentation inside the Template modal  
- When I look to the structurally isolated right-hand column  
- Then the system permanently displays a dark-themed, JSON-formatted dictionary payload  
- And this payload explicitly details all valid referencable variable names (e.g., `"message"`, `timelines`, `"current_user"`) available for immediate injection.  
- When I type valid syntax mapped to those variable keys (e.g., `{{ #timelines }}`) into the template editor, the system successfully processes them as dynamic hooks.

---

**As an** administrator  
**I want** to instantly designate the specific template I am currently editing as the organizational default  
**So that** I don't have to navigate backwards to a separate, disjointed settings page just to update a simple default assignment preference

**Acceptance Criteria**  
- Given I am finalizing edits inside the Template modal  
- When I actively check the "Set as Default" boolean checkbox positioned at the bottom left of the form  
- And I subsequently click the primary "Update" execution button  
- Then the system securely saves the template's details and concurrently flags it permanently as the single actively assigned organizational default.

---

**As an** administrator  
**I want** to explicitly control the precise moment my heavy text modifications are saved or entirely abandoned  
**So that** I do not inadvertently break critical template structures or save half-finished thoughts to a live document

**Acceptance Criteria**  
- Given I have manually changed data indicating an unsaved "dirty" state within the modal fields  
- When I click the primary "Update" execution button, the system permanently commits those changes to the database and cleanly closes the modal  
- In absolute contrast, when I click the explicit "X" close icon positioned at the top right, the modal exits entirely and immediately gracefully destroys any unsaved changes without committing them.
