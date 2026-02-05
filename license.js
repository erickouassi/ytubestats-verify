window.__checkLicense = async function () {
  // console.log("[LICENSE] Validator started");
  // console.log("[LICENSE] userLicenseKey =", window.userLicenseKey);

  const key = window.userLicenseKey;

  if (!key) {
    // console.log("[LICENSE] No key found — returning false");
    return false;
  }

  // console.log("[LICENSE] Fetching license data…");

  const response = await fetch("https://gist.githubusercontent.com/erickouassi/e6bdb0c49657bd73659c46b602573331/raw/2cbb6504ba4206ccdda4612dfcf8f572699f5e18/ytubestats.data.json", {
    cache: "no-store"
  });

  // console.log("[LICENSE] Fetch response status =", response.status);

  const data = await response.json();
  // console.log("[LICENSE] Loaded license data:", data);

  const license = data.licenses.find(item => item.key === key);
  // console.log("[LICENSE] Matched license =", license);

  if (!license) {
    // console.log("[LICENSE] No matching license — INVALID");
    return false;
  }

  // Expiration logic
  if (license.expires === "never") {
    // console.log("[LICENSE] Lifetime license — VALID");
    return true;
  }

  const today = new Date();
  const expires = new Date(license.expires);

  // console.log("[LICENSE] Today =", today);
  // console.log("[LICENSE] Expires =", expires);

  if (today <= expires) {
    // console.log("[LICENSE] License active — VALID");
    return true;
  }

  const graceEnd = new Date(expires);
  graceEnd.setDate(graceEnd.getDate() + license.graceDays);

  // console.log("[LICENSE] Grace ends =", graceEnd);

  if (today <= graceEnd) {
    // console.log("[LICENSE] In grace period — VALID");
    return true;
  }

  // console.log("[LICENSE] Fully expired — INVALID");
  return false;
};
