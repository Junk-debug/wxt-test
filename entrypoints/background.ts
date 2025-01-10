const send = async (type: "START" | "CLOSE_APP") => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  console.log(tab);
  const response = await chrome.tabs.sendMessage(tab.id!, {
    type,
  });

  console.log(response);
};

export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });

  chrome.commands.onCommand.addListener((command) => {
    console.log(`Command "${command}" triggered`);
    if (command === "open-app") {
      console.log("Running foo");
      send("START");
    } else if (command === "close-app") {
      console.log("Running close");
      send("CLOSE_APP");
    }
  });
});
