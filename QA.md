# QA — 5 September 2026

## Passed
- Real Chromium rendering of all four pages at desktop and mobile widths.
- Desktop: 1440px. Mobile: 390px for Home, Services and MOT; 320px stress test for Contact.
- Browser diagnostics reported no horizontal overflow, clipped content, JavaScript exceptions or failed resources in these captures. Font loading completed.
- 57 local links / anchors resolve to existing files and IDs.
- JavaScript syntax check passed (`node --check app.js`).
- MOT selector switches Class 4 / £45 to Class 7 / £50 and updates the enquiry link.
- Mobile menu open/close and Escape handler; focus returns to the menu control on mobile.
- Native service / FAQ disclosure toggles.
- Three design directions switch correctly; overflow checks passed on the tested page/viewport combinations.
- Empty form fails native validity checks. Valid test data creates a reviewable email draft.
- Registration uppercasing; service/registration appear in draft; explicit `mailto:` destination; clear not-a-confirmed-booking wording.
- Editing a field hides the stale draft until prepared again.
- Reduced-motion mode disables smooth scrolling in the tested browser.
- Core text colour-pair contrast checks: body 13.25:1, muted text 4.95:1, primary button 5.06:1, ticket note 6.46:1, footer 9.47:1, technical body 14.88:1, neighbourhood accent 6.47:1.

## Safety and limitations
- No email, telephone call or booking was submitted during testing. External mail-client delivery is NOT tested.
- Clipboard behaviour depends on browser permissions; a visible manual-copy fallback is implemented, but cross-browser clipboard support has not been certified.
- Without JavaScript, the enquiry form remains hidden to prevent accidental native GET submissions. Direct phone/email contacts and navigation remain in the HTML; a noscript message explains the alternative.
- No production backend, live domain deployment, analytics or payment processing.
- This is not a full accessibility audit, Lighthouse certification or Safari/Firefox/device-lab certification.
- Owner confirmation of hours, prices, re-test conditions and approved brand assets is still required.

## Manual acceptance steps
1. Open `index.html` or serve the folder locally.
2. Follow all four main navigation links.
3. On Home select Class 7; follow its enquiry link and confirm the service is preselected.
4. Try an empty enquiry, then complete the required fields; review the draft without sending it.
5. Use the footer's design controls and compare the three compositions.
6. At narrow widths, open the menu and press Escape.
7. Before launch, test real email delivery or a separately configured backend with the business owner's approval.
