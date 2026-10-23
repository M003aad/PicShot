document.getElementById("fullscreen").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "FULLSCREEN" });
});
document.getElementById("area").onclick = () => {
  chrome.runtime.sendMessage({ action: "AREA_START" });
};