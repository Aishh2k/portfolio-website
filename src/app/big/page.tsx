"use client";

import { useEffect, useState, useRef } from "react";

export default function BigPage() {
    const [text, setText] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const textContainerRef = useRef<HTMLUListElement>(null);

    // Initialize from URL hash and dark mode
    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const decoded = decodeURIComponent(hash || "*hello*");
        setText(decoded);

        const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDarkMode(darkModePreference);
        document.body.classList.toggle("dark-mode", darkModePreference);
    }, []);

    // Update hash when text changes
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.location.replace(window.location.pathname + "#" + encodeURIComponent(text));
        }
    }, [text]);

    // Render large text
    useEffect(() => {
        if (!textContainerRef.current) return;

        const container = textContainerRef.current;

        // Clear existing content
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        const displayText = text || " ";
        let segments: string[] = [];
        let textWidth = 0;

        // Use Intl.Segmenter if available for emoji support
        if (window.Intl && (window.Intl as any).Segmenter) {
            const segmenter = new (window.Intl as any).Segmenter();
            const rawSegments = Array.from(segmenter.segment(displayText));
            rawSegments.forEach((seg: any) => {
                segments.push(seg.segment);
                if (/\p{Emoji}\uFE0F|\p{Emoji_Presentation}/u.test(seg.segment)) {
                    textWidth += 1.65;
                } else {
                    textWidth += 1;
                }
            });
        } else {
            segments = displayText.split("");
            textWidth = segments.length;
        }

        const fontSize = Math.min(150 / textWidth, 30);

        segments.forEach((seg) => {
            const li = document.createElement("li");
            li.className = "charbox";

            const span = document.createElement("span");
            span.className = "char";
            span.style.fontSize = `${fontSize}vw`;

            if (seg === " ") {
                span.innerHTML = "&nbsp;";
            } else {
                span.textContent = seg;
            }

            if (/\p{Emoji}\uFE0F|\p{Emoji_Presentation}/u.test(seg)) {
                span.className += " emoji";
            } else if (/[0-9]/.test(seg)) {
                span.className += " number";
            } else if (!/\p{L}/iu.test(seg)) {
                span.className += " symbol";
            }

            li.appendChild(span);
            container.appendChild(li);
        });
    }, [text]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle("dark-mode", !isDarkMode);
    };

    return (
        <>
            <div className="main">
                <span className="inputarea">
                    <input
                        ref={inputRef}
                        type="text"
                        className="inputbox"
                        tabIndex={1}
                        placeholder="Enter your text here"
                        value={text}
                        onChange={handleInputChange}
                    />
                    <span className="button-row">
                        <a href="#" onClick={(e) => { e.preventDefault(); setShowHelp(true); }}>
                            What is this?
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setShowShare(true); }}>
                            Share this text
                        </a>
                    </span>
                </span>

                <span id="darktoggle" onClick={toggleDarkMode}>
                    {isDarkMode ? "☀️" : "🌑"}
                </span>

                <ul ref={textContainerRef} className="text"></ul>

                <span className="about">
                    Made with love by <a href="https://dbader.org">Dan Bader</a>
                </span>
            </div>

            {/* Modals */}
            {showHelp && (
                <div className="modal-overlay" onClick={() => setShowHelp(false)}>
                    <div className="modal open js-help-modal" onClick={(e) => e.stopPropagation()}>
                        <h2>What is this?</h2>
                        <p>
                            This lets you <strong>display & share text in a very large font</strong> directly from your browser.
                        </p>
                        <p>
                            That&apos;s handy whenever you need to <strong>read something on your screen from further away</strong>
                            &mdash;for example, phone numbers and passwords.
                        </p>
                        <p>
                            When you share text, <strong>only the person with the link sees your text</strong>. Rendering happens
                            locally on your browser and your text is not transmitted to any servers.
                        </p>
                        <button className="js-modal-close" onClick={() => setShowHelp(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {showShare && (
                <div className="modal-overlay" onClick={() => setShowShare(false)}>
                    <div className="modal open js-share-modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Copy the link below:</h2>
                        <input
                            type="text"
                            className="js-share-link"
                            value={typeof window !== "undefined" ? window.location.href : ""}
                            readOnly
                            onClick={(e) => (e.target as HTMLInputElement).select()}
                        />
                        <button className="js-modal-close" onClick={() => setShowShare(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            <style jsx global>{`
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

        html,
        body {
          font-family: sans-serif;
          height: 100%;
          overflow: hidden;
          color: var(--main-color);
        }

        h1,
        h2 {
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
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075);
          font-family: sans-serif;
          font-size: 12px;
          min-height: 26px;
          outline: none;
          padding: 2px;
          text-align: center;
          width: 100%;
        }

        input:focus {
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075), 0 0 5px rgba(81, 167, 232, 0.5);
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
            opacity: 1;
          }
        }

        /*** Main *************************************************************/

        .main {
          background-color: var(--bg-color);
          align-items: center;
          color: var(--main-color);
          display: flex;
          flex-direction: column;
          height: 100vh;
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

        /*** Modals ***********************************************************/

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }

        .modal {
          -webkit-overflow-scrolling: touch;
          background: var(--modal-bg-color);
          border-radius: 3px;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.6);
          max-height: 90%;
          opacity: 0;
          overflow: auto;
          padding: 20px;
          pointer-events: none;
          transform: scale(0.7);
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
          transform: scale(1);
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
      `}</style>
        </>
    );
}
