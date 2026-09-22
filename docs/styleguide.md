# Styleguide

Global design tokens (color, typography, spacing) live separately in `design-tokens.md` and `tokens.css` in the same folder — read those first for any color, font, or spacing value referenced by name below (e.g. "primary colour", "Body MD"). This file covers component and pattern behavior only: purpose, variants, props, do's/don'ts, states, and code examples.

## Avatar
**Purpose:** An avatar is a visual representation of a user in the app. It helps users visually identify a person.

**Variants:**
- Profile avatar — shows the user's uploaded picture.
- Letter avatar — shown by default when the user hasn't uploaded a picture; displays the user's initials.
- Placeholder avatar — shown when neither an image nor initials are set (undocumented in earlier Zeroheight text, but exists in code).

**Props / API:**
- `size` — `'xs' | 'sm' | 'md' | 'lg'`.
- `showStatus` / `status` — adds an online/offline status dot to the avatar.

**Do's**
- Use profile avatar in tags.

**Don'ts**
- Don't use the letter avatar in tags next to the name.

**States:** Image set, Initials set, Placeholder (neither set); optional status dot: Online, Offline.

## Buttons
**Purpose:** Buttons allow users to take actions and make choices with a single click.

**When to use / when not to use:**
- Primary — for the single main action on a page.
- Secondary — for non-primary actions (e.g. "Save and export").
- Delete button — only for undoable deletion actions, only inside deletion dialogs.
- Primary small button — for inline forms or pop-overs where space is limited (e.g. "Add a Note" pop-over).
- Login primary button — only on the Login page, for the login action.
- Login secondary button — only on the "Forgot password" page, for the secondary action.
- Link button — for interactions inside cards and tables.
- Text button — for cancelling actions in dialogs.
- Link button with icon — for recognizable actions inside a card (e.g. Edit).
- Micro button — not used as a standalone component; only used embedded within another component.
- FAB (secondary) — used as a floating action button on mobile, for a secondary action.
- Icon button — for interactions inside a table (e.g. next/previous page).
- Circle button — for recognizable actions that don't need a CTA label (e.g. send an email).
- Square button — for an action listed alongside secondary buttons (e.g. the 3-dot button on the application overview page, new designs).
- Approve/Reject button — used in the Document Center (new designs).

**Variants:**
- Primary (Button 1)
- Secondary (Button 2)
- Delete button (Button 3)
- Primary small button
- Login primary button (Button 4)
- Login secondary button (Button 5)
- Primary button with icon (Button 6) — icon always on the left, highest priority button
- Secondary button with icon (Button 7)
- Link button
- Text button
- Link button with icon (primary)
- Link button with icon (secondary)
- Text button with icon (destructive)
- Micro button primary
- Micro button secondary
- Micro button with icon
- FAB button primary
- FAB button secondary
- Card button — has the same width as the card it sits in.
- Icon button
- Circle button
- Square button
- Approve/Reject button
- Favorite button — a star-toggle button, found in code but not documented in Zeroheight; confirm intended usage with design before relying on it.

**Props / API:**
- `icon` — passing a mat-icon key directly to the `icon` prop generates a button with an icon.
- `type` — sets the button style variant (e.g. `type="card"`, `type="favorite"`).
- A separate legacy input set (`secondary`, `destructive`, `onlyIcon`, etc.) exists in code alongside the current `type`-based API — treat the `type` prop as the current standard; the legacy set is for older call sites, not new work.

**Do's**
- Use 16px padding between buttons.
- Use the primary button to confirm actions in dialogs.
- Use the primary button's disabled state in dialogs when mandatory fields haven't been filled in yet.
- Use the primary button's disabled state when an action the user takes on the same page can enable it.
- Put more than 2 secondary actions under a 3-dot button (square, secondary).
- Place the icon on the left for the primary button with icon.
- Use icons on both buttons when 2 secondary icon-buttons sit next to each other (e.g. Application details page).
- Use the loading state only for actions that take time to load (e.g. CSV report download).
- Replace the button's text entirely with a loading spinner while it's loading.
- Use the link button for interactions inside cards and tables.
- Use the text button to cancel actions in dialogs.
- Give the text button the same padding as a normal button, without a background color or border.
- Use link button with icon (primary or secondary) for recognizable actions inside a card (e.g. Edit).
- Give the icon button a circle background on hover and in the disabled state.
- Order buttons by importance from left to right, with the primary button on the left.
- Place the primary button on the left, with a subtle link/text button next to it to cancel the action.
- Use 2 secondary buttons with icons next to each other when there are two equally-weighted actions (e.g. Export/Import).
- Show a tooltip describing the action while the user hovers over an icon button.
- Use an icon button with a dropdown when there isn't enough space to show several actions directly.

**Don'ts**
- Don't use more than one primary button per page.
- Don't use more than 2 secondary buttons per page.
- Don't use the secondary button style for "Cancel" buttons.
- Don't use the primary-with-icon or secondary-with-icon style for "Edit" — Edit is always a Link button with icon.
- Don't add padding to the link button — it has none by default.
- Don't add padding to the link button with icon (primary or secondary) — they have none by default.
- Don't use micro button as a standalone component — always use it embedded within another component.
- Don't add padding to micro buttons (primary, secondary, or with icon) — they have none by default.
- Don't place the primary button on the right.
- Don't show a loading spinner next to the button's text — replace the text entirely.

**States:** Default, Hover, Pressed, Disabled, Loading.
- Primary button: default/hover/pressed use a solid dark teal-green fill with white text.
- Disabled: light grey fill with muted grey text.
- Loading: fill stays the same as default, label is replaced by a spinner icon.
- Link button: has Default, Hover, Pressed, Disabled states (no visual detail provided yet).
- Icon button: Default, Hover, Pressed, Disabled (circle background shown on Hover and Disabled).
- Approve/Reject button: Unselected, Selected.

**Code example:**
```html
<!-- Card button -->
<fl-button type="card" icon="add"></fl-button>
```

## Cards
**Purpose:** Cards contain content and actions about a single subject.

**Do's**
- Use a separator to split actions when a card presents more than one action.
- Use a bordered card inside another card.
- Use a text button with icon inside a card.

**Don'ts**
- Don't use a card with a shadow inside another card.

## Checkboxes
**Purpose:** Used when the user needs to select several options from a list, when all available options need to be shown at once.

**When to use / when not to use:**
- Use for multiple choices, when the selection needs to be saved.
- Don't use for a single choice — use radio buttons instead.

**Props / API:**
- There's no dedicated checkbox component in code — checkboxes are implemented as raw `<input type="checkbox">` with SCSS classes, not an Angular component with its own `@Input`s. Don't assume component-level props exist beyond standard HTML checkbox attributes plus whatever classes the SCSS defines.
- A separate `fl-consent-checkbox` exists specifically for GDPR consent flows (customer-facing app) — check whether it applies before reusing the generic checkbox markup for a consent use case.

**Do's**
- Use checkboxes for multiple choices.
- Use checkboxes when the action needs to be saved.
- Use checkboxes when all options need to be glanced at once.

**Don'ts**
- Don't use checkboxes for a single choice — use radio buttons instead.
- Don't use checkboxes when the user doesn't need to see all options at once and already knows the items in advance — use a dropdown with search instead (e.g. for an advisor list).

**States:** Unchecked, Checked, Indeterminate/partial-selection (e.g. a parent checkbox representing a mixed selection of children). A large icon size variant also exists alongside the default size.

## Chips
**Variants:**
- Chips (financing project) — used in the Application Header.
- Chips (mortgage hub) — used above the Document list sidebar in Mortgage Hub.

**When to use / when not to use:**
- Chips (financing project) — used in the Application Header.
- Chips (mortgage hub) — used above the Document list sidebar in Mortgage Hub.

**States:**
- Chips (financing project): Active hidden, Active visible, Inactive.
- Chips (mortgage hub): Selected, Not selected.

## Dropdown button
**When to use / when not to use:**
- Use for a single choice.
- Don't use a dropdown on its own — always add a legend to explain what the user is choosing.
- Dropdown button with icon — use to select a specific parameter (e.g. date, period); also for a single choice.

**Variants:**
- Simple dropdown
- Dropdown button with icon

**Do's**
- Use the dropdown button for a single choice.
- Use the dropdown button with icon to select a specific parameter (e.g. date, period).
- Change the dropdown button with icon's label to the selected parameter, and keep that choice saved as the user navigates to other pages across the app.
- Show a legend/label before the dropdown button, indicating which parameter is currently selected (e.g. "Owner:").

**Don'ts**
- Don't use a dropdown on its own — always add a legend to explain what the user is choosing.

## Dropdown
**Purpose:** A dropdown displays a list of choices on a temporary surface. It appears when the user interacts with a button or input, and is triggered on click.

**Variants:**
- Simple dropdown — used when the presented list choices are equal.
- Dropdown with search — adds a search bar on top, recommended when the user already knows the item they want.
- Dropdown color select — used when a color needs to be selected (e.g. widgets).

**When to use / when not to use:**
- Simple dropdown — for equal-weight list choices; if another action needs to appear inside it, divide it with a separator fixed at the bottom.
- Dropdown with search — recommended when the user already knows the item they're looking for.
- Dropdown color select — use when a color needs to be selected (e.g. widgets).

**Do's**
- Divide an extra action inside a simple dropdown with a separator, fixed at the bottom (always visible).
- Highlight the field green when it's clicked, and drop the menu down below it.
- Highlight menu options with a Light neutral/200 grey background on hover.
- Highlight the selected item's text (Body text Regular - Highlighted), darken the background to Light neutral/400, and show a checkmark to the right of the item.
- Show the selected item in the field above once it's chosen.
- Keep a selected item highlighted in the menu, and keep the hover effect active on the other items.
- Match the menu width to the field above, except when menu items are longer than the field.
- Automatically close a single-selection dropdown menu once a selection is made.
- Update the list live as the user types, in a dropdown with search.
- Replace the search icon with a reset icon once the user starts typing; clicking the reset icon clears the input and restores the initial results.
- Support keyboard navigation in the search variant: arrow keys to move through options, Enter to select, with the option list auto-scrolling to keep the highlighted item in view.
- Highlight a destructive action (e.g. "Delete") in red text, and place it at the bottom of the menu.

**Don'ts**
- Don't let the dropdown menu cover the field it opens from.
- Don't make the dropdown menu narrower than the field it drops down from.
- Don't highlight a destructive action with the primary colour.
- Don't place a destructive action in the middle of the menu.

**States:**
- Trigger field: Default, Active/clicked (green highlight, menu opens below).
- Menu item: Default, Hover (Light neutral/200 background), Selected (Light neutral/400 background, checkmark, highlighted text).
- Dropdown with search: Default (search icon shown), Typing (search icon replaced by reset icon).

## Dialog
**Purpose:** Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks. A dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision. Dialogs disable all app functionality while they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.

**Variants:**
- Standard dialog
- Standard dialog with 2nd option (secondary button)
- Fixed footer dialog
- Icon dialog
- Error dialog
- Add/Edit dialog
- Share dialog — adapted layout for when the primary action is sharing a link.

**When to use / when not to use:**
- Fixed footer dialog — use when the content can't fit into the viewport.
- Icon dialog — use for specific actions where user action is required (e.g. deletion confirmation).
- Error dialog — use to notify the user about an error that is blocking them from using the application further.
- Add/Edit dialog — use for Add or Edit actions.
- Share dialog — use when the primary action is to share a link, adapting the dialog's layout accordingly.

**Do's**
- Allow the dialog to be closed without action via the close icon (top right corner) or the Cancel button.
- Keep the dialog header to 2 rows maximum; if it would be longer, keep the header short and add a description text instead.
- Give the dialog 2 buttons: a Primary button to confirm the action stated in the header, and a Text button to cancel it (equivalent to the close icon and ESC).
- Use a secondary button if a 2nd option can't be avoided, and make sure it has a different function than close/ESC.
- Show a fixed footer when the content can't fit into the viewport.
- Use the icon dialog for specific actions where user action is required (e.g. deletion confirmation).
- Show the error dialog to notify the user about a blocking error.
- Add a suggested solution as a text link at the end of the sentence, and use a warning icon instead of the error icon (e.g. Import error).
- Use dialogs for Add/Edit actions.
- Change the dialog's layout when its primary action is to share a link (e.g. show the link with a copy button, instead of standard form fields).
- Show an info section message inside the dialog body (pop-up), not in the dialog header.

**Don'ts**
- Avoid adding different CTAs for the user to choose between.
- Don't use the primary button on a strict Error-type dialog, since there's no way to match the header with the primary button. Note: a "Warning"-type dialog that visually resembles an error (e.g. "this email already exists") does use a primary-coloured OK button in code — this rule applies specifically to the Error type, not every dialog that reads like an error to the user. Confirm which type you're building before applying this rule.
- Don't let the user complete the action if mandatory inputs in the dialog aren't filled in — keep the primary button disabled instead.
- Don't show an info section message in the dialog header.

**Accessibility:** The dialog can be dismissed with the ESC key, equivalent to the close icon or Cancel button.

## Loading spinner
**Purpose:** Used when loading content in a small section, and inside buttons and toast elements.

**Variants:**
- Spinner S — 16px
- Spinner M — 40px (default)
- Spinner L — 80px
- Loading button
- Loading toast
- Skeleton — used for table loading.

**When to use / when not to use:**
- Loading button — use while loading an action that becomes accessible on button click (synchronous).
- Loading toast — use for an asynchronous download.
- Skeleton — use for table loading, showing the table's structure on the page while its content loads.

**Do's**
- Use the spinner inside the element that's being loaded (e.g. a card).
- Show a loading toast when loading starts and will take some time.
- Show a second toast with a success message once the loading action has completed (e.g. a download).
- Show the table's structure on the page via a skeleton, while its content is loading.

**Don'ts**
- Don't use the spinner for a table — use a skeleton instead.

## Input
**Purpose:** Inputs let users enter and edit data — text, numbers, and dates.

**Variants:**
- Simple input
- Input with info icon
- Mandatory input
- Disabled input
- Error state
- Input with hint
- Input with placeholder
- Input with long label
- Input with icon button
- Input with suffix
- Number input (integer)
- Number input, 2 decimals
- Number input, 4 decimals
- Number input bound to a string model
- Search input
- Phone number input
- Text area input

**When to use / when not to use:**
- Use a text input for text entry; use Number input instead when the user has to enter numbers.
- Input with info icon — use when additional information about the field is needed.
- Mandatory input — use for required fields.
- Disabled input — use to prevent the user from changing information (e.g. loan application email).
- Input with hint — use when the user needs instructions for filling in the input.
- Input with icon button — use for a date range period; the date picker appears on click of the icon button.
- Input with suffix — use for square meters, percentage, or Euro values.
- Number input — bind it to either a numeric model (e.g. `500001`, or `500000.76` / `500000.7555` for 2/4-decimal variants) or a string-typed model (e.g. `"200000.45"`).
- Text area input — use for longer text, e.g. a description field.

**Props / API:**
- `label` — sets the input's label text.
- `formControl` — binds the input to a reactive form control.
- `disabled` — set to `true` to render the disabled state.
- On `fl-form-field`-wrapped inputs, `formControl`/`disabled` typically sit on the projected native `<input>`, not the wrapper itself; some newer components (e.g. text/number input) expose them as first-class `@Input`s on the wrapper instead — check which pattern the specific component you're using follows before wiring bindings.
- A second, largely separate input component family exists under `libs/client/customer/ui-core` (e.g. `input-decimal`, `input-percentage`, `input-slider`, `input-boolean-select`, `input-country`, `input-zip`, `input-city`, `input-title`). These aren't documented above as their own variants — check this family too before assuming the common `ui-core` inputs are the only option, especially in customer-facing surfaces.

**Do's**
- Use a label on standard inputs.
- Give every input a focused state on click.
- Show the additional-info popup when the user clicks the info icon.
- Show an error state on mandatory inputs if the user tries to complete the action before they're filled in.
- Show the error state when an input isn't filled in correctly, or when a mandatory input is empty.
- Validate the input once the user finishes typing and moves focus away from it.
- Show a tooltip on hover for a long label.
- Make the text area draggable (resizable).
- Use a placeholder on the search input.
- Replace the search icon with a remove icon once the user starts typing.
- Make the phone number input's country selector searchable.

**Don'ts**
- Don't use a placeholder instead of a label on standard inputs.
- Don't let the user complete the action before all mandatory inputs are filled in.
- Don't show the error explanation text in a dense layout.
- Don't add a label to the search input — it has none.
- Don't use a simple input to let the user specify a numeric value in steps or with a unit — use a number input with a suffix instead (e.g. €, %, m²).
- Don't use a text input when the expected text is long — use the text area component instead.

**States:**
- Simple input: Default, Focused.
- Search input: Initial, Typing (search icon replaced by a remove icon).
- Phone number input: Initial, Dropdown open, Country selected, Filled.

**Code example:**
```html
<fl-form-field class="m-t-24 m-t-md-16" label="Simple text input">
  <input type="text" [formControl]="form?.get('input_value')" disabled="true">
</fl-form-field>
```

## Nested menu
**Purpose:** Use this component when the user can select a single option and the hierarchy is important (e.g. team structure).

**Do's**
- Use a dropdown as the initial element.
- Open levels one by one.
- Use a grey background on hover to show the user's current location.
- The menu closes all levels automatically once an item is selected — but updating the dropdown's displayed label is not automatic; the consuming page must set it manually from the emitted value.
- If a "select all" / top-level default option is needed, this isn't a built-in convention — the real implementation seen uses a generic "All Teams" label with no item selected by default, not a fixed "My organisation" default. Confirm the intended default with design for each use case.

## Message
**Purpose:** A message lets users know when important information is available or when an action is required.

**Variants:**
- Section banner — Error
- Section banner — Info
- Section banner — Success
- Section banner — Warning
- Error message — Multiple lines
- Full width message
- Notification — a fifth message type found in code, undocumented in Zeroheight; confirm intended usage with design.

**When to use / when not to use:**
- Section messages — placed inside a section, to notify users of consequences they might not expect.
- Full width messages — use at the top of the page when the message relates to the whole app.

**Props / API:**
- `dismissible` / `afterDismiss` — makes the message closeable, with a callback once it's dismissed.
- `icon`, `className` — for custom icon/styling overrides.

**Do's**
- Place section messages inside the section they relate to.
- Use section messages to notify users about consequences they might not expect.
- For errors, place the message close to the input, or at the top of the section if the error relates to multiple inputs.
- Use a full width message at the top of the page when it relates to the whole app.

## Popup message
**Purpose:** Used for any lengthy additional information. Title and link elements are optional.

**Variants:**
- A single generic popup component with positioning variants (e.g. top-left, top-right, auto), not separate status-color variants. Default icon is "info".

**Do's**
- Trigger the popup on click.
- Use it for info messages, to show additional information.
- Align the popup message to the left of the button, when it's shown inside a dialog.
- Let the popup position itself automatically based on available viewport space (auto mode falls back between top-left/top-right/etc. as needed).

**Don'ts**
- Don't show the popup message outside the dialog it belongs to, if it's meant to be shown inside one.

**Accessibility:** Closes on an outside click; there's no explicit ESC-key support (unlike Dialog) — don't assume ESC dismisses it.

## Radio buttons
**Purpose:** Use radio buttons to select a single option from a list, when all available options need to be shown at once.

**Do's**
- Use radio buttons for a single choice.
- Have one option always selected by default.

**Don'ts**
- Don't use radio buttons for multiple choice — use checkboxes or a dropdown instead.
- Don't display radio buttons without a default selection.

## Select
**Purpose:** Select allows the user to enter data by choosing a single or multiple options from a list.

**Variants:**
- Select default
- Select with placeholder
- Select with long label
- Mandatory select
- Disabled select
- Invalid select
- Invalid select with error message
- Single select without label
- Autocomplete single select
- Multi select default
- Multi select searchable dropdown
- Autocomplete multi select (not searchable)
- Autocomplete multi select searchable — search bar in the dropdown
- Autocomplete multi select searchable — search bar in the select field
- Autocomplete multi select with server-paginated async loading and infinite scroll (for very large, remotely-loaded option lists).

**When to use / when not to use:**
- Use a select when the user needs to choose from several options and doesn't already know what to pick.
- Use a dropdown list for up to 10 items — for more, use Autocomplete single select (single-select) or a searchable multi select (multi-select).
- Select with placeholder — use only if the label instructions aren't clear enough on their own.
- Single select without label — use when selects are stacked one under another (e.g. lead assignment rule).
- Autocomplete single select — use when the list is long and the user already knows what to choose (e.g. countries).

**Props / API:**
- Not a single unified component in code: the actively-developed composite select has no Angular Material dependency (CDK overlay + its own ARIA combobox implementation); only some variants (`fl-select-material`, the `-with-tags` autocomplete variants) actually wrap Angular Material Select. Don't assume every select in the codebase is a Material wrapper — check which implementation you're extending.
- Composite select props include: `selectAll`, `maxSelections`, `selectionDisplay` (`'tags' | 'summary'`), `selectionTemplate`, `selectionIndicator`, `clearable`.

**Do's**
- Use the default select in long forms with multiple inputs/selects next to each other (e.g. application details).
- Show a tooltip on hover for a long select label.
- Add a "-" option in the dropdown list for non-mandatory single-select-without-label fields.
- Use a placeholder and an error state without an error message for single select without label.
- Make the autocomplete single select searchable, with a search icon.
- Use removable tags to show selected options in a searchable multi select.
- Let the user remove a tag either by unchecking its checkbox or by clicking its close icon.
- Show a counter for the maximum number of options in the search-in-field multi select variant.

**Don'ts**
- Don't show a placeholder if the field already has a label.

**States:**
- Autocomplete single select: Initial, Open, Selected.

## Multi-level select
**Purpose:** A hierarchical, tree-structured multi-select for choosing items across nested levels (e.g. a team/org hierarchy), where the user can pick multiple items at different levels rather than a single leaf value. Found in code (`fl-multi-level-select`) with no prior Zeroheight documentation — confirm interaction details with design before treating anything below as final.

**When to use / when not to use:**
- Use when selections are hierarchical and the user may need to select at more than one level of the tree (not just leaf nodes) and more than one item at once.
- Don't use for a flat, single-level list — use a regular Select or Dropdown instead.
- Don't use for a single-selection hierarchy — that's the Nested menu component instead.

**Props / API:** Implemented as a nested checkbox tree (parent/child checkboxes), distinct from the single-select Nested menu component.

## Tags
**Purpose:** Tags are compact elements that represent a characteristic, status, or replaceable item.

**Variants:**
- Characteristic tags: Person tag (with image), Chips, Custom tags, System tags, New tag, Imported tag.
- Status tags: Offer tags (Active, Expired, Expires in 1 day, Inactive), Signed-by-client tag, Synchronisation tags (for eHyp sync).
- `notification` and `pill` tag types also exist in the underlying tag component, alongside the characteristic/status types above — a broader API than the two documented use cases; confirm the intended use with design before adding new tag types.

**Props / API:**
- The tag component supports a close button and can show a person's avatar inside the tag, in addition to the documented photo/icon/link options.

**When to use / when not to use:**
- Characteristic tags — describe a characteristic, e.g. a type, a team, or a person.
- Status tags — describe a current status in the FinLink system that can change through user action; independent from characteristic tags (e.g. an offer can be Active (status) and Applied (characteristic); a document can be requested by an advisor (characteristic) and signed by a client (status)).
- Chips — use in filters and in searchable multi-select fields.

**Do's**
- Give characteristic tags a photo, an icon, an "X" to remove, and/or a clickable link, as needed.
- Make the person tag removable, with a photo of the person (or an avatar).
- Make chips removable, and use them in filters and searchable multi-select fields.
- Make custom tags removable, and let the advisor define them.
- Follow the system-tag colour coding: green = good or accomplished (e.g. affordable in Max affordability, Deal won), red/orange = bad thing or warning (e.g. Deal lost), blue = something to draw the advisor's attention in a good way (e.g. New, Property found), light grey = default tags.
- Keep the "New" tag always blue.
- Make the imported tag's link clickable.
- Use removable tags for advisor and organisation tags.
- Give status tags an icon or a dot, and/or a link (e.g. to a Europace number).
- Advisor and organisation tags support a freely assignable custom colour (set via a color picker in the edit-tag dialog) — this is not decorative-only, it's a real feature.
- Some status tags (e.g. an offer's "Expires in 1 day") can be shown with a close icon and be removable in practice — treat "not removable" as the general rule for status tags, not an absolute one; check the specific tag's real behavior in code.

**Don'ts**
- Don't make system tags removable.
- Don't make the "New" tag removable.
- Don't make the imported tag removable.

**States:**
- Offer tag: Active, Expired, Expires in 1 day, Inactive, Signed by client.

## Side Navigation
**Purpose:** Navigation enables users to move through an app. Side navigation sits on the left of the page or of different sections. If there are nested pages, keep the navigation on the left up to 2 levels deep.

**Do's**
- Use dark neutral grey to highlight the active page in the side navigation.
- Show a back arrow so the user can navigate back if they leave the current page (e.g. Advisor → Advisor profile).

**Don'ts**
- Don't use the primary colour to highlight the active page in the side navigation.

## Toggle
**Purpose:** A toggle switch is a digital on/off switch.

**Variants:**
- Standard toggle
- Toggle with "Activate" label — used in Settings, where a longer description is shown next to the toggle.

**Props / API:**
- `size` — `'sm' | 'md' | 'lg'`.
- Custom on/off icon slots exist in code (`flToggleOnIcon` / `flToggleOffIcon`) for showing an icon inside the switch — undocumented in earlier Zeroheight text; confirm with design before using a non-default icon.

**When to use / when not to use:**
- Use toggle switches only when the user needs to decide between two opposing states.
- If an immediate result isn't achievable, don't use a toggle — use an alternative instead (e.g. a single checkbox).

**Do's**
- Make the toggle take immediate effect — don't require the user to click Save or Submit to apply the new state.
- Keep toggle labels short and direct.
- Describe, in the label, what the control will do when the switch is on.
- Place the label to the left of the toggle, so the user reads what it's for before acting.
- Set the default toggle state based on the most common user behaviour.
- Add an "Activate" (or active/inactive) label to the left of the toggle when there's a longer description next to it (e.g. Features in Settings).

**Don'ts**
- Don't use a toggle when the result can't take immediate effect — use an alternative like a single checkbox.
- Don't change the toggle's label when its state changes — only the switch position should change, to avoid confusing the user.
- Don't use a toggle on its own, without any label describing what turning the function active/inactive does.

**States:** Off, On.

## Tooltips
**Purpose:** A tooltip is used to provide additional information on a need basis, and is triggered on hover.

**Do's**
- Use tooltips to show the label of icon buttons or disabled buttons.
- Use tooltips to show truncated text in tables.
- Use a tooltip in a table row when a name is too long to be shown fully.

**Don'ts**
- Don't use a tooltip when the explanation text is longer than one sentence — use the info icon with a popup message instead.
- Don't use a tooltip on an info icon — use a popup message instead.

## View switcher
**Purpose:** View switchers allow users to toggle between alternate views of similar or related content. The switcher includes two or more content tab states — selected and unselected — with only one content section shown at a time.

**Variants:**
- View switcher text: Default, Grey, Small.
- View switcher icons: Icons and text, Icons only.

**When to use / when not to use:**
- View switcher text — use to switch between different KPIs inside a card (e.g. productivity reporting).
- View switcher icons — use to switch between views that display the same information (e.g. loan application pipeline and list).

**Do's**
- Save the user's choice, so it persists when they leave the page and come back.
- Adjust the size of each view switcher tab according to its content.

**Don'ts**
- Don't use a view switcher with icons when it's hard to choose the right icon.
- Don't use icons for KPIs.
- Don't make all view switcher tabs the same size.

**States:** Selected (highlighted grey), Unselected.

## Toasts
**Purpose:** A toast is used for confirming a user action, or for showing a connection error that can't be shown in a section.

**Variants:**
- Error toast
- Loading toast
- Success toast

**When to use / when not to use:**
- Use for system errors that aren't caused by the user.
- Use for errors that can't be fixed by the user.
- Use a loading toast when the action needs a few seconds to complete.
- Use a success toast to notify the user once the action that triggered the loading toast has completed (e.g. saving).

**Do's**
- Use a toast to inform the user about a background process.
- Show the toast in the bottom right corner, and fade it out after 5000ms (some callers use up to 10000ms for longer messages).
- Give each toast type (success/error/warning/info) its own coloured background, a matching coloured left border, and a matching icon — don't rely on a single black/neutral style.

**Props / API:** `SnackBarService.open()` with `SnackBarTypes` (`success`/`error`/`warning`/`info`), `duration` (default 5000ms), `panelClass`.

**Don'ts**
- Don't vary the toast position per app — it's fixed to bottom-right (`horizontalPosition: 'end'`, `verticalPosition: 'bottom'`).

## Icons
**Purpose:** We use Material icons exclusively.

**Props / API:**
- Icon set: Google Material icons. Reference: [material.io/resources/icons/?style=baseline](https://material.io/resources/icons/?style=baseline) (filled) and [material.io/resources/icons/?style=outline](https://material.io/resources/icons/?style=outline) (outlined) for the full icon catalogue.
- Only the **filled** icon font is actually bundled in code — there's no "outlined"/Material Symbols Outlined font, CSS class, or style toggle implemented. Don't spec an outlined icon unless you're also adding that font/toggle to the codebase.
- Further icon reference: [developers.google.com/fonts/docs/material_icons](https://developers.google.com/fonts/docs/material_icons), [fonts.google.com/icons](https://fonts.google.com/icons).

**Do's**
- Use Google Material icons, in the filled style (the only style currently bundled).
- If an icon isn't in the library yet, add it as a component to the Icon Library Figma file.

**Don'ts**
- Don't use the same icon for different purposes in the app.

## Tabs
**Purpose:** A type of navigation used to switch between different tabs — different information related to one topic.

**When to use / when not to use:**
- Use to categorize information on a page.
- Use tabs on top when there's more than one view to see inside a module.

**Do's**
- Use tabs to categorize information on a page.
- Place tabs on top of the module when it has more than one view.

**Don'ts**
- Don't use tabs inside cards — use a view switcher instead.
- Don't use tabs inside the table card.

## Upload box
**Purpose:** Uploading allows the user to upload files from their computer into the app.

**Variants:**
- Single upload
- Bulk upload

**When to use / when not to use:**
- Used in the Document Center. Documents can only be uploaded while the user stays on the page.

**Do's**
- Allow documents to be uploaded via drag-and-drop or by clicking.
- Show a preview of the document after it's uploaded (single upload).
- Show progress for a bulk upload in a toast-like panel (implemented as a dialog positioned like a toast, not a true toast/snackbar component) while the upload is in progress.
- Once the bulk upload completes, update that same panel's status text and let it self-close after a few seconds — there isn't a separate success toast.

**Props / API:**
- Document Center uploads go through a classification pipeline with tracked states: `waiting → categorizing → uncategorized → categorized → timeout / error`. Reflect these states in any new upload-progress UI rather than a simple binary loading/done.
- Documents can be dragged between categories (in the sidebar) or between thumbnails (in the preview panel) to recategorize or merge them — a real interaction pattern in Document Center, previously undocumented.

## Document list sidebar
**Purpose:** The document list sidebar sits on the left side of the Document Centre interface, and gives advisors an overview of their client's documents and whether each has been approved or rejected.

**Variants:**
- Standard document row
- Financing certificate row (special-cased, see below)

**Do's**
- Organise the document list into categories that can be expanded or collapsed.
- When a document name is selected, highlight it in 3 ways: background becomes "Light neutral/100", the text becomes highlighted, and the left edge becomes accent-coloured (implemented as teal/brand color, not pure green, despite earlier docs calling it "green").
- When the user clicks a document name, show the document in the centre preview window, with its page thumbnails in a vertical column on the right.
- Show a green checkmark icon to the right of an approved document's name.
- Show a red X icon to the right of a rejected document's name.
- When an advisor sends a client a document request, show the new document's name in the list with a grey "Requested" tag.
- When one or more documents are newly uploaded into a category, show a blue tag with the count of new documents on the category, and blue "New" tags with highlighted text on the newly uploaded document names once the category is expanded.
- Keep the financing certificate row standing alone at the top of the Financing Certificate documents list.
- Give the financing certificate row a green edge when it's clicked.
- Show the financing certificate in the centre preview area if the advisor has already generated one; otherwise, present the advisor with the option to generate or upload one.
- Give the document list a parent checkbox that lets the user select or deselect all items at once.

**States:**
- Document row: Default, Selected (Light neutral/100 background, highlighted text, accent-coloured left edge), Approved (green checkmark), Rejected (red X), Requested (grey "Requested" tag), Newly uploaded (blue "New" tag, highlighted text).
- Category: Collapsed, Expanded, Has new documents (blue count tag).
- Sidebar: fixed width (no drag-to-resize implemented in code, despite earlier docs describing one up to 720px).

## Document preview thumbnails
**Purpose:** When a document is selected in the Document Centre, it appears full-size in the main preview window, and its individual pages are displayed as thumbnails in a vertical column on the right.

**Do's**
- Highlight selected pages with a teal outline (implemented as `#00877a` — earlier docs called this "green").
- Allow the user to select multiple pages by clicking multiple thumbnails while holding Shift (on Mac).
- Apply actions (approve, reject, download, rotate, etc.) to all currently selected pages.

**States:** Default, Selected (teal outline), Multi-selected.

## Deletion
**Purpose:** When deletion is irreversible, we show a dialog with a red button for the user to confirm the action.

**Variants:**
- Deletion dialog
- Deletion in a table
- Deletion in a card

**When to use / when not to use:**
- Show a confirmation dialog for important actions that could lead to information loss (e.g. loan application deletion, advisor deletion).
- Don't show a deletion dialog for actions the user does on a daily basis (e.g. offer deletion) — show only a toast notification instead.

**Do's**
- Show a confirmation dialog for important, potentially information-losing delete actions.
- Use a red delete button in the confirmation dialog to make the destructive action obvious.
- Show a toast notification after an item has been deleted.
- In a table, add a 3-dot "more" button and put the delete action inside its dropdown menu.
- In a card, add 2 icons in the top-right corner — edit and delete.
- Show a tooltip on hover, describing the action, for card action icons.

**Don'ts**
- Don't show a deletion dialog for actions the user does on a daily basis (e.g. offer deletion) — show only a toast notification.
- Don't use red for the delete action inside a dropdown menu.
- Don't use standalone icons on a card if there are more than 3 actions — use a 3-dot button with a dropdown menu instead.
- Don't use a primary-coloured button to confirm a destructive action — use a red button instead.

## Empty states
**Purpose:** Empty states occur when there's no content or data to show the user. Empty states should be informative and actionable.

**Variants:**
- Empty state inside a card — the only reusable component that currently exists for this.
- Full page empty state — documented as a pattern, but no reusable dedicated component was found in code; each use case builds its own.

**Do's**
- Keep the card's structure — header and wording — the same when showing an empty state inside it.
- Use a separator to divide the empty state from the card header, if the design calls for one (not built into the reusable component — add manually).
- Put the empty state's content inside the card.
- If the user has the rights to perform the action, add a CTA button in the middle (this is a manual addition per use case — the reusable component has no CTA input).
- If the user doesn't have the rights, add explanation text saying who they can approach to make the action possible (also manual — the component has no permission/CTA logic built in).
- Use the same general pattern for a full page empty state, with a Material Design icon.

**Don'ts**
- Don't show the CTA button if the user doesn't have the rights to use it (this must be handled by the consuming page — the component itself doesn't enforce it).

## Filters
**Purpose:** Filters allow users to meaningfully manipulate data, letting them analyze it in a variety of ways.

**Variants:**
- Side panel filters — made up of inputs, checkboxes, radio buttons, and quick filters.
- Filter results (removable tags showing applied filters).
- Quick filters — single-value select for a limited set of parameters.
- Saved/named quick filters (bookmarked filter presets) — a different feature found in code from the "≤4 single-value selects" quick filters above: the user saves a named combination of filter values as a preset to reapply later. Don't confuse the two when referencing "quick filters" in a spec.

**When to use / when not to use:**
- Side panel filters — use for a large number of parameters (e.g. filtering loan applications) and for multi-select options (e.g. several advisors).
- Quick filters — use for a limited number of parameters, no more than 4; these are the most-used parameters for filtering loan application states, and stay on top of the side filter panel.
- Saved/named quick filters — use when a user wants to reapply a specific combination of filter values repeatedly, without redoing the whole side panel each time.

**Do's**
- Open the side panel when the user clicks the Filter button.
- Require user validation for the side panel via an "Apply filters" button.
- Keep applied filter results visible even when the filter panel is closed, and let the user remove them by clicking the cross.
- Use removable tags to display applied filters.
- Show a single filter as its own tag; if there are more, show "+(number of filters)" as a tag, and reveal the rest on hover.
- Prefix ambiguous filter values with the filter's name (e.g. "Advisor: Jan Joisten"), when the value alone could be mistaken for another filter type.
- Open the dropdown on click, for a quick filter's single-value select.
- Apply a quick filter's selection immediately — no validation step needed.
- Always show the "Reset filters" option, so the user can clear all parameters back to default at any time.

**Don'ts**
- Don't add a search field to quick filters — search isn't supported there.

## Error messages
**Purpose:** Errors occur when an app fails to complete an expected action. Error messages notify the user about an error and explain what went wrong.

**Variants:**
- Inline text input error
- Multiple inputs error (flagged in the source as "not used?" — verify before relying on this variant)
- Section error banner
- Section warning banner
- Error toast
- Error page (full width)
- Error dialog, and Error dialog with CTA (for error 401)

**When to use / when not to use:**
- Priority hierarchy, from lowest to highest: Toast (low priority, optional — disappears automatically) → Section message (prominent, medium priority, optional — user has to take the info into consideration) → Full width message (high priority, optional — remains until dismissed by the user or until the underlying state is resolved) → Dialog (highest priority, required — blocks app usage until the user takes an action or exits, if available).
- Inline text input error — use whenever front-end validation is possible.
- Multiple inputs error — use for multiple errors before form submission, when there are multiple inputs with errors, shown in one place.
- Section error banner — use for errors triggered on form submission, and when there are multiple errors that are hard to spot at first glance.
- Section warning banner — use to notify users about consequences they might not expect.
- Error toast — use for system errors that aren't caused by the user, and for errors the user can't fix themselves.
- Error page — use for pages that can't be accessed due to permission restrictions.
- Error dialog — use to notify the user that we're aware of an error, with a suggested solution (e.g. reload the page, or contact FinLink support).
- Error dialog with CTA — use specifically for error 401, when the user can't do anything else in the app and needs to log in again.

**Do's**
- Make error messages explicit and visible: highly noticeable, indicating which element or section needs to be fixed, placed as close to the faulty element as possible.
- Keep error messages brief and specific: explain what went wrong without being overly technical, and focus on the action the user can take to fix it.
- Keep the inline input error as short as possible, since space is limited.
- Validate an input once the user is done typing and moves focus away from it.
- For an input that already shows an error, validate it after every keystroke.
- Keep the submit button disabled until all errors from a multiple-inputs error are corrected.
- Show the section error banner in a visible part of the section that has the error.
- If there are multiple errors, show a list of all the wrong inputs in the section error banner.
- Place the section warning banner close to the input, or at the top of the section, if it relates to multiple inputs.

**Don'ts**
- Don't put an inline input error next to every field when using the multiple-inputs-error pattern.
- Don't show the section error banner when there's only one input with an error — use the inline input error instead.
- Don't show the section error banner for an input that just needs standard validation.

## Forms
**Purpose:** A form displays a set of related user input fields in a structured way. A form can consist of inputs, checkboxes, radio buttons, and dropdowns. A form is saved and validated on button click.

**Variants:**
- Dialog form
- Page form
- Side drawer form

**When to use / when not to use:**
- Side drawer form — use when there are too many inputs to fit into a dialog/pop-up.

**Props / API:**
- Long page forms use a named, reusable layout triple in code: a left-side menu, a content area, and a bottom bar (`fl-loan-applications-left-menu` / `-content` / `-bottom-bar`).

**Do's**
- Open a dialog form inside a dialog, making all other information unavailable until the user confirms or cancels.
- Show one input per line in a dialog form.
- Use a fixed footer with Save/Discard changes buttons if the dialog doesn't fit on one screen.
- Show multiple inputs per line in a page form.
- Group a page form's inputs into separate cards by topic (e.g. Application Details).
- Add left-side navigation to a page form once it becomes too long, to help the user navigate through it.
- Use a fixed footer in a page form to show autosave status, with a Discard button that appears only when there are validation errors — this is not a manual Save/Discard pair; changes autosave, there's no explicit Save button on this footer.
- Place 2 inputs per row, next to each other, in a side drawer form.
- Use subheaders to divide a side drawer form's inputs into sections.
- Use a fixed footer in a side drawer form if its content doesn't fit on the first screen.

## Open in a new tab vs. same tab
**Purpose:** We generally don't allow opening a page in a new tab, since this is a single-page app and having multiple tabs open at once can cause it to crash for the user.

**When to use / when not to use:**
- Open in a new tab: the Document Centre (confirmed in code).
- Open in a new tab: an Offer (documented rule — a current implementation for this wasn't found in code at last check; verify before relying on it).
- Open in the same tab: every other module (the default rule).
- Known/possible exceptions to be aware of: Accounting > Invoices lets a newly created invoice be opened in a new tab (confirmed in code) — don't treat this as a pattern to replicate elsewhere. A previously-documented My Day/ToDo exception (opening a loan application in a new tab) wasn't found in code at last check — it may have been removed since, or the code location wasn't locatable; verify before assuming it still exists.

**Props / API:**
- The same-tab/new-tab rule is centrally enforced through one helper (`UrlHelper.windowOpen()`), used at every intentional new-tab opening; normal in-app links use standard router navigation instead. Route new intentional "open in new tab" cases through this helper rather than a raw `window.open()`.

**Do's**
- Open the Document Centre in a new tab.
- Open every other module in the same tab.
- Keep navigation history (including filters), so the advisor can navigate forward and back through the app.

**Don'ts**
- Don't open a page in a new tab by default — this is a single-page app, and multiple open tabs can cause it to crash for the user.

## Navigation
**Purpose:** Navigation enables users to move through an app.

**Variants:**
- Top navigation — accessible from everywhere in the app; lets the user access important information or settings.
- App navigation — always visible; lets the user navigate through the app's modules via a navigation drawer; the module the user is currently in is highlighted, and each module has its own icon.
- Side navigation — see the dedicated Side Navigation component.
- Tab navigation — see the dedicated Tabs component.
- View switcher — see the dedicated View switcher component; used to depict the same information in different styles (e.g. the loan applications page).

**Do's**
- Use the view switcher inside cards to switch between different views.
- Use the view switcher on top of the page to switch views.

## Saving
**Purpose:** Saving patterns across the app.

**Do's**
- Save the user's filter selection when they leave a page, so it persists if they navigate back and forth between pages or switch modules.
- Show a toast success notification once the user closes a pop-up after saving a new item.
- Show an "unsaved changes" bar with Change/Discard actions when the user has multiple entries in a form (e.g. application details) — in code this bar shows autosave status rather than a manual Save action; see the Forms pattern for detail.

**Props / API:**
- Autosave is implemented generically via `FormsCacheService`, covering roughly 20 form sections across the Loan Application Details v2 forms — not limited to "Offers" as earlier docs suggested; no autosave implementation was found specifically under `offers/**`. Reuse `FormsCacheService` for new form sections that need autosave, rather than the Offers pages as a reference.

## Search
**Purpose:** Search allows the user to find an object by name or data point inside the app.

**Variants:**
- Module search — top-level search for a module (e.g. Loan applications list).
- Search inside the tab
- Search inside the card/table
- Search in dropdown
- Searchable input

**When to use / when not to use:**
- Module search — place it on top, next to the module name (e.g. Loan applications list); place it below the module name instead when there's tab navigation (e.g. Lead Shop).
- Search in dropdown — use for dropdowns like Team or Source in productivity reporting.
- Searchable input — use for long lists where the user already knows the name in advance (e.g. country, advisor, bank search).

**Do's**
- Use a search input for search.
- Make the clear-field option available as soon as the user starts typing.
- Update results dynamically — don't require the user to press Enter. Note: the Loan Applications List module search is a known exception in the current code (it only searches on Enter/click) — treat this as a bug to fix, not a pattern to copy.
- Clear the search filter only when the user explicitly removes the text or clicks the clear icon.
- Show search results immediately as the user types, without requiring confirmation.
- Use a skeleton loader while the search results are updating.
- Sort table rows according to the search request.
- Place the search inside a card or table on top of it.
- Place a dropdown's search field on top of the dropdown.

**Don'ts**
- Don't put search inside the table header.

**Props / API:**
- Three of the search variants above (module search, search inside a card/table, search in dropdown) are implemented via one generic list/table wrapper component (`fury-list`) in code — not three separate implementations. When building a new instance of any of these, check whether `fury-list` already covers it before writing a bespoke search.

## Table
**Purpose:** The standard table component, built on AG Grid, used across the app.

**Variants:**
- Full table page pattern (all elements combined)
- Core FL Grid Table
- Table page pattern

**Props / API:**
- Table core: AG Grid, with adjustable column widths, switchable columns, sorting, a skeleton loader, and quick actions.
- Most tables use only a combination of these elements, not all of them, but each element should only appear in its established area on the page.
- A legacy, non-AG-Grid table component also exists in code (with its own API, including calculated/summary rows) and coexists with the AG-Grid table — use the AG-Grid table for new work; only touch the legacy one when maintaining existing pages built on it.

**Do's**
- Use left text alignment for regular table text.
- Use right alignment for value columns.
- Scroll the table vertically within itself, not the page.
- Give the table's card a white page background.
- Give the table a flexible height and width.
- Include pagination on every table, except in rare exceptions — even when the table is empty.
- Scroll the table vertically when it has more rows than fit the visible space.
- Keep pagination fixed as the last row of the table.
- Keep the header fixed at the top of the table.
- Scroll the table horizontally when it has more columns than fit the visible space.
- Show an empty-box illustration with explanatory text when a table has no data (e.g. "There are no loan applications to display").
- Use a Light neutral/200 background for the row rollover (hover) state.
- Support the following cell content types: tick boxes, flat link text, icons, tags, status tags, ToDos, bank logos, bank logo + name, icon buttons, text buttons, primary buttons, secondary buttons, advisor profile pictures, tooltips, regular text, and bold text.
- Keep all table rows white, with only the header shown in grey.
- If a table has only one row of data, keep the rest of the table white.
- Use a skeleton loader animation while the table is loading.

**Don'ts**
- Don't align numbers to the left.
- Don't let the table scroll unless it needs to.

**States:** Default row, Rollover/hover (Light neutral/200 background), Empty (illustration + explanatory text), Loading (skeleton).

## Toggle vs Checkbox
**Purpose:** Use this page to decide between a toggle, a radio button, and a checkbox.

**When to use / when not to use:**

| | Radio Buttons | Checkboxes | Single Checkbox | Toggle Switches |
|---|---|---|---|---|
| How many options are available? | Multiple | Multiple | 1 | 1 |
| How many selections can the user make? | 1 | 0 – all | 2 (on/off) | 2 (on/off) |
| Is there a default option? | Yes | No | Yes | Yes |
| How would you describe the choices? | Mutually exclusive | Independent of each other | Mutually exclusive | Mutually exclusive |
| When does the selection take effect? | After the user clicks a submit button | After the user clicks a submit button | After the user clicks a submit button | Immediately |
