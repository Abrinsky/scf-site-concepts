# Sioux City Foundry Co. - Redesign Concepts (Light & Executive Dark)

Live sample demos (GitHub Pages):
- **Precision Light (`SCF-1b`):** https://abrinsky.github.io/scf-site-concepts/?theme=light
- **Executive Industrial Dark (`SCF-3b`):** https://abrinsky.github.io/scf-site-concepts/?theme=dark
- **Leadership Modernization Pitch:** https://abrinsky.github.io/scf-site-concepts/modernization.html

## Important Disclaimer
- This repository is a **sample redesign concept** built for Sioux City Foundry Co. leadership review. It is **not** the official corporate website (`https://www.siouxcityfoundry.com/`).
- Copy is restricted to published public facts: 4 active divisions (Steel Warehouse, Reinforcing Steel, Contract Manufacturing, and Metal Casting Foundry), two plants (Sioux City, IA and South Sioux City, NE), verified memberships (CRSI, EIG, AFS Corporate Member), and public awards.
- Structural Fabrication (closed 2026) is not listed as a live division; Voortman beam coping and build-to-spec Sherman Tank work appear under Contract Manufacturing without ASME/DOT/API certification claims. No ISO 9001 or active Hardox/SSAB claims are made.
- Official logos and plant photos were sourced from `Abrinsky/SCF` public sample assets and remain property of Sioux City Foundry Co.

## Key Concept Upgrades
- **Dual Executive Theme Switcher:** Toggle live between **Precision Industrial Light** and **Executive Industrial Dark** (machined gunmetal surfaces, zero jarring white boxes, automatic white-paper `@media print` stylesheets).
- **Interactive Careers Center + HR Quick-Publish Preview (`careers.html` & `job.html`):** Filter roles by department, campus, shift, and keyword; direct shareable job URLs (`job.html?id=...`) with 1-click Copy Link and Print Job Sheet; plus a browser-only **HR Quick-Publish Admin drawer** showing how HR can publish/unpublish or add roles without FileMaker text boxes, Lasso 9, or Dreamweaver.
- **Interactive Stock Book Guide (`stock-book.html`):** Filterable category explorer paired with the live official `stockbook_view.pdf`.
- **Division RFQ Router (`contact.html`):** Instant desk phone & campus routing by division with clean production Cloudflare Worker + Turnstile architecture notes.
- **1-Page Modernization Pitch (`modernization.html`):** Side-by-side audit of live `siouxcityfoundry.com` technical findings vs a ~$0 to $20/mo Cloudflare Pages + Workers + CMS/D1 stack.
