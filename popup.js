function format(seconds) {
  const m = Math.floor(seconds / 60);
  return `${m} min`;
}

function load() {
  chrome.storage.local.get(["usage"], data => {
    const usage = data.usage || {};
    const list = document.getElementById("list");

    list.innerHTML = "";

    Object.entries(usage).forEach(([domain, sec]) => {
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = `<span>${domain}</span><span>${format(sec)}</span>`;
      list.appendChild(row);
    });

    if (!Object.keys(usage).length) {
      list.innerHTML = "<i>No usage yet</i>";
    }
  });
}

// 🔁 refresh usage every 5 seconds
load();
setInterval(load, 5000);

// ⚙️ OPEN SETTINGS — NO PASSWORD HERE
document.getElementById("settingsBtn").addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});
