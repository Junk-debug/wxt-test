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
    let isMounted = false;

    chrome.runtime.onMessage.addListener(async function (
      request,
      sender,
      sendResponse
    ) {
      console.log(request, "request");

      if (request.type === "START") {
        if (isMounted) {
          console.log("[content/index.tsx] App is already mounted");
          return;
        }

        console.log("[content/index.tsx] Mounting app", ui);
        ui.mount();
        isMounted = true;
      }

      if (request.type === "CLOSE_APP") {
        if (!isMounted) {
          console.log("[content/index.tsx] App is not mounted");
          return;
        }

        console.log("[content/index.tsx] Unmounting app");
        ui.remove();
        isMounted = false;
      }
    });
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
