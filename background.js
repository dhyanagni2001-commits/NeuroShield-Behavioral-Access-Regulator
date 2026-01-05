// ------------- helpers -------------

function today() {
  return new Date().toISOString().slice(0, 10);
}

function getDomain(url) {
  try {
    const u = new URL(url);

    if (u.protocol === "chrome-extension:") return null;
    if (u.protocol === "chrome:") return null;
    if (u.protocol === "about:") return null;
    if (u.protocol === "edge:") return null;

    return u.hostname.replace(/^www\./, "");
  } catch (e) {
    return null;
  }
}


// ------------- restrict ONLY social media -------------

const SOCIAL_SITES = [
  "facebook",
  "instagram",
  "twitter",
  "x.com",
  "tiktok",
  "snapchat",
  "reddit",
  "pinterest",
  "youtube",
  "discord",
  "whatsapp",
  "telegram",
  "linkedin"
];

// ------------- tracking state -------------

let activeDomain = null;
let lastActive = Date.now();

// ------------- add time -------------

function addTime(seconds) {
  if (!activeDomain) return;

  chrome.storage.local.get(["usage", "date"], data => {
    const date = data.date || today();
    let usage = data.usage || {};

    // reset day change
    if (date !== today()) {
      usage = {};
    }

    usage[activeDomain] = (usage[activeDomain] || 0) + seconds;

    chrome.storage.local.set({
      usage: usage,
      date: today()
    });
  });
}

// tick based on tab focus time
function tick() {
  const now = Date.now();
  const seconds = Math.floor((now - lastActive) / 1000);
  lastActive = now;

  if (seconds > 0) {
    addTime(seconds);
  }
}

// ------------- time-limit enforcement -------------

function checkLimit(tabId, url) {
  const domain = getDomain(url);
  if (!domain) return;

  chrome.storage.local.get(["usage", "settings"], data => {
    const usage = data.usage || {};
    const settings = data.settings || {};
    const limits = settings.perSiteLimits || {};
    const whitelist = settings.whitelist || [];

    // 🔹 if domain whitelisted, skip restriction
    if (whitelist.includes(domain)) return;

    // only social sites limited
    const isSocial = SOCIAL_SITES.some(s => domain.includes(s));
    if (!isSocial) return;

    const used = usage[domain] || 0;
    // site-specific limit or global default
let limit = limits[domain] ?? settings.defaultLimit;

// ⭐ no limit set → do nothing
if (limit === null || limit === undefined) return;

// minutes to seconds if user stores minutes


    if (used >= limit) {
      const page = chrome.runtime.getURL("blocked.html");
      chrome.tabs.update(tabId, { url: `${page}?domain=${domain}` });
    }
  });
}


// ------------- event listeners -------------

// tab switched
chrome.tabs.onActivated.addListener(async info => {
  tick();

  const tab = await chrome.tabs.get(info.tabId);
  activeDomain = getDomain(tab.url);
  lastActive = Date.now();

  checkLimit(info.tabId, tab.url);
});

// url changed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!changeInfo.url) return;

  tick();

  activeDomain = getDomain(changeInfo.url);
  lastActive = Date.now();

  checkLimit(tabId, changeInfo.url);
});

// window focus changed
chrome.windows.onFocusChanged.addListener(() => {
  tick();
  lastActive = Date.now();
});

// browser idle → stop counting
// chrome.idle.onStateChanged.addListener(state => {
//   if (state !== "active") {
//     tick();
//     activeDomain = null;
//   } else {
//     lastActive = Date.now();
//   }
// });

// install defaults
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    usage: {},
    date: today(),
    settings: {
      defaultLimit: null,
      perSiteLimits: {},
      whitelist: []          // 🔹 add this
    }
  });
});




// 🔁 Every 30 seconds, add time and enforce limit on the active tab
setInterval(() => {
  tick();

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    if (!tabs.length) return;
    const tab = tabs[0];
    checkLimit(tab.id, tab.url);
  });
}, 30000);


