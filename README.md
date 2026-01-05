🛡️ AEGIS COGNITION
Parental Control & Screen-Time Manager – Chrome Extension

Aegis Cognition helps parents and individuals:

⏱️ limit daily screen-time

🚫 block distracting or harmful websites

🔐 require password for overrides and changes

👶 enable kid-safe browsing mode

🛡️ filter adult content (keywords & domains)

Built using Chrome Manifest V3 — no servers, no tracking, fully local.

⭐ FEATURES
⏱️ Smart Time Tracking

tracks active time per website

works across multiple tabs

resets automatically each day

data saved locally only

🚫 Screen-Time Limits

default = no limit (infinite)

set global or per-site limits

site blocked automatically when limit is reached

🔐 Password-Protected Override

When a site is blocked:

user sees blocked screen

must enter password to continue

domain temporarily whitelisted

🛡️ Adult Content Blocking

Supports:

domain blocking

keyword blocking

customizable lists

🔒 Secure Settings

Password is required to:

change limits

edit blocked sites

edit blocked keywords

enable kid-mode

Settings can be viewed without password, but not modified without password.

👶 Kid Mode

Optional:

prevents casual tampering

retains override protection

improves safety for children

🛠️ TECHNOLOGY STACK

JavaScript (ES6)

Chrome Extension API — Manifest V3

Background Service Worker

Content Scripts

HTML / CSS

Chrome Storage API

📂 PROJECT STRUCTURE
aegis-cognition/
├── manifest.json
├── background.js
├── popup.html / popup.js
├── options.html / options.js
├── blocked.html / blocked.js
├── filter.js
└── icons/ (optional)

🚀 INSTALLATION
🔧 Local Install (Developer Mode)

Download or clone this repository

Open Chrome and go to:

chrome://extensions


Enable Developer Mode

Click Load unpacked

Select the project folder

Your extension will now appear in the toolbar 🎉

📘 USAGE GUIDE
🟢 Set Parent Password

Popup → Settings → Set Password

🔵 Configure Time Limits

enter minutes

saving requires password

🟣 Block Sites / Keywords

Examples:

youtube.com
instagram.com
reddit.com

porn
xxx
nsfw

🔴 When Time Runs Out

website is blocked

password required to continue

🔐 PRIVACY

❌ no data collection

❌ no server communication

❌ no analytics

✔ stored locally (chrome.storage.local)

🧠 IMPLEMENTATION NOTES

This project demonstrates:

Manifest V3 service workers

async event lifecycle

secure override flow

per-domain time tracking

content filtering system

Chrome storage syncing

⚠️ KNOWN LIMITATIONS

password stored unhashed (upgrade planned)

cannot prevent uninstalling the extension

cloud sync not yet implemented

🗺️ ROADMAP

🔑 hashed & salted password

☁️ multi-device cloud sync

📊 detailed usage dashboard

👶 stricter kid-lock mode

🌙 incognito support
