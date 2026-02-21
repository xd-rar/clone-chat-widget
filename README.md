# Clone Chat Widget

A Windows 95-styled desktop chat client for [OpenClaw](https://openclaw.ai) agents. Built with Electron.

![Clone Chat Widget](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-2.0.0-orange)

---

## What's New in v2.0.0

### Splash Screen
- Animated Win95-styled splash screen on startup with progress bar
- Smooth scale-in animation and loading status indicators

### Sound Effects (Web Audio API)
- **Startup sound** plays when the app finishes loading
- **Send sound** plays when you send a message
- **Receive sound** plays when you get a response
- **Hover sound** plays when you hover over any button
- **Click sound** plays when you click any button
- All sounds processed through a custom audio engine:
  - 300Hz high-pass filter (low cut for brightness)
  - High shelf boost at 4kHz for airiness
  - Peaking EQ at 3.2kHz for upper-mid presence
  - Subtle delay (180ms) with controlled feedback
  - Convolution reverb for spatial depth
  - UI sounds use a lightweight chain (no delay/reverb) for snappy response

### Improved Startup Behavior
- Gateway no longer auto-launches on app start
- App opens cleanly and sits idle until you configure and connect via CONFIG
- CONFIG button pulses to signal setup is needed when not connected

### Audio Files Included
- `startup.wav` — plays on app ready
- `send.wav` — plays on message send
- `receive.wav` — plays on response received
- `hover.wav` — plays on button hover
- `click.wav` — plays on button click

---

## Features

- **Real-time streaming chat** with any OpenClaw agent
- **Animated splash screen** with progress bar on launch
- **Full sound design** — startup, send, receive, hover, and click sounds with audio processing
- **Image support** — upload, drag-and-drop, or paste (Ctrl+V) images directly into chat
- **Full appearance customization** — colors, gradients, title bar text, all via a built-in GUI
- **Custom Win95 scrollbar** with scroll-to-top, incremental scroll, and draggable thumb
- **Device authentication** — Ed25519 keypair generated and persisted automatically
- **Persistent settings** — all config saved to localStorage between sessions

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)
- An OpenClaw agent running (local or remote)

If you don't have OpenClaw yet, see: https://docs.openclaw.ai

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/xd-rar/clone-chat-widget.git
cd clone-chat-widget
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the app

```bash
npm start
```

The splash screen will appear, then the chat window opens. Click **CONFIG** to set your gateway URL and token.

---

## Connecting to Your OpenClaw Agent

### Manual Configuration

Click the **CONFIG** button in the status bar to open settings:

| Setting | Description | Default |
|---|---|---|
| **Gateway WebSocket URL** | WebSocket address of your OpenClaw gateway | `ws://127.0.0.1:18789` |
| **Agent ID** | The ID of the agent to chat with | `main` |
| **Gateway Token** | Auth token (find yours in `~/.openclaw/openclaw.json`) | *(empty)* |
| **Session Key** | Custom session routing key (auto-generated if blank) | *(auto)* |
| **Auto-detect on startup** | Probe localhost for a gateway before connecting | On |
| **Gateway Script Path** | Path to a .bat/.sh script to launch your gateway | *(empty)* |

### Finding Your Gateway Token

Your token is stored in your OpenClaw config file:

- **Windows**: `C:\Users\<you>\.openclaw\openclaw.json`
- **macOS/Linux**: `~/.openclaw/openclaw.json`

Open the file and look for the `token` field. Paste it into the **Gateway Token** field in CONFIG.

### Connecting to a Remote Agent

1. They need to expose their gateway (e.g., via [ngrok](https://ngrok.com/) or a public URL)
2. Open CONFIG and set the **Gateway WebSocket URL** to their address (e.g., `wss://abc123.ngrok.io`)
3. Enter the **Gateway Token** they provide
4. Set the **Agent ID** to the agent you want to chat with
5. Click **Save & Reconnect**

---

## Customization

Click the **Customize** button to open the appearance editor. You can change:

- **Title bar** — rename the window title, set 2-color gradient, text color
- **Window** — background color, status bar color
- **Chat area** — background, user/bot/system text colors, timestamp color
- **Input area** — background, text, and border colors
- **Buttons** — general and send button colors
- **Scrollbar** — track, thumb, and button colors

All changes preview live. Click **Apply** to save, **Reset** to restore defaults.

---

## Controls

| Button | Action |
|---|---|
| **Upload Image** | Attach an image to your next message |
| **Dashboard** | Open the OpenClaw web dashboard |
| **Gateway** | Launch your gateway script (set path in CONFIG) |
| **Customize** | Open the appearance editor |
| **CONFIG** | Open connection settings |

### Window Controls

- **Minimize** — click `_` in the title bar
- **Maximize/Restore** — click `□`
- **Close** — click `×`
- **Move** — drag the title bar

### Image Input

- **Upload**: click "Upload Image" button
- **Paste**: Ctrl+V with an image in clipboard
- **Drag & drop**: drag an image file onto the input area

---

## Building as .exe

To build a standalone Windows executable:

```bash
npm install
npm run dist:win
```

The output will be in `dist/win-unpacked/`. Run `Clone Chat Widget.exe` from there.

---

## File Structure

```
clone-chat-widget/
├── main.js                    # Electron main process (splash → main window)
├── splash.html                # Animated splash screen
├── clone-chat-widget.html     # Chat widget (UI + logic + audio engine)
├── sounds/                    # Sound effects
│   ├── startup.wav            #   App ready sound
│   ├── send.wav               #   Message send sound
│   ├── receive.wav            #   Message receive sound
│   ├── hover.wav              #   Button hover sound
│   └── click.wav              #   Button click sound
├── icon.png                   # App icon (PNG)
├── icon.ico                   # App icon (Windows ICO)
├── package.json               # Dependencies, scripts, build config
├── README.md                  # This file
└── .gitignore                 # Git ignore rules
```

---

## Troubleshooting

### "No local OpenClaw detected"
- Make sure your OpenClaw gateway is running
- Check that it's on the default port (18789)
- Or open CONFIG and set the correct URL manually

### "CONNECTING..." stuck / "DISCONNECTED"
- Verify the gateway URL is correct
- Check the gateway token matches what's in `~/.openclaw/openclaw.json`
- Look at the Electron DevTools console for detailed error messages

### "device signature invalid"
- Delete `~/.clone-chat-device.json` and restart the app. A new keypair will be generated.

### No sound
- Make sure your system volume is up
- Sound files (`.wav`) must be in the same directory as the app files
- Check DevTools console for audio decoding errors

---

## Changelog

### v2.0.0
- Added animated splash screen with progress bar
- Added full sound design: startup, send, receive, hover, click
- Built custom Web Audio API engine with high-pass filter, EQ, delay, and reverb
- Removed automatic gateway launch on startup
- App now sits idle until user configures connection via CONFIG
- CONFIG button pulses when setup is needed
- Horizontal-only grid effect in chat area
- Inline image thumbnails in chat messages
- Improved image preview handling (no more ghost "(preview)" text)

### v1.0.0
- Initial release
- Windows 95-styled chat interface
- OpenClaw WebSocket integration with Ed25519 device auth
- Custom scrollbar with scroll-to-top, scroll up/down, draggable thumb
- Full appearance customization panel
- Image upload, paste, and drag-and-drop support
- Auto-detect local gateway
- Persistent settings via localStorage

---

## License

MIT
