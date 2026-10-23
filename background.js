importScripts("fullscreen.js");

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.action === "FULLSCREEN") {
    takeFullscreen();
  }

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
      filename: msg.filename || "screenshot.png",
      saveAs: true
    });
  }
});
