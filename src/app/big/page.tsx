"use client";

import { useEffect, useState, useRef } from "react";
import Head from "next/head";

export default function LargeTypePage() {
    const [text, setText] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [showShare, setShowShare] = useState(false);

    // Use a ref for the input to manage focus without constant re-renders
    const inputRef = useRef<HTMLInputElement>(null);

    // Initialize Dark Mode and Hash Listener
    useEffect(() => {
        // Dark mode init
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDarkMode(mediaQuery.matches);

        const handleHashChange = () => {
            const hash = window.location.hash.substring(1); // remove #
            const decoded = decodeURIComponent(hash || "");
            setText(decoded === "" ? "" : decoded);
        };

        // Initial load
        handleHashChange();

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    // Update logic when text changes (via input)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setText(newVal);
        // Update hash without forcing a reload/jump
        window.location.replace("#" + encodeURIComponent(newVal));
    };

    // Focus input on load or interaction
    useEffect(() => {
        if (inputRef.current && text === "") {
            inputRef.current.focus();
        }
    }, [text]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    // Text Segmentation Logic (ported from original script.js)
    const segments: string[] = [];
    let textWidth = 0;

    if (typeof window !== "undefined") { // client-side checks
        if (window.Intl && (window.Intl as any).Segmenter) {
            const segmenter = new (window.Intl as any).Segmenter();
            const rawSegments = Array.from(segmenter.segment(text || " "));

            rawSegments.forEach((seg: any) => {
                segments.push(seg.segment);
                // Width estimation
                if (isEmoji(seg.segment)) {
                    textWidth += 1.65;
                } else {
                    textWidth += 1;
                }
            });
        } else {
            // Fallback
            const chars = (text || " ").split("");
            chars.forEach((c) => segments.push(c));
            textWidth = chars.length;
        }
    }

    // Calculate Font Size
    const fontSizeVW = Math.min(150 / (textWidth || 1), 30);

    function isEmoji(str: string) {
        return /\p{Emoji}\uFE0F|\p{Emoji_Presentation}/u.test(str);
    }

    function getCharClass(char: string) {
        if (isEmoji(char)) return "emoji";
        if (/[0-9]/.test(char)) return "number";
        if (!/\p{L}/u.test(char)) return "symbol"; // simplistic check
        return "";
    }

    // Copy Link Logic
    const shareLink = typeof window !== 'undefined' ?
        location.origin + '/big#' + encodeURIComponent(text) : '';

    return (
        <>
            <style jsx global>{`
        :root {
          --link-color: #b94669;
          --hover-color: #d36083;
          --active-color: #a02d50;
          --bg-odd-letters: white;
          --bg-even-letters: #f7f7f7;
          --modal-bg-color: white;
          --bg-color: white; /* Changed from unset to ensure white bg */
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
            background-color: var(--bg-color); /* Apply to body */
        }
        
        /* Reset Next.js/Tailwind bits that might conflict */
        .large-type-wrapper-reset * {
           box-sizing: content-box; 
        }

        .main-container {
            font-family: sans-serif;
            height: 100vh;
            overflow: hidden;
            color: var(--main-color);
            background-color: var(--bg-color);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            position: fixed; /* Take over screen */
            top: 0;
            left: 0;
            z-index: 50;
        }
        
        .inputarea {
            font-size: 12px;
            position: absolute;
            top: 10px;
            width: 30%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        @media only screen and (max-width: 700px) {
            .inputarea {
                width: 80%;
            }
        }

        .inputbox {
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
            color: var(--main-color);
            background: transparent;
        }
        
        .button-row {
            margin-top: 4px;
            display: flex;
            justify-content: center;
            gap: 10px;
        }
        
        .button-row a {
            color: var(--input-color);
            font-size: 11px;
            text-decoration: none;
            cursor: pointer;
        }
        .button-row a:hover {
            color: var(--main-color);
            text-decoration: underline;
        }
        
        #darktoggle {
            position: absolute;
            top: 10px;
            right: 15px;
            cursor: pointer;
            user-select: none;
            font-size: 20px;
        }

        .text-display {
            border-radius: 10px;
            border: 1px solid #eee; /* Light border default */
            box-shadow: 10px 10px 50px 5px var(--text-shadow-color);
            counter-reset: num-chars;
            overflow: hidden;
            padding: 0;
            margin: 0;
            display: flex;
            background: transparent;
            /* Allow wrapping? Original uses float left. Flex wrap is better */
            flex-wrap: wrap; 
            max-width: 95%;
            justify-content: center;
        }
        
        /* Original uses float left, let's stick closer to flex */
        .charbox {
            counter-increment: num-chars;
            display: flex;
            flex-direction: column;
            align-items: center;
            list-style: none;
            /* width handled by font-size? No, width is implicit. */
        }
        
        .charbox .char {
             font-family: monospace;
             /* font-size set inline */
             line-height: 1;
        }

        /* Coloring for types */
        .charbox .number { color: #456cad; }
        .charbox .symbol { color: #b94669; }
        .charbox .emoji { /* height adjustments if needed */ }

        .charbox:nth-child(odd) { background: var(--bg-odd-letters); }
        .charbox:nth-child(even) { background: var(--bg-even-letters); }

        .charbox::after {
            color: #aaa;
            content: counter(num-chars);
            display: block;
            font-size: 1.5vw;
            text-align: center;
            margin-top: 5px;
            margin-bottom: 5px;
        }

        .about {
            position: absolute;
            bottom: 10px;
            width: 100%;
            text-align: center;
            font-size: 12px;
            color: #999;
        }
        .about a { color: #666; text-decoration: none; }
        .about a:hover { text-decoration: underline; }

        /* Modal Styles */
        .modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5); /* Dimming */
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100;
        }
        .modal {
            background: var(--modal-bg-color);
            padding: 20px;
            border-radius: 4px;
            width: 50%;
            max-width: 600px;
            box-shadow: 0 0 20px rgba(0,0,0,0.5);
            position: relative;
            color: var(--main-color);
            max-height: 90vh;
            overflow-y: auto;
        }
        .modal h2 { font-size: 1.5em; margin-bottom: 10px; }
        .modal p { margin-bottom: 10px; line-height: 1.4; }
        .modal button.close {
            float: right;
            background: #b94669;
            border: none;
            color: white;
            padding: 6px 12px;
            border-radius: 2px;
            cursor: pointer;
            margin-top: 10px;
        }
        .modal button.close:hover { background: #d36083; }

        @media (max-width: 600px) {
            .modal { width: 90%; }
        }
      `}</style>

            {/* Body Class for Dark Mode */}
            <style jsx global>{`
        body {
            background-color: ${isDarkMode ? 'black' : 'white'};
        }
      `}</style>

            <div className={`main-container ${isDarkMode ? "dark-mode" : ""}`}>
                <div className="inputarea">
                    <input
                        ref={inputRef}
                        type="text"
                        className="inputbox"
                        placeholder="Enter your text here"
                        value={text}
                        onChange={handleInputChange}
                    />
                    <div className="button-row">
                        <a onClick={(e) => { e.preventDefault(); setShowHelp(true); }}>What is this?</a>
                        <a onClick={(e) => { e.preventDefault(); setShowShare(true); }}>Share this text</a>
                    </div>
                </div>

                <div id="darktoggle" onClick={toggleDarkMode}>
                    {isDarkMode ? "☀️" : "🌑"}
                </div>

                <ul className="text-display">
                    {segments.length === 0 ? (
                        // Placeholder space if empty (to keep structure? Original does space)
                        <li className="charbox" style={{ opacity: 0 }}>
                            <span className="char" style={{ fontSize: '30vw' }}>&nbsp;</span>
                        </li>
                    ) : (
                        segments.map((seg, i) => (
                            <li key={i} className="charbox">
                                <span
                                    className={`char ${getCharClass(seg)}`}
                                    style={{ fontSize: `${fontSizeVW}vw` }}
                                >
                                    {seg === ' ' ? '\u00A0' : seg}
                                </span>
                            </li>
                        ))
                    )}
                </ul>

                <div className="about">
                    Made with love by <a href="https://dbader.org" target="_blank">Dan Bader</a> (Ported to Next.js)
                </div>

                {/* Modals */}
                {showHelp && (
                    <div className="modal-overlay" onClick={() => setShowHelp(false)}>
                        <div className="modal" onClick={e => e.stopPropagation()}>
                            <h2>What is large-type.com?</h2>
                            <p>Large-type features lets you <strong>display & share text in a very large font</strong> directly from your browser.</p>
                            <p>Handy for reading phone numbers, passwords, etc. from across the room.</p>
                            <p>Text is rendered locally. Only people with the link see it.</p>
                            <button className="close" onClick={() => setShowHelp(false)}>Close</button>
                        </div>
                    </div>
                )}

                {showShare && (
                    <div className="modal-overlay" onClick={() => setShowShare(false)}>
                        <div className="modal" onClick={e => e.stopPropagation()}>
                            <h2>Copy the link below:</h2>
                            <input
                                type="text"
                                className="inputbox"
                                style={{ fontSize: '1.2em', padding: '10px' }}
                                value={shareLink}
                                readOnly
                                onClick={e => (e.target as HTMLInputElement).select()}
                            />
                            <p style={{ marginTop: '10px', fontSize: '12px' }}>
                                Share this URL with anyone you want to see the text.
                            </p>
                            <button className="close" onClick={() => setShowShare(false)}>Close</button>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}
