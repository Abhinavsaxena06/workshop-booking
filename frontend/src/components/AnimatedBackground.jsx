import React from "react";

export default function AnimatedBackground() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(120deg, #1e3c72, #2a5298)",
      zIndex: -1
    }}>
    </div>
  );
}