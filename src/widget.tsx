import { createRoot } from "react-dom/client";
import SavingsCalculator from "./components/SavingsCalculator";
import "./index.css";

// Function to initialize the widget
function initSavingsCalculatorWidget() {
  // Look for element with the data-savings-calculator id
  const container = document.getElementById("data-savings-calculator");

  if (container && !container.hasChildNodes()) {
    const root = createRoot(container);
    root.render(<SavingsCalculator />);
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSavingsCalculatorWidget);
} else {
  initSavingsCalculatorWidget();
}

// Export for manual initialization
(window as any).initSavingsCalculatorWidget = initSavingsCalculatorWidget;

export default SavingsCalculator;
