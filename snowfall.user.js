// ==UserScript==
// @name         Discord Snowfall
// @namespace    https://github.com/EverlastingUc
// @version      1.0.0
// @description  A Beautiful Snowfall Effect For Discord.
// @author       Everlasting
// @license      MIT
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discord.com
// @icon64       https://www.google.com/s2/favicons?sz=64&domain=discord.com
// @match        *://*.discord.com/*
// @grant        none
// @run-at       document-end
// @game         Discord
// @homepage     https://github.com/EverlastingUc/Discord-Snowfall
// @supportURL   https://guns.lol/everlasting_uc
// @supportURL   mailto:everlastinguchiha@gmail.com
// @downloadURL  https://raw.githubusercontent.com/EverlastingUc/Discord-Snowfall/main/snowfall.user.js
// @updateURL    https://raw.githubusercontent.com/EverlastingUc/Discord-Snowfall/main/snowfall.user.js
// @made on      30-06-2026 12:00 AM IST
// @last updated 30-06-2026 12:00 AM IST
// @note         MIT License - Placed at the very bottom of this script.
// ==/UserScript==

// START

(function() {
    'use strict';

    const cfg = {
        max: 35,
        minTime: 6,
        maxTime: 12,
        interval: 450,
    };

    let intervalId = null;

    const style = document.createElement('style');
    style.textContent = `
        .snow {
            position: fixed !important;
            top: -25px !important;
            z-index: 9999999 !important;
            background: white !important;
            border-radius: 50% !important;
            pointer-events: none !important;
            will-change: transform;
            filter: blur(3px);
            box-shadow: 0 0 5px rgba(255,255,255,0.5);
        }
        @keyframes fall {
            0% { transform: translateY(0px) translateX(0px); opacity: 0; }
            20% { opacity: 0.7; }
            80% { opacity: 0.6; }
            100% { transform: translateY(105vh) translateX(15px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    const createFlake = () => {
        let container = document.getElementById('app-mount') || document.body;
        let curr = document.querySelectorAll('.snow').length;
        if (!container || curr >= cfg.max) return;

        let flake = document.createElement('div');
        flake.className = 'snow';

        let size = Math.random() * 5 + 3;
        let dur = Math.random() * (cfg.maxTime - cfg.minTime) + cfg.minTime;

        flake.style.width = size + 'px';
        flake.style.height = size + 'px';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animation = `fall ${dur}s ease-in forwards`;
        flake.style.opacity = Math.random() * 0.4 + 0.4;

        container.appendChild(flake);

        setTimeout(() => {
            if (flake && flake.remove) flake.remove();
        }, dur * 1000);
    };

    const start = () => {
        if (intervalId) return;
        intervalId = setInterval(createFlake, cfg.interval);
    };

    const wait = setInterval(() => {
        if (document.getElementById('app-mount')) {
            clearInterval(wait);
            start();
        }
    }, 500);
})();

// END

/*
MIT License
Copyright (c) 2026 Everlasting

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
