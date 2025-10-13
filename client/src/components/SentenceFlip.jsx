"use client";

import { cn } from "../utils/utils.js";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/500.css";
import "@fontsource/raleway/600.css";
import "@fontsource/raleway/700.css";
import "@fontsource/raleway/800.css";
import "@fontsource/raleway/900.css";

/* WordFlipper: show one word at a time from a column */
const WordFlipper = ({ words, wordIndex }) => {
  const wordRef = useRef(null);
  const [wordHeight, setWordHeight] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!wordRef.current) return;
      setWordHeight(wordRef.current.clientHeight || 28);
    };
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!Array.isArray(words) || words.length === 0) return;
    const id = setInterval(
      () => setCurrentIndex((p) => (p + 1) % words.length),
      1500
    );
    return () => clearInterval(id);
  }, [words]);

  // fallback font-size that scales with viewport
  const sizeClass =
    "text-[clamp(1.25rem,4vw,2.5rem)] sm:text-[clamp(1.5rem,4.5vw,3rem)]";

  return (
    <motion.div layout="position" className={`relative ${sizeClass} min-w-0`}>
      {/* invisible sample used to measure height */}
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
            const fallbackStyle = word.isHighlighted
              ? { color: "#a246f3" }
              : undefined;

            return (
              <motion.p
                key={"word" + idx}
                initial={{ opacity: 0, filter: "blur(6px)", y: wordHeight / 2 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(6px)", y: -wordHeight / 2 }}
                transition={{
                  duration: 0.14,
                  ease: "easeInOut",
                  delay: wordIndex * 0.06,
                }}
                className={cn(
                  "py-0.5 font-raleway min-w-0 break-words",
                  word.isHighlighted ? "font-semibold" : "font-light",
                  word.isHighlighted ? "text-blue-500" : "text-gray-900"
                )}
                style={fallbackStyle}
              >
                {word.word || "\u00A0" /* preserve height when word is empty */}
              </motion.p>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* SentenceFlip: split sentences into columns and rotate each column's words */
const SentenceFlip = ({ sentences = [] }) => {
  const [cols, setCols] = useState(0);

  useEffect(() => {
    if (!Array.isArray(sentences) || sentences.length === 0) {
      setCols(0);
      return;
    }
    const longest = sentences.reduce((acc, cur) => {
      const a = acc.split(" ").length;
      const b = cur.sentence.split(" ").length;
      return b > a ? cur.sentence : acc;
    }, sentences[0].sentence || "");
    setCols(longest.split(" ").length);
  }, [sentences]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[680px]">
        <div className="flex flex-wrap gap-x-2 gap-y-1 justify-center items-center">
          {Array.from({ length: cols }).map((_, colIndex) => {
            const wordsToFlip = sentences.map((s) => {
              const splits = s.sentence.split(" ");
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
              // highlights are 1-based in your examples; adjust if needed
              const isHighlighted = exists && highlightSet.has(colIndex + 1);

              return { word: wordText, isHighlighted };
            });

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
