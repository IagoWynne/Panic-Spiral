"use client";

import Image from "next/image";
import PanicSpiralGame from "./game";
import { useRef } from "react";

export default function Home() {
  const gameParentRef = useRef(null);

  return (
    <div className="grid grid-cols-[64px_1fr_64px] grid-rows-[64px_1fr] gap-4 items-center justify-center">
      <Image
        // className="dark:invert"
        src="/panic-spiral.jpg"
        alt="Panic Spiral Logo"
        width={64}
        height={64}
        priority
      />
      <h1 className="text-red-500 font-bold">Panic Spiral</h1>
      <div className="col-start-2" ref={gameParentRef}>
        <PanicSpiralGame parentRef={gameParentRef}/>
      </div>
    </div>
  );
}
