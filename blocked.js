function param(name) {
  return new URLSearchParams(location.search).get(name);
}

// Set title
document.getElementById("title").innerText =
  param("reason") === "adult" ? "Adult content blocked" : "Time limit reached";

// Show blocked site
const domain = param("domain");
document.getElementById("site").innerText = domain;

// Handle unlock button
document.getElementById("unlock").addEventListener("click", () => {
  const entered = document.getElementById("pwd").value;

  chrome.storage.local.get(["settings"], data => {
    const settings = data.settings || {};
    const real = settings.password || "";

    // ⭐ CASE 1 — NO PASSWORD EVER SET
    if (!real) {
      document.getElementById("msg").innerText =
        "No parent password set. Open extension → Settings and set one.";
      return;
    }

    // ⭐ CASE 2 — PASSWORD WRONG
    if (entered !== real) {
      document.getElementById("msg").innerText = "Wrong password";
      return;
    }

    // ⭐ CASE 3 — PASSWORD CORRECT → whitelist & unlock
    if (!settings.whitelist) settings.whitelist = [];

    if (!settings.whitelist.includes(domain)) {
      settings.whitelist.push(domain);
    }

    chrome.storage.local.set({ settings }, () => {
      const url = param("url");

      if (url) {
        location.href = url;
      } else {
        history.back();
      }
    });
  });
});
