import { Messages, sendMessageToContentScript } from "@/lib/messages";

export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });

  chrome.commands.onCommand.addListener((command) => {
    console.log(`Command "${command}" triggered`);
    if (command === "open-app") {
      console.log("Running foo");
      sendMessageToContentScript({
        type: Messages.OPEN_SIDEBAR,
      });
    } else if (command === "close-app") {
      console.log("Running close");
      sendMessageToContentScript({
        type: Messages.CLOSE_SIDEBAR,
      });
    }
  });
});
