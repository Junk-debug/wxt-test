export enum Messages {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
}

export type MessageListener = (
  message: { type: Messages },
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => void;

export const sendMessageToContentScript = async ({
  type,
}: {
  type: Messages;
}) => {
  const [tab] = await browser.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id!, {
    type,
  });

  console.log(response);
};
