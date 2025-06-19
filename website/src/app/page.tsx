"use client";

import PanicSpiralGame from "./game";
import { useRef } from "react";

export default function Home() {
  const gameParentRef = useRef(null);

  return (
      <div ref={gameParentRef}>
        <PanicSpiralGame parentRef={gameParentRef}/>
      </div>
  );
}
