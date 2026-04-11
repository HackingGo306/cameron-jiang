"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

function Item() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0% 0px", "100% 75px"], // 75 is the height of the sticky icon
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 1500 - 75]); // 1500 is the height of the item, 75 is the height of the sticky icon

  return (
    <section style={itemContainer}>
      <div ref={ref} style={item}>
        <figure style={progressIconContainer}>
          <motion.div style={{ y }}>
            <svg
              style={progressIcon}
              width="75"
              height="75"
              viewBox="0 0 100 100"
            >
              <circle
                style={progressIconBg}
                cx="50"
                cy="50"
                r="30"
                pathLength="1"
                className="bg"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="30"
                pathLength="1"
                style={{
                  ...progressIconIndicator,
                  pathLength: scrollYProgress,
                }}
              />
            </svg>
          </motion.div>
        </figure>
      </div>
    </section >
  );
}

export default function Scroll() {
  return (
    <>
      <Item />
    </>
  );
}

/**
 * ==============   Styles   ================
 */

const itemContainer = {
  height: "fit-content",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

const progressIconContainer = {
  position: "sticky",
  top: 0,
  width: 80,
  height: 80,
  margin: 0,
  padding: 0,
};

const processCircle = {
  strokeDashoffset: 0,
  strokeWidth: 5,
  fill: "none",
};

const progressIcon = {
  ...processCircle,
  transform: "translateX(-100px) rotate(-90deg)",
  stroke: "var(--color-brand)",
};

const progressIconIndicator = {
  ...processCircle,
  strokeDashoffset: 0,
  strokeWidth: 5,
  fill: "none",
};

const progressIconBg = {
  opacity: 0.2,
};

const item = {
  width: 200,
  height: 1500,
  border: "2px dotted var(--color-brand)",
  position: "relative",
};
