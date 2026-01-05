// ---------- password verification helper ----------
function askPassword(cb) {
  chrome.storage.local.get(["settings"], (data) => {
    const real = (data.settings || {}).password || "";

    // no password yet set
    if (!real) {
      alert("No parent password set yet. Please set a password first.");
      return;
    }

    const entered = prompt("Enter parent password:");

    if (entered !== real) {
      alert("Wrong password.");
      return;
    }

    cb(); // run actual save work
  });
}

// ---------- load settings into UI ----------
function loadSettings() {
  chrome.storage.local.get(["settings"], (data) => {
    const s = data.settings || {};

    // ⭐ default = infinite if null/undefined
    if (s.defaultLimit === null || s.defaultLimit === undefined) {
      document.getElementById("limitInput").value = "";
    } else {
      document.getElementById("limitInput").value = (s.defaultLimit / 60);
    }

    document.getElementById("domainBox").value =
      (s.blockedDomains || []).join("\n");

    document.getElementById("keywordBox").value =
      (s.blockedKeywords || []).join("\n");

    document.getElementById("kidModeToggle").checked =
      Boolean(s.kidMode);
  });
}

// ---------- SAVE LIMIT (requires password) ----------
document.getElementById("saveLimit").addEventListener("click", () => {

  askPassword(() => {
    const minutes = parseInt(document.getElementById("limitInput").value, 10);

    chrome.storage.local.get(["settings"], (data) => {
      const s = data.settings || {};

      // ⭐ blank or <=0 means infinite time
      if (isNaN(minutes) || minutes <= 0) {
        s.defaultLimit = null;
      } else {
        s.defaultLimit = minutes * 60; // min → seconds
      }

      chrome.storage.local.set({ settings: s }, () => {
        showStatus("Time limit saved");
      });
    });
  });

});

// ---------- SAVE DOMAINS (requires password) ----------
document.getElementById("saveDomains").addEventListener("click", () => {

  askPassword(() => {
    const lines = document.getElementById("domainBox").value
      .split("\n")
      .map(s => s.trim())
      .filter(Boolean);

    chrome.storage.local.get(["settings"], (data) => {
      const s = data.settings || {};
      s.blockedDomains = lines;

      chrome.storage.local.set({ settings: s }, () => {
        showStatus("Blocked domains saved");
      });
    });
  });

});

// ---------- SAVE KEYWORDS (requires password) ----------
document.getElementById("saveKeywords").addEventListener("click", () => {

  askPassword(() => {
    const lines = document.getElementById("keywordBox").value
      .split("\n")
      .map(s => s.trim())
      .filter(Boolean);

    chrome.storage.local.get(["settings"], (data) => {
      const s = data.settings || {};
      s.blockedKeywords = lines;

      chrome.storage.local.set({ settings: s }, () => {
        showStatus("Blocked keywords saved");
      });
    });
  });

});

// ---------- SAVE PASSWORD (no password required) ----------
document.getElementById("savePassword").addEventListener("click", () => {
  const pwd = document.getElementById("pwdInput").value;

  chrome.storage.local.get(["settings"], (data) => {
    const s = data.settings || {};
    s.password = pwd;

    chrome.storage.local.set({ settings: s }, () => {
      showStatus("Parent password set");
    });
  });
});

// ---------- KID MODE (requires password) ----------
document.getElementById("kidModeToggle").addEventListener("change", (e) => {

  askPassword(() => {
    chrome.storage.local.get(["settings"], (data) => {
      const s = data.settings || {};
      s.kidMode = e.target.checked;

      chrome.storage.local.set({ settings: s }, () => {
        showStatus("Kid mode updated");
      });
    });
  });

});

// ---------- status helper ----------
function showStatus(msg) {
  const el = document.getElementById("status");
  el.textContent = msg;
  setTimeout(() => el.textContent = "", 1500);
}

// ---------- load on open ----------
loadSettings();
