# Design System Strategy: The Midnight Pulse

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Venue."** 

We are not building a static website; we are architecting a premium, high-octane digital environment that mirrors the atmospheric depth of a world-class techno club. The design rejects the "template" look of standard link-in-bio tools by embracing **Dark Editorial Minimalism**. This means high-contrast typography scales, intentional asymmetry that mimics the movement of light in a dark room, and a depth model built on tonal layers rather than structural outlines. The "Disco, Soul, and Love" aspect is injected through subtle, vibrant gradients and "laser" accents that slice through the deep black canvas.

## 2. Colors
Our palette is rooted in the absence of light, using varying degrees of "Night" to create a sense of infinite space.

### Surface Hierarchy & Nesting
To achieve a signature look, we prohibit the use of 1px solid borders for sectioning. Boundaries are defined solely through background color shifts or tonal transitions.
- **Base Layer:** `surface` (#131313) for the main background.
- **Sectioning:** Use `surface_container_low` (#1B1B1B) to define secondary content areas. 
- **Component Level:** Use `surface_container` (#1F1F1F) or `surface_container_high` (#2A2A2A) for nested cards or interactive modules.
- **The "No-Line" Rule:** Never use a solid border to separate a card from its background. Instead, place a `surface_container_highest` element onto a `surface` background to create a crisp, sophisticated edge through tonal contrast alone.

### Signature Textures & Accents
- **The Neon Slice:** Use `secondary` (#FFB2B8) and `tertiary_fixed_dim` (#00DBE9) sparingly as 1px "laser" accents—either as a top-border on a container or a subtle glow behind a primary element.
- **The Soul Gradient:** Main CTAs or Hero sections should utilize a linear gradient transitioning from `surface_container_highest` (#353535) to a semi-transparent `primary` (#FFFFFF at 5% opacity). This provides a "brushed metal" or "satin" finish that feels bespoke and professional.

## 3. Typography
The system utilizes a dual-font strategy to balance industrial techno vibes with soulful clarity.

- **Headline & Display:** **Space Grotesk** is our structural backbone. It is modern, clean, and has a rhythmic, geometric quality that feels "techno." Use `display-lg` for impactful hero statements and `headline-md` for section titles to command attention.
- **Body & Labels:** **Inter** is used for all functional text. Its neutrality ensures readability against high-contrast backgrounds.
- **Intentional Scale:** We utilize extreme contrast in type sizes. A `display-lg` headline paired directly with a `label-md` sub-header creates an editorial look that feels high-end and curated.

## 4. Elevation & Depth
In "The Digital Venue," depth is an atmospheric experience, not a drop-shadow.

- **Tonal Layering:** Depth must be achieved by "stacking" the surface-container tiers. Place a `surface_container_highest` (#353535) card on a `surface` (#131313) background to create a soft, natural lift.
- **Ambient Shadows:** When a floating effect is required (e.g., for a "Live Now" modal), use a shadow with a blur of 40px+ at 6% opacity, tinted with `primary` (#FFFFFF). This mimics light dispersion in a hazy room.
- **Glassmorphism:** For top navigation or floating action bars, use `surface_container_low` with a 20px `backdrop-blur` and 60% opacity. This allows the "laser" accents and background gradients to bleed through, integrating the UI into the environment.
- **The Ghost Border:** For high-density layouts where accessibility is a concern, use the `outline_variant` token at 15% opacity. This creates a "suggestion" of a boundary without breaking the dark, immersive flow.

## 5. Components

### Buttons
- **Primary:** `primary` (#FFFFFF) background with `on_primary` (#2F3131) text. Shape: `rounded-md`. Apply a subtle `secondary` (#FFB2B8) outer glow on hover to represent the "Disco" energy.
- **Secondary:** Transparent background with a `Ghost Border` (outline-variant at 20%). On hover, fill the background with `surface_container_highest`.
- **Tertiary:** Text-only, using `title-sm` typography with an underline that only appears on hover.

### Cards & Lists
- **The DJ Card:** Used for track listings or event dates. Forbid the use of divider lines. Separate items using `spacing-6` vertical white space.
- **Interactive State:** Upon hover, a card should shift from `surface_container_low` to `surface_container_high`. No movement, just a tonal pulse.

### Inputs & Chips
- **Inputs:** Use `surface_container_lowest` for the field background to create an "etched" look into the surface.
- **Selection Chips:** Use `secondary_container` (#FF506E) for active states to provide the "Laser/Neon" punch against the dark theme.

### Signature Component: The "Pulse" Indicator
A small, glowing dot using `tertiary_fixed_dim` (#00DBE9) with a multi-layered soft shadow (20% opacity) to indicate live sets, new releases, or active status.

## 6. Do's and Don'ts

### Do
- **Do** use `spacing-16` or `spacing-20` for section margins to give the content "breathing room" reminiscent of high-end fashion editorials.
- **Do** use `primary` (#FFFFFF) text for headlines but drop to `on_surface_variant` (#C4C7C8) for body text to reduce eye strain and establish hierarchy.
- **Do** overlap elements slightly (e.g., an image bleeding into a text container) to break the rigid grid and add kinetic energy.

### Don't
- **Don't** use 100% opaque white borders. They shatter the atmospheric depth of the dark mode.
- **Don't** use standard "drop shadows" (black, high opacity). They look muddy on dark backgrounds.
- **Don't** use icons as purely decorative elements. Every icon must serve a functional purpose to maintain the minimalist Techno aesthetic.
- **Don't** use sharp corners. Stick to the `md` (0.375rem) or `lg` (0.5rem) roundedness scale to keep the "Soul and Love" feeling in the UI.