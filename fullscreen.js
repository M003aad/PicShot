function takeFullscreen() {
  chrome.tabs.captureVisibleTab(
    null,
    { format: "png" },
    (dataUrl) => {
      chrome.downloads.download({
        url: dataUrl,
        filename: "screenshot.png",
        saveAs: true
      });
    }
  );
}
