chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.action === "AREA_START") {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: (imgData) => {
            window.fullscreenImageData = imgData;
          },
          args: [dataUrl]
        }).then(() => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
          });
        });
      });
    });
  }

  if (msg.action === "DOWNLOAD") {
    chrome.downloads.download({
      url: msg.url,
      filename: msg.filename || "area-screenshot.png",
      saveAs: true
    });
  }
});

function cropAreaMessageHandler(msg) {
  if (msg.action === "DOWNLOAD") {
    chrome.downloads.download({
      url: msg.url,
      filename: msg.filename || "area-screenshot.png",
      saveAs: true
    });
  }
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "AREA_START") startAreaCapture();
  if (msg.action === "DOWNLOAD") cropAreaMessageHandler(msg);
});
