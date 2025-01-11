import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import type { ContentScriptContext } from "wxt/client";
import "@/assets/globals.css";
import "@/node_modules/sonner/dist/styles.css";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",

  async main(ctx) {
    console.log("[content/index.tsx] Content script loaded!");

    const ui = await createUi(ctx);
    ui.mount();

    console.log("[content/index.tsx] UI mounted!");
  },
});

function createUi(ctx: ContentScriptContext) {
  return createShadowRootUi(ctx, {
    name: "my-cool-app",
    position: "overlay",
    anchor: "body",
    append: "first",
    onMount: (_container, shadowRoot) => {
      const app = document.createElement("div");
      shadowRoot.append(app);

      const root = ReactDOM.createRoot(app);
      root.render(<App />);
      return root;
    },
  });
}
