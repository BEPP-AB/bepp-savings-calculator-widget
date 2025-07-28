# Savings Calculator Widget

A responsive React savings calculator widget designed to be embedded in the Bepp Webflow site. Built with React, TypeScript, and Tailwind CSS.

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) to see the widget in development mode.

## Deployment

Build the widget for deployment:

```bash
npm run build
```

This creates optimized files in the `dist/` directory:
- `savings-calculator-widget.iife.js` - The main widget file (hosted via jsDelivr CDN)

The widget is automatically available via CDN at (the latest version pushed to main remote):
`https://cdn.jsdelivr.net/gh/BEPP-AB/bepp-savings-calculator-widget@main/dist/savings-calculator-widget.iife.js`

**Note**: After making changes, you need to:
1. Run `npm install` (if you added new dependencies)
2. Run `npm run build`
3. Commit and push to GitHub
4. The CDN will automatically update (may take a few minutes, if needed, purge the CDN cache at https://www.jsdelivr.com/tools/purge)

## Webflow Integration

Note that this has already been done on bepp.se

### Step 1: Add the Code Embed Block

1. In Webflow, drag a **Code Embed** element to where you want the calculator to appear
2. In the Code Embed Editor, add the following HTML:

```html
<div id="data-savings-calculator"></div>
<script src="https://cdn.jsdelivr.net/gh/BEPP-AB/bepp-savings-calculator-widget@main/dist/savings-calculator-widget.iife.js"></script>
```

### Complete Setup

That's it! The widget will automatically load and render in the div with `id="data-savings-calculator"`. The Code Embed block contains both the container div and the script, making it a single-step integration.

## Widget Customization

The widget is built with Tailwind CSS and automatically scoped to avoid conflicts with your site's styles. You can customize the appearance by:

1. Modifying the Tailwind configuration in `tailwind.config.js`
2. Updating the component styles in `src/components/SavingsCalculator.tsx`
3. Adding custom CSS targeting elements within `#data-savings-calculator`

### Styling Override Example

You can override widget styles in Webflow's Custom CSS:

```css
/* Override widget background and colors */
#data-savings-calculator .bg-white {
    background-color: #f8f9fa !important;
}

#data-savings-calculator .bg-primary-600 {
    background-color: #059669 !important;
}

#data-savings-calculator .text-primary-500:focus {
    border-color: #10b981 !important;
}
```