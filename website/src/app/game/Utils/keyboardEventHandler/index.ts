import dynamic from "next/dynamic";
import { KeyboardEventContext } from "./KeyboardEventContext";

const KeyboardEventContextProvider = dynamic(
  () => import("./KeyboardEventContext"),
  { ssr: false }
);

export { KeyboardEventContext, KeyboardEventContextProvider };
