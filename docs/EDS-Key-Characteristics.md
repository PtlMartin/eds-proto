# Edge Delivery Services (EDS) — Key Characteristics

A clean synthesis of the core characteristics of EDS, structured for documentation, slides, or architecture decision records. Conceptual + practical, not tutorial-level.

---

## 1. Block Creation & Configuration

### 1.1 Block Concept

- **Block** = unit of functionality, similar to an AEM component
- Blocks are **frontend-driven**, not server-rendered
- No Sling, no HTL, no resource types

### 1.2 Authoring Model (Table-based)

- Every block is authored as a **table**
- The table acts as:
  - A data structure
  - A configuration contract
- **Rules:**
  - Table header = block name
  - Table rows = configuration / content
  - Tables are temporary and transformed at runtime

### 1.3 Rendering Model

- EDS automatically:
  - Converts tables → `<div class="block {name}">`
  - Loads `/blocks/{name}/{name}.js`
  - Loads `/blocks/{name}/{name}.css`
- Block JS exposes:

```js
export default function decorate(block) {}
```

- **decorate():**
  - Reads table data
  - Transforms the DOM
  - Optionally fetches backend data

### 1.4 Variants

- Variants are defined via table header suffix:
  - `Teaser (highlight)`
- Rendered as CSS classes:
  - `.teaser.highlight`
- No dialog or policy system

---

## 2. Data Fetching & Backend Integration

### 2.1 Frontend-first Data Access

- All data fetching is done in block JS
- Uses standard `fetch()` API
- `decorate()` can be `async`

### 2.2 Backend Agnostic

EDS does not care where data comes from:

- AEM Content Fragments (GraphQL)
- PIM systems
- Custom REST APIs
- Static JSON

Blocks consume **JSON contracts**, not HTML.

### 2.3 Content vs Block Separation

- Blocks do **not** own endpoints
- Endpoints belong to content domains
- Same endpoint can serve:
  - Multiple blocks
  - Multiple pages
  - Multiple sites

### 2.4 Dynamic Blocks (Query Blocks)

- Blocks can act as **queries**, not content holders
- Authoring config defines:
  - IDs
  - Tags
  - Limits
  - Sorting
- **Example:**

  | Teaser           |
  |------------------|
  | tag:news limit:3 |

- Block fetches and renders dynamic lists

---

## 3. Authoring Experience

### 3.1 Simplicity

- One authoring primitive: **tables**
- No dialogs, no nested forms
- Low learning curve once concept is understood

### 3.2 Blocks Library

- Blocks menu is driven by:
  - `/docs/library/blocks`
- One page per block template
- Block definition pages provide:
  - Default table structure
  - Authoring guidance

### 3.3 Trade-offs

- Less WYSIWYG than traditional AEM
- More structured, less layout freedom
- Requires author training

---

## 4. Architecture & Scalability

### 4.1 Decoupled Architecture

- Authoring ≠ Rendering
- Backend ≠ Frontend
- Blocks are reusable across sites

### 4.2 Multi-site Ready

- Designed for:
  - Shared blocks
  - Shared content models
  - Central governance
- Ideal for dozens of sites (e.g. 70+)

### 4.3 Performance

- CDN-first
- Minimal runtime logic
- Client-side rendering with optimized assets

---

## 5. Governance & Maintainability

### 5.1 Convention over Configuration

- Naming conventions replace configuration files
- Predictable structure
- Easy onboarding for developers

### 5.2 Strong Content Discipline Required

- Content models must be well-defined
- Editors must follow block patterns
- Poor modeling leads to fragile blocks

---

## 6. When EDS Is a Good Fit

EDS is a strong solution if:

- Content is structured (CF, APIs)
- Frontend teams own rendering logic
- You need high performance at scale
- You manage many sites
- You accept a less visual authoring experience

---

## 7. When EDS Is NOT a Good Fit

EDS is not ideal if:

- You rely heavily on Sling Models
- Page-level business logic lives in AEM
- Authors need pixel-perfect WYSIWYG editing
- Permissions drive rendering logic

---

## 8. EDS in One Sentence

**EDS is a table-authored, block-based, frontend-rendered system designed for scalable, high-performance, multi-site content delivery.**

---

## Next Steps (Optional)

This document can be:

- Converted into slides
- Condensed into a 1-page executive summary
- Used as the basis for a comparison table: Traditional AEM vs EDS
- Tailored for technical vs non-technical audiences
