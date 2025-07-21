"use client";

import Game from "./game";
import { useRef } from "react";

export default function Home() {
  const gameParentRef = useRef(null);

  return (
      <div className="h-[800px]" ref={gameParentRef}>
        <Game parentRef={gameParentRef}/>
      </div>
  );
}
