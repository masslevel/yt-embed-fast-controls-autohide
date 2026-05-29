// ==UserScript==
// @name         YouTube Embed - Fast Controls Autohide
// @namespace    https://github.com/masslevel/yt-embed-fast-controls-autohide
// @version      1.0.0
// @description  Immediately hides controls when mouse leaves the YouTube embed iframe, instead of waiting ~5 seconds.
// @author       masslevel
// @match        https://www.youtube.com/embed/*
// @match        https://www.youtube-nocookie.com/embed/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    const POLL_INTERVAL_MS = 100;
    const MAX_ATTEMPTS = 50;

    function injectStyle() {
        const style = document.createElement('style');
        style.textContent = `
            html.yt-ext-controls-hidden ytm-watch-player-controls,
            html.yt-ext-controls-hidden player-top-controls,
            html.yt-ext-controls-hidden player-middle-controls,
            html.yt-ext-controls-hidden player-bottom-controls {
                opacity: 0 !important;
                pointer-events: none !important;
                transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1) !important;
            }
        `;
        (document.head || document.documentElement).appendChild(style);
    }

    function hideControls() {
        document.documentElement.classList.add('yt-ext-controls-hidden');
    }

    function showControls() {
        document.documentElement.classList.remove('yt-ext-controls-hidden');
    }

    function attachListeners() {
        document.addEventListener('mouseleave', hideControls);
        document.addEventListener('mouseenter', showControls);
        document.addEventListener('pointerleave', hideControls);
        document.addEventListener('pointerenter', showControls);
    }

    function waitForControls() {
        if (document.querySelector('ytm-watch-player-controls')) {
            injectStyle();
            attachListeners();
            return;
        }

        let attempts = 0;
        const poller = setInterval(() => {
            attempts++;
            if (document.querySelector('ytm-watch-player-controls')) {
                clearInterval(poller);
                injectStyle();
                attachListeners();
            } else if (attempts >= MAX_ATTEMPTS) {
                clearInterval(poller);
                console.warn('[YT-Embed-Hide] Controls element not found — YouTube may have updated its player.');
            }
        }, POLL_INTERVAL_MS);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForControls);
    } else {
        waitForControls();
    }

})();
