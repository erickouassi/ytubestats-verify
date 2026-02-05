// badge.js
(function () {

  async function waitForKey() {
    return new Promise(resolve => {
      const check = () => {
        // console.log("[BADGE] Checking for userLicenseKey…", window.userLicenseKey);
        if (window.userLicenseKey) resolve(window.userLicenseKey);
        else setTimeout(check, 50);
      };
      check();
    });
  }

  async function waitForValidator() {
    return new Promise(resolve => {
      const check = () => {
        // console.log("[BADGE] Checking for __checkLicense…", typeof window.__checkLicense);
        if (typeof window.__checkLicense === "function") resolve();
        else setTimeout(check, 50);
      };
      check();
    });
  }

  const LicenseBadgeBase64 = "data:image/png;base64,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";

  async function render() {
    // console.log("[BADGE] Render started");

    const el = document.getElementById("licenseBadge");
    // console.log("[BADGE] Badge element =", el);

    if (!el) {
      // console.log("[BADGE] No badge element found — stopping");
      return;
    }

    await waitForValidator();
    // console.log("[BADGE] Validator ready");

    const key = await waitForKey();
    // console.log("[BADGE] Key ready =", key);

    const valid = await window.__checkLicense();
    // console.log("[BADGE] License valid =", valid);

    if (valid && key) {
      // console.log("[BADGE] Rendering VERIFIED badge");
      el.innerHTML = `
        <a href="https://erickouassi.github.io/ytubestats-verify/?licenseKey=${encodeURIComponent(key)}"
           target="_blank" rel="noopener noreferrer">
          <img src="${LicenseBadgeBase64}" height="32" alt="Verified License">
        </a>
      `;
    } else {
      //console.log("[BADGE] Rendering UNLICENSED message");
      el.textContent = "This installation is not licensed.";
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    //console.log("[BADGE] DOMContentLoaded fired");
    render();
  });

})();
