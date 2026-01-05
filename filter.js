const DEFAULT_ADULT_DOMAINS = [
  "pornhub",
  "xvideos",
  "xnxx",
  "redtube",
  "youporn",
  "brazzers",
  "spankbang",
  "onlyfans"
];

const DEFAULT_ADULT_KEYWORDS = [
  "porn",
  "xxx",
  "nsfw",
  "adult video",
  "adult site"
];

function blockPage() {
  document.documentElement.innerHTML = `
    <head>
      <title>Blocked</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body style="
      height:100vh;
      margin:0;
      display:flex;
      justify-content:center;
      align-items:center;
      background:#0f172a;
      color:white;
      font-family:Arial, sans-serif">
      <div>
        <h2>🚫 Adult content blocked</h2>
        <p>This page was blocked by Aegis Cognition.</p>
      </div>
    </body>
  `;
}

(function () {
  const host = location.hostname.toLowerCase();

  chrome.storage.local.get(["settings"], (data) => {
    const s = data.settings || {};
    const enabled = s.adultFilterEnabled !== false; // default ON

    if (!enabled) return;

    const domains = [...DEFAULT_ADULT_DOMAINS, ...(s.blockedDomains || [])];
    const keywords = [...DEFAULT_ADULT_KEYWORDS, ...(s.blockedKeywords || [])];

    // block by domain
    if (domains.some(d => host.includes(d))) {
      blockPage();
      return;
    }

    // block by page text content
    setTimeout(() => {
      const text = document.body.innerText.toLowerCase();
      if (keywords.some(k => text.includes(k))) {
        blockPage();
      }
    }, 700);
  });
})();
