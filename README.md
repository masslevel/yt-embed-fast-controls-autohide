# YouTube Embed - Fast Controls Autohide

A Violentmonkey userscript that instantly hides the YouTube embed player controls when the mouse leaves the iframe, instead of waiting the default ~5 seconds.

## The Problem

YouTube's 2026 embed player redesign introduced a new control layout that takes around 5 seconds to hide after the mouse leaves the player area. On pages with multiple embeds (forums, blogs, etc.) this is visually noisy and distracting.

## Installation

1. Install [Violentmonkey](https://violentmonkey.github.io/) for your browser
2. Click **[Install Script]** ← *(add your Greasyfork or raw GitHub URL here)*
3. Done — works on any page with a YouTube embed

## How It Works

The script runs inside each `youtube.com/embed/*` frame and listens for `mouseleave`/`mouseenter` events on the embed document. When the mouse exits the iframe boundary, it instantly sets `opacity: 0` on the player's Web Component control elements (`ytm-watch-player-controls` and friends). When the mouse re-enters, controls are restored immediately.

No host page permissions required — everything runs inside the embed frame itself.

## Compatibility

Targets the **2026 YouTube embed player redesign** which uses Web Components (`ytm-watch-player-controls`, `player-top-controls`, `player-middle-controls`, `player-bottom-controls`) instead of the classic `ytp-chrome-bottom` DOM structure.

If YouTube updates the player and breaks the script, check whether `document.querySelector('ytm-watch-player-controls')` still returns an element in the embed frame console — that's the selector everything depends on.

## Notes

- Controls start **visible** on page load — the hide only triggers after the first mouse-out
- Works on `youtube.com/embed/*` and `youtube-nocookie.com/embed/*`
- No external dependencies, no permissions, fully self-contained
