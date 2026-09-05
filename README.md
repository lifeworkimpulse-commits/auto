# Brockley Rise MOT — website redesign concept

An original, responsive English-language website in HTML, CSS and vanilla JavaScript. No framework, npm dependencies, build step, external fonts, stock images, trackers or API keys.

## Pages
- `index.html` — home, interactive MOT class/price selector, service overview and opening hours.
- `services.html` — Basic / Full service options, repairs, diagnostics and R134a air-conditioning information.
- `mot.html` — Class 4 / Class 7 MOT information, prices, GOV.UK link and FAQs.
- `contact.html` — contact details, hours, enquiry email builder and prototype privacy explanation.
- `styles.css` and `app.js` — shared styling and behaviour.

## Run locally
Open `index.html`, or serve this folder:

```sh
python3 -m http.server 8080
```

Then visit http://localhost:8080. All internal links are relative, including when hosted under a GitHub Pages repository subdirectory.

## Enquiry behaviour — read before sharing
There is NO backend and no automatic booking. The form validates fields and creates a reviewable email. Only the visitor's separate click on **Open email app** opens a `mailto:` draft. The visitor must send it through their mail software. **Copy message** includes a fallback if clipboard permission is unavailable.

No enquiry data is stored by this prototype. Design preference is stored in browser localStorage. No test emails or enquiries were sent during development.

## Design system
Default: Workshop — warm paper `#f7f5ef`, charcoal `#252b27`, orange `#c83d24`, pale green ticket `#e3e8dc`; industrial condensed display type and Trebuchet body. This is a proposed identity, not claimed to be an approved brand guide.

The footer includes **Explore design directions**, which switches all pages between:
1. Workshop: offset price ticket and bold sign-like typography.
2. Technical: dark instrumentation, monospace headings and reversed desktop hero composition.
3. Neighbourhood: editorial serif, open price composition and a two-column service index.

Original photography and the approved logo could not be retrieved. The site deliberately uses the business name as text and a typographic price panel instead of fabricating workshop photographs, staff or a logo. Supply approved assets before a live launch if imagery is wanted.

## Fact sources
Checked against publicly accessible pages on 5 September 2026:
- https://www.brockleyrisemot.co.uk/ — address, telephone, services, published Class 4 £45 / Class 7 £50 prices.
- https://www.brockleyrisemot.co.uk/service — service inclusions, OEM-quality parts, diagnostic scan, road test and price variables.
- https://www.brockleyrisemot.co.uk/mot — MOT classes and advertised re-test offer. Conditions must be confirmed by the garage.
- https://www.brockleyrisemot.co.uk/contact-us — hours and business email `brockleyrisemot@gmail.com`.
- https://www.gov.uk/check-mot-history — external official MOT history service.

Saturday closing time **12:40pm** is reproduced from the source, not assumed to be a typo. Please verify it with the owner. All prices and business claims require owner confirmation before launch. No testimonials, review scores, staff biographies, guarantees or business metrics have been invented.

## Launch checklist
- Obtain business-owner approval for this independent redesign and the final copy.
- Confirm contacts, hours, prices, service inclusions and re-test conditions.
- Add authorised brand assets if required.
- Decide whether to retain the explicit email-draft flow or integrate a real, tested backend.
- For a backend: add server validation, abuse protection, secure secret storage, delivery monitoring and appropriate privacy/retention information. Never place API secrets in front-end JavaScript.
- Replace the prototype notice/privacy wording and implement the live site's necessary notices.
- `robots.txt` and HTML robots meta currently discourage indexing of the unapproved concept. Remove these only after approval; robots is not access control.
- No GitHub Pages deployment or replacement of the existing live site is enabled automatically.

## Accessibility and privacy
Semantic HTML, native labels and validation, keyboard-visible focus, mobile menu with Escape handling, no required motion, reduced-motion support, and visible explanations of email-draft behaviour. The site remains readable with JavaScript disabled; the email builder then provides direct contact alternatives.

See `QA.md` for checks performed. This is a working static front-end prototype, not a production enquiry-processing service.
