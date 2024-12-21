import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import type { ContentScriptContext } from "wxt/client";
import "@/assets/globals.css";
import "@/node_modules/sonner/dist/styles.css";

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    const ui = await createUi(ctx);
    ui.mount();
  },
});

function createUi(ctx: ContentScriptContext) {
  return createShadowRootUi(ctx, {
    name: "tailwind-shadow-root-example",
    position: "overlay",
    anchor: "body",
    append: "first",
    onMount: (container, shadowRoot) => {
      const app = document.createElement("div");
      shadowRoot.append(app);

      const root = ReactDOM.createRoot(app);
      root.render(<App />);
      return root;
    },
  });
}
