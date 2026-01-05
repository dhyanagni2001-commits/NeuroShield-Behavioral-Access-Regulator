🛡 Aegis Cognition — Parental Control & Screen-Time Manager (Chrome Extension)

Aegis Cognition is a Chrome extension that helps parents and individuals limit screen-time on social media, block adult content, and require passwords for overrides and settings changes.

It combines:

⏱ per-site time tracking

🛑 automatic blocking after limit

🔓 password-based override

🧑‍🧒 kid mode options

🔤 domain + keyword blocking

🔐 password-protected settings changes

🌙 polished UI for popup and blocked page

Built entirely with Manifest V3, service workers, and content scripts.

✨ Features
🕒 Time Tracking

tracks active time per website

runs in Manifest V3 background service worker

works across tabs/windows

resets automatically per day

stored locally in chrome.storage.local

🚫 Usage Limits

default = infinite time (no blocking)

parent can set global time or per-site limits

when limit is reached:

page automatically blocks

user must enter password to continue

🔓 Secure Override Mode

When time limit is reached:

blocked page appears

user enters parent password

domain added to temporary whitelist

access continues for rest of the day

🛡 Adult Content Filter

Blocks websites containing:

known adult domains (configurable)

flagged keywords in page content

🔐 Password-Protected Settings

Password is required when:

setting time limit

changing time limit

adding blocked domains

adding adult keywords

toggling kid mode

Password is not required to view settings, only to save changes.

👶 Kid Mode (configurable)

Currently supports:

password-protected settings edits

optional:

hide settings button

disable override access

stricter blocklists (future enhancement)

🎨 Beautiful UI

Includes:

popup usage dashboard

blocked screen card UI

settings page forms

dark theme

🏗️ Tech Stack

JavaScript (ES6)

Chrome Extensions API (Manifest V3)

Background service workers

Content scripts

HTML / CSS

Local storage (chrome.storage.local)

No external frameworks required.

📦 Project Structure
/aegis-cognition
 ├── manifest.json
 ├── background.js            ← time tracking + enforcement
 ├── popup.html
 ├── popup.js
 ├── options.html
 ├── options.js               ← password-protected settings
 ├── blocked.html
 ├── blocked.js               ← override page
 ├── filter.js                ← adult + site blocking script
 └── icons/

🔧 Installation (Developer Mode)

Download this repository as ZIP and extract

Open Chrome → chrome://extensions/

Enable Developer mode

Click Load unpacked

Select project folder

Extension installs instantly.

🚀 How To Use
1) First Time Setup

Open popup

Click Settings

Set parent password

Optional:

configure limits

add blocked domains or keywords

enable kid mode

2) Time Limits

default = no time limit

set global time limit in minutes

hit Save → asks parent password

timer begins automatically

3) When Limit Reached

site is blocked

“Override access” screen displays

enter password to continue

4) Adult Sites

automatically blocked

configurable list

🔐 Privacy and Security

🔒 all data stored locally on your device

❌ no internet usage tracking server

❌ no data collection

❌ no third-party analytics

✔ can be verified via GitHub code

Password is stored in chrome.storage.local.

(Optional improvement: hashing password with SHA-256.)

🧩 Key Implementation Details (interview-useful)

This project demonstrates:

Chrome Manifest V3 architecture

service worker lifecycle and limitations

periodic timers + tab event listeners

selective content blocking injection

whitelisting logic

secure UI flows

CSP-safe DOM manipulation

UX constraints of Chrome popup auto-close

state resetting strategies

Great talking points for interviews.

🧭 Known Limitations

password stored unhashed (can be improved)

does not prevent Chrome extension uninstall

persistent blocking depends on Chrome running

no cross-device sync yet

🛣 Future Work / Roadmap

☁ Firebase sync across devices

🔑 hashed password storage

👁️‍🗨 incognito mode enforcement

🧒 hard kid-mode profile

📊 weekly usage reports & charts

🚀 publish to Chrome Web Store
