# Vedvarya — Color Palette (Light Theme)

---

## Palette

| Role                      | Name      | Hex       |
| ------------------------- | --------- | --------- |
| Page background           | Parchment | `#F9F5EE` |
| Card / section background | Cream     | `#F0E8D6` |
| Primary button            | Deep Gold | `#9D783B` |
| Primary button hover      | Warm Gold | `#CAA45C` |
| Secondary button          | Charcoal  | `#1A1008` |
| Secondary button hover    | Walnut    | `#6B4F22` |
| Heading text              | Deep Gold | `#9D783B` |
| Body text                 | Charcoal  | `#1A1008` |
| Muted / secondary text    | Walnut    | `#6B4F22` |
| Links & accents           | Warm Gold | `#CAA45C` |
| Link hover                | Honey     | `#E8C07A` |
| Borders                   | Cream     | `#E0D3BC` |

---

## CSS Variables

```css
:root {
  /* Backgrounds */
  --bg-primary: #f9f5ee; /* page background */
  --bg-surface: #f0e8d6; /* cards, sections */

  /* Text */
  --text-primary: #1a1008; /* body text */
  --text-heading: #9d783b; /* headings */
  --text-muted: #6b4f22; /* secondary / muted text */

  /* Buttons — Primary */
  --btn-primary-bg: #9d783b;
  --btn-primary-text: #f9f5ee;
  --btn-primary-hover: #caa45c;

  /* Buttons — Secondary */
  --btn-secondary-bg: #1a1008;
  --btn-secondary-text: #f9f5ee;
  --btn-secondary-hover: #6b4f22;

  /* Accents & Links */
  --color-accent: #caa45c;
  --color-accent-hover: #e8c07a;

  /* Borders */
  --color-border: #e0d3bc;
}
```

---

## Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        parchment: "#F9F5EE",
        cream: "#F0E8D6",
        "deep-gold": "#9D783B",
        "warm-gold": "#CAA45C",
        honey: "#E8C07A",
        walnut: "#6B4F22",
        charcoal: "#1A1008",
        border: "#E0D3BC",
      },
    },
  },
};
```
