"use client";

import { cn } from "../utils/utils.js";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// fontsource (if you're using @fontsource approach)
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/500.css";
import "@fontsource/raleway/600.css";
import "@fontsource/raleway/700.css";
import "@fontsource/raleway/800.css";
import "@fontsource/raleway/900.css";

/**
 * WordFlipper - flips between a list of words (one per sentence column)
 * props:
 *   words: { word: string, isHighlighted: boolean }[]
 *   wordIndex: number (column index used for transition delay)
 */
const WordFlipper = ({ words, wordIndex }) => {
  const wordRef = useRef(null);
  const [wordHeight, setWordHeight] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // measure height synchronously to avoid flicker
  useLayoutEffect(() => {
    const measure = () => {
      if (!wordRef.current) return;
      setWordHeight(wordRef.current.clientHeight);
    };
    measure();

    // stable handler for add/removeEventListener
    const handleResize = () => measure();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!Array.isArray(words) || words.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [words]);

  // Small debug aid: log when words change (remove in production)
  useEffect(() => {
    // console.debug(`WordFlipper col ${wordIndex}`, words);
  }, [words, wordIndex]);

  return (
    <motion.div
      layout="position"
      className="text-3xl md:text-4xl lg:text-5xl relative"
      data-debug={JSON.stringify({ wordIndex, words })}
    >
      {/* invisible sample used to measure height - keep it simple */}
      <p
        ref={wordRef}
        className="text-transparent opacity-0 select-none absolute"
        aria-hidden
      >
        sample
      </p>

      <div style={{ height: wordHeight }} className="overflow-hidden">
        <AnimatePresence mode="popLayout">
          {words.map((word, idx) => {
            if (idx !== currentIndex) return null;

            // inline fallback color (hex for blue-500) ensures color even if Tailwind wasn't built with this class
            const fallbackStyle = word.isHighlighted
              ? { color: "#a246f3" }
              : undefined;

            return (
              <motion.p
                key={"word" + idx}
                initial={{
                  opacity: 0,
                  filter: "blur(10px)",
                  y: wordHeight / 2,
                }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(10px)", y: -wordHeight / 2 }}
                transition={{
                  duration: 0.1,
                  ease: "easeInOut",
                  delay: wordIndex * 0.1,
                }}
                className={cn(
                  "py-0.5",
                  // Use your font family class if you configured Tailwind, otherwise fallback to standard font
                  "font-raleway",
                  word.isHighlighted
                    ? "font-semibold text-blue-500"
                    : "font-light text-gray-900"
                )}
                style={fallbackStyle}
              >
                {word.word}
              </motion.p>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/**
 * SentenceFlip - takes array of sentences: { sentence: string, highlight: number[] }
 */
const SentenceFlip = ({ sentences }) => {
  const [cols, setCols] = useState(0);

  useEffect(() => {
    if (!Array.isArray(sentences) || sentences.length === 0) {
      setCols(0);
      return;
    }

    // find longest sentence by number of words
    const longest = sentences.reduce((acc, cur) => {
      const accLen = acc.split(" ").length;
      const curLen = cur.sentence.split(" ").length;
      return curLen > accLen ? cur.sentence : acc;
    }, "");
    setCols(longest.split(" ").length);
  }, [sentences]);

  return (
    <div className="w-full flex flex-col justify-center ">
      <div className="max-w-3xl place-self-center w-full " >
        <div className="flex flex-wrap gap-x-2 justify-start ">
          {Array.from({ length: cols }).map((_, colIndex) => {
            // Build a list of words for this column (one per sentence),
            // and normalize highlight arrays to numbers safely.
            const wordsToFlip = sentences.map((s) => {
              const splits = s.sentence.split(" ");
              // normalize highlight -> set of numbers (handles string numbers too)
              const highlightSource = Array.isArray(s.highlight)
                ? s.highlight
                : [];
              const highlightSet = new Set(
                highlightSource
                  .map((v) => {
                    const n = Number(v);
                    return Number.isNaN(n) ? null : n;
                  })
                  .filter((v) => v !== null)
              );

              const exists = splits.length > colIndex;
              const wordText = exists ? splits[colIndex] : "";

              const isHighlighted = exists && highlightSet.has(colIndex);

              return { word: wordText, isHighlighted };
            });

            // debug attribute for quick inspection in devtools (remove in prod)
            return (
              <React.Fragment key={"sentence-col-" + colIndex}>
                <WordFlipper words={wordsToFlip} wordIndex={colIndex} />
                {(colIndex + 1) % 4 === 0 && <div className="w-full" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SentenceFlip;
