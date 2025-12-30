export default function BigPage() {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <title>Display Large Text</title>
                <meta name="viewport" content="width=device-width, user-scalable=no" />
                <meta name="description" content="Display & share text in a large font directly from your browser." />
            </head>
            <body>
                {/* Content */}
                <div className="main">
                    <span className="inputarea">
                        <input type="text" className="inputbox" tabIndex={1} placeholder="Enter your text here" />
                        <span className="button-row">
                            <a href="" className="js-help-button">What is this?</a>
                            <a href="" className="js-share-button">Share this text</a>
                        </span>
                    </span>

                    <span id="darktoggle"></span>

                    <ul className="text">
                        <template id="charbox-template">
                            <li className="charbox">
                                <span className="char"></span>
                            </li>
                        </template>
                    </ul>

                    <span className="about">
                        Made with love by <a href="https://dbader.org">Dan Bader</a>
                    </span>
                </div>

                {/* Modals */}
                <div className="modal js-help-modal">
                    <h2>What is this?</h2>
                    <p>This lets you <strong>display & share text in a very large font</strong> directly from your browser.</p>
                    <p>That&apos;s handy whenever you need to <strong>read something on your screen from further away</strong>&mdash;for example, phone numbers and passwords.</p>
                    <p>When you share text, <strong>only the person with the link sees your text</strong>. Rendering happens locally on your browser and your text is not transmitted to any servers.</p>
                    <button className="js-modal-close">Close</button>
                </div>

                <div className="modal js-share-modal">
                    <h2>Copy the link below:</h2>
                    <input type="text" className="js-share-link" defaultValue="" />
                    <button className="js-modal-close">Close</button>
                </div>

                <script dangerouslySetInnerHTML={{
                    __html: `
window.addEventListener('DOMContentLoaded', function() {
    "use strict";

    var WELCOME_MSG = '*hello*';

    var mainDiv = document.querySelector('.main');
    var textDiv = document.querySelector('.text');
    var inputField = document.querySelector('.inputbox');
    var shareLinkField = document.querySelector('.js-share-link');
    var charboxTemplate = document.querySelector('#charbox-template');
    var defaultTitle = document.querySelector("title").innerText;

    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    var isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.getElementById('darktoggle').addEventListener('click', () => setDarkMode(!isDarkMode));
    setDarkMode(isDarkMode);

    function setDarkMode(darkMode) {
        isDarkMode = darkMode; 
        document.getElementById('darktoggle').innerText = isDarkMode ? '☀️' : '🌑';
        document.body.classList.toggle('dark-mode', isDarkMode);
    }

    function updateFragment(text) {
        window.location.replace(location.origin + location.pathname + '#' + encodeURIComponent(text));
        shareLinkField.value = location.origin + location.pathname + location.hash;
    }

    function updateTitle(text) {
        if (!text || text === WELCOME_MSG) {
            document.title = defaultTitle;
        } else {
            document.title = text;
        }
    }

    function clearChars() {
        while (textDiv.firstChild) {
            textDiv.removeChild(textDiv.firstChild);
        }
    }

    function isEmoji(seg) {
      if (window.Intl && window.Intl.Segmenter) {
        return seg.match(/\\p{Emoji}\\uFE0F|\\p{Emoji_Presentation}/u);
      } else {
        return false;
      }
    }

    function renderText() {
        var text = decodeURIComponent(location.hash.split('#')[1] || ' ');

        clearChars();

        var textWidth = null;
        var forEachSegment = null;
        if (window.Intl && window.Intl.Segmenter) {
            var segmenter = new Intl.Segmenter();
            var segments = Array.from(segmenter.segment(text));
            forEachSegment = function forEachGraphemeSegment(f) {
                segments.forEach(function(seg) {
                    f.call(this, seg.segment, seg.index);
                });
            };

            textWidth = 0;
            forEachSegment(function(seg) {
                if (isEmoji(seg)) {
                    textWidth += 1.65;
                } else {
                    textWidth += 1;
                }
            });
        } else {
            textWidth = text.length;
            forEachSegment = function forEachCharSegment(f) {
                text.split(/.*?/u).forEach(f);
            };
        }

        var fontSize = Math.min(150 / textWidth, 30);

        forEachSegment(function(seg) {
            var charbox = charboxTemplate.content.cloneNode(true);
            var charElem = charbox.querySelector('.char');
            charElem.style.fontSize = fontSize + 'vw';

            if (seg !== ' ') {
                charElem.textContent = seg;
            } else {
                charElem.innerHTML = '&nbsp;';
            }

            if (isEmoji(seg)) {
                charElem.className = 'emoji';
            } else if (seg.match(/[0-9]/i)) {
                charElem.className = 'number';
            } else if (!seg.match(/\\p{L}/iu)) {
                charElem.className = 'symbol';
            }

            textDiv.appendChild(charbox);
        });

        if (text === ' ') {
            text = '';
        }

        if (inputField.value !== text) {
            inputField.value = text;
        }
        updateFragment(text);
        updateTitle(text);
    }

    function onInput(evt) {
        updateFragment(evt.target.value);
    }

    function enterInputMode(evt) {
        var defaultHash = '#' + encodeURIComponent(WELCOME_MSG);
        if (location.hash === defaultHash) {
            updateFragment('');
            renderText();
        }
        inputField.focus();
    }

    function modalKeyHandler(sel, evt) {
        if (evt.keyCode === 27) {
            hideModal(sel);
        }
    }

    function showModal(sel) {
        window.removeEventListener('keypress', enterInputMode);
        var modalDiv = document.querySelector(sel);
        modalDiv.classList.add('open');
        mainDiv.classList.add('blurred');
        var closeBtn = modalDiv.querySelector('.js-modal-close');

        closeBtn.onclick = hideModal.bind(null, sel);
        window.onkeydown = modalKeyHandler.bind(null, sel);

        modalDiv.scrollTop = 0;
    }

    function hideModal(sel) {
        var modalDiv = document.querySelector(sel);
        modalDiv.classList.remove('open');
        mainDiv.classList.remove('blurred');
        window.onkeydown = null;
        window.addEventListener('keypress', enterInputMode, false);
    }

    document.querySelector('.js-help-button').addEventListener('click', function(evt) {
        evt.preventDefault();
        showModal('.js-help-modal');
    }, false);

    document.querySelector('.js-share-button').addEventListener('click', function(evt) {
        evt.preventDefault();
        showModal('.js-share-modal');

        if (!isMobile) {
            shareLinkField.select();
        }
    }, false);

    inputField.addEventListener('input', onInput, false);
    textDiv.addEventListener('click', enterInputMode, false);
    window.addEventListener('keypress', enterInputMode, false);
    window.addEventListener('hashchange', renderText, false);

    if (!location.hash) {
        updateFragment(WELCOME_MSG);
    }

    renderText();
});
        `}} />

                <style dangerouslySetInnerHTML={{
                    __html: `
/*** Color Schemes ****************************************************/

:root {
    --link-color: #b94669;
    --hover-color: #d36083;
    --active-color: #a02d50;

    --bg-odd-letters: white;
    --bg-even-letters: #f7f7f7;
    --modal-bg-color: white;
    --bg-color: unset;

    --main-color: #222;
    --text-shadow-color: #aaa;
    --input-color: #ccc;
}

body.dark-mode {
    --bg-odd-letters: black;
    --bg-even-letters: #272727;
    --modal-bg-color: black;
    --bg-color: black;

    --main-color: #ddd;
    --text-shadow-color: #444;
    --input-color: #777;
}

/*** Common ***********************************************************/

* {
    margin: 0;
    padding: 0;
}

html, body {
    font-family: sans-serif;
    height: 100%;
    overflow: hidden;
    color: var(--main-color)
}

h1, h2 {
    font-size: 200%;
}

p {
    line-height: 1.32;
    margin: 10px 0 10px 0;
}

a {
    color: var(--link-color);
    text-decoration: none;
}

a:visited {
    color: var(--link-color);
}

a:hover {
    color: var(--hover-color);
    text-decoration: underline;
}

a:active {
    color: var(--active-color);
}

input {
    border-radius: 3px;
    border: 1px solid var(--input-color);
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.075);
    font-family: sans-serif;
    font-size: 12px;
    min-height: 26px;
    outline: none;
    padding: 2px;
    text-align: center;
    width: 100%;
}

input:focus {
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.075), 0 0 5px rgba(81,167,232,0.5);
    outline: none;
}

input::-webkit-input-placeholder {
    color: var(--input-color);
}

/*** Anims ************************************************************/

@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1.0;
    }
}

/*** Main *************************************************************/

.main {
    background-color: var(--bg-color);
    align-items: center;
    color: var(--main-color);
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    width: 100%;
}

.blurred {
    filter: blur(5px) grayscale(50%);
    pointer-events: none;
}

#darktoggle {
    position: absolute;
    top: 10px;
    right: 8px;
    cursor: pointer;
    user-select: none;
}

.inputarea {
    font-size: 12px;
    left: 0;
    margin-left: 35%;
    margin-right: 35%;
    margin-top: 10px;
    position: absolute;
    top: 0;
    width: 30%;
}

@media only screen and (max-width: 700px) {
    .inputarea {
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
    }
}

.inputarea .button-row {
    display: flex;
    justify-content: center;
}

.inputarea a {
    color: var(--input-color);
    margin: 5px 5px;
    padding: 2px;
}

.inputarea a:hover {
    color: #222;
    text-decoration: underline;
}

.text {
    border-radius: 10px;
    border: 1px solid #eee;
    box-shadow: 10px 10px 50px 5px var(--text-shadow-color);
    counter-reset: num-chars;
    overflow: hidden;
}

.text li {
    counter-increment: num-chars;
    display: flex;
    flex-direction: column;
    float: left;
    font-family: monospace;
    font-size: 10vw;
}

.text li .number {
    color: #456cad;
}

.text li .symbol {
    color: #b94669;
}

.text li .emoji {
    height: 1.1645em;
}

.text li:nth-child(odd) {
    background: var(--bg-odd-letters);
}

.text li:nth-child(even) {
    background: var(--bg-even-letters);
}

.text li::after {
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    color: #aaa;
    content: counter(num-chars);
    display: block;
    font-size: 1.5vw;
    text-align: center;
    user-select: none;
}

.about {
    animation-delay: 2s;
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-name: fade-in;
    animation-timing-function: ease;
    bottom: 10px;
    display: block;
    font-family: sans-serif;
    left: 0;
    opacity: 0;
    position: absolute;
    text-align: center;
    width: 100%;
    font-size: 1em;
    font-weight: lighter;
    color: #999;
}

.about a {
    color: #666;
}

@media only screen and (max-width: 700px) {
    .about {
        font-size: 60%;
    }
}

.twitter-follow-button {
    vertical-align: text-bottom;
}

.twitter-share-button {
    vertical-align: text-bottom;
}

/*** Modals ***********************************************************/

.modal {
    -webkit-overflow-scrolling: touch;
    background: var(--modal-bg-color);
    border-radius: 3px;
    box-shadow: 0px 0px 20px rgba(0,0,0,0.6);
    left: 50%;
    max-height: 90%;
    opacity: 0;
    overflow: auto;
    padding: 20px;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%) scale(0.7);
    transition: all 0.25s ease;
    width: 50%;
    z-index: 99;
}

@media only screen and (max-width: 700px) {
    .modal {
        width: 80%;
    }
}

.modal.open {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, -50%) scale(1);
}

.modal button {
    -moz-transition: 0.15s background ease;
    -ms-transition: 0.15s background ease;
    -o-transition: 0.15s background ease;
    -webkit-transition: 0.15s background ease;
    background: #b94669;
    border-radius: 1px;
    border: 0px;
    color: #fff;
    cursor: pointer;
    float: right;
    font-size: 15px;
    margin: 10px -6px 0 0;
    outline: none;
    padding: 8px 10px;
    transition: 0.15s background ease;
}

.modal button:hover {
    background: var(--hover-color);
}
.modal button:active {
    background: var(--active-color);
}

.modal input {
    font-size: 200%;
    margin-top: 10px;
}

.modal ul {
    list-style-position: inside;
    list-style-type: square;
    margin-left: 0;
    padding-left: 1em;
    text-indent: -1em;
}

.modal li {
    margin-top: 7.5px;
}
        `}} />
            </body>
        </html>
    );
}
