# Shreeram N S — Developer Portfolio

## Session brief

Use this file to continue the portfolio work in a new Codex session. Start by reading this brief and inspecting the current project before changing the design.

### What we are building

A distinctive, award-caliber personal portfolio for Shreeram N S, a software engineer. The site should communicate his strengths through selected, real projects and professional experience. The visual direction should be memorable and art-directed, with strong typography, animated components, purposeful motion, and expressive backgrounds. React Bits is the component inspiration and source library.

The ambition is a portfolio other engineers may reference for its craft, while the identity and content remain unmistakably Shreeram's.

Build this as a real React site, not a basic static HTML/CSS/old-school JavaScript page. Avoid generic portfolio templates and invented achievements.

### Main agenda

1. Review Shreeram's public GitHub repositories and shortlist suitable full-stack or other projects. Record each project's purpose, stack, role, working demo, and verifiable impact. Do not feature confidential employer work.
2. Confirm the portfolio content with Shreeram before presenting it as fact.
3. Agree on the functional requirements and the visual direction before building more than the current scaffold.
4. Select a small set of React Bits components that support the chosen direction, install them as editable source, and adapt them to the site.
5. Build and refine the responsive portfolio, then use Playwright MCP to check real browser behavior and layouts.

### End-to-end build plan

The inspiration site will guide the mood and craft, but its content, layout, and identity will not be copied. The portfolio will be designed around Shreeram's own work and built from a fresh composition using selected React Bits source components plus custom React code where needed.

#### Phase 1 — Study the reference

When Shreeram shares the URL, inspect its typography, composition, color, transitions, backgrounds, and interaction pacing. Note which specific qualities he likes. Translate those into design principles rather than reproducing its branding or page structure.

#### Phase 2 — Research the portfolio material

Review the public GitHub repositories, identify strong projects, and capture only verifiable details: what each project does, Shreeram's contribution, tech choices, demo/repository links, and measurable outcomes if available. Collect missing profile details and confirm what may be public.

#### Phase 3 — Agree on requirements and art direction

Confirm the audience, the main impression the site should leave, its primary call to action, required sections, and desired interactions. Then propose a distinct visual system: named colors, typefaces and roles, spacing/layout rules, motion principles, and a rough page wireframe. Review this plan against the reference and portfolio content before coding.

#### Phase 4 — Curate React Bits components

For each candidate component, identify the section and purpose it serves, check its React/styling variant and dependencies, and decide whether its animation is useful on this site. Install only the components that support the approved design. Adapt their styling, behavior, and content to the portfolio; write custom components when the library does not fit.

#### Phase 5 — Build in deliberate passes

1. Establish the page structure, responsive grid, design tokens, navigation, and hero.
2. Build selected project showcases and supporting about, experience, education, skills, and contact sections using confirmed content.
3. Add a small number of purposeful motion moments, hover/interaction states, and animated backgrounds.
4. Refine typography, spacing, mobile behavior, accessibility, reduced-motion behavior, loading performance, and page metadata.

#### Phase 6 — Review in a browser and refine

Use Playwright MCP to inspect the live page at desktop, tablet, and mobile sizes. Check navigation and links, keyboard access, reduced-motion behavior, console errors, and major visual issues. Fix the highest-impact problems, then repeat until the page feels coherent and polished.

#### Phase 7 — Prepare to publish

Confirm every public detail and link with Shreeram, add final metadata/social preview, and document the chosen deployment steps. Do not publish or deploy until Shreeram asks.

### Details Shreeram has shared

- Current role: Software Engineer at Morgan Stanley.
- Professional experience: about 9 months, as stated by Shreeram.
- Developer journey began in 2021.
- GitHub profile shared in chat: <https://github.com/shreeramns>.
- Education, location, LinkedIn, confirmed public email, detailed job dates, and resume are still needed.
- The email currently present in `src/App.jsx` has not been confirmed. Verify it before publishing.
- Never include Morgan Stanley internal information, client data, or confidential work examples.

### Functional requirements to confirm

Draft scope for discussion:

- Introduction and clear contact action.
- About/profile section.
- Selected projects with descriptions, technologies, GitHub links, and live demos when available.
- Experience and education.
- Skills/technologies grounded in the reviewed repositories and confirmed work history.
- Links for GitHub, LinkedIn, email, and optionally a downloadable resume.
- Responsive navigation and working links.
- Decide with Shreeram whether to add project filters, a theme toggle, a contact form, or other interactive features.

### Nonfunctional requirements

- Responsive from mobile through wide desktop layouts.
- Accessible semantics, keyboard interactions, focus states, and sufficient contrast.
- Respect `prefers-reduced-motion`; animations must not block reading or navigation.
- Keep animation and media performance reasonable, with graceful fallbacks.
- Good metadata, page title, description, and social preview basics.
- Maintainable React components and styles; avoid unnecessary dependencies.

### Current project state

- Stack: React 19, Vite, Tailwind CSS 4, Framer Motion, GSAP, and Lucide React.
- `src/App.jsx` is a minimal hero scaffold; the full portfolio is not built yet.
- `components.json` already registers React Bits at `https://reactbits.dev/r/{name}.json`.
- No React Bits components have been selected for the portfolio yet. Add components as source through the shadcn CLI after choosing them.
- `MCP_SETUP.md` describes the React Bits and browser-testing setup.
- `.codex/config.toml` contains the project-scoped shadcn MCP server. Codex needs a trusted project and a reload/new session to load it.
- Playwright MCP is registered in Codex for browser verification.
- Do not install Python for this portfolio. Python-dependent Mem0 automation is out of scope for now; use this README to carry project context between sessions.

### Agent/design tools

Project skills are under `.agents/skills/`: `frontend-app-builder`, `frontend-design`, `impeccable`, `webapp-testing`, and `gpt-taste`. `gpt-taste` is opt-in; invoke it by name when appropriate. Keep the final design accessible, responsive, and consistent with the project's requirements.

### Start locally

```sh
npm install
npm run dev
```

### References

- React Bits components: <https://reactbits.dev/>
- React Bits repository: <https://github.com/DavidHDev/react-bits>
- React Bits installation: <https://reactbits.dev/get-started/installation>
- Shreeram's GitHub: <https://github.com/shreeramns>
- MCP setup notes: [MCP_SETUP.md](./MCP_SETUP.md)
