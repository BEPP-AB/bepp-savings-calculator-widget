import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/widget.tsx"),
      name: "SavingsCalculatorWidget",
      fileName: "savings-calculator-widget",
      formats: ["iife"], // Immediately Invoked Function Expression for easy embedding
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
    cssCodeSplit: false, // Bundle CSS with JS for easier embedding
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
