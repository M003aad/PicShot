(function startAreaSelection() {
  const old = document.getElementById("screenshot-overlay");
  if (old) old.remove();

  const overlay = document.createElement("div");
  overlay.id = "screenshot-overlay";
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "rgba(0,0,0,0.15)";
  overlay.style.cursor = "crosshair";
  overlay.style.zIndex = 999999;
  document.body.appendChild(overlay);

  let startX, startY, box;

  overlay.onmousedown = (e) => {
    startX = e.clientX;
    startY = e.clientY;

    box = document.createElement("div");
    box.style.position = "fixed";
    box.style.border = "2px dashed red";
    box.style.left = startX + "px";
    box.style.top = startY + "px";
    box.style.zIndex = 1000000;
    box.style.pointerEvents = "none"; 
    document.body.appendChild(box);

    overlay.onmousemove = (e) => {
      box.style.width = Math.abs(e.clientX - startX) + "px";
      box.style.height = Math.abs(e.clientY - startY) + "px";
      box.style.left = Math.min(e.clientX, startX) + "px";
      box.style.top = Math.min(e.clientY, startY) + "px";
    };

    overlay.onmouseup = (e) => {
      overlay.remove();
      box.remove();
      const x = Math.min(startX, e.clientX);
      const y = Math.min(startY, e.clientY);
      const w = Math.abs(e.clientX - startX);
      const h = Math.abs(e.clientY - startY);
      if (w < 2 || h < 2) return;

      const img = new Image();
      img.src = window.fullscreenImageData;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
        const croppedDataUrl = canvas.toDataURL("image/png");

        chrome.runtime.sendMessage({
          action: "DOWNLOAD",
          url: croppedDataUrl,
          filename: "area-screenshot.png"
        });
      };
    };
  };
})();
