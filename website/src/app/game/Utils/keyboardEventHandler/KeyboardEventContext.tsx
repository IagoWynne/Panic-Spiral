import { createContext, PropsWithChildren, useEffect, useState } from "react";
import KeyboardEventHandler, {
  IKeyboardEventHandler,
} from "./KeyboardEventHandler";

export const KeyboardEventContext = createContext<IKeyboardEventHandler>({
  addKeyDownHandler: (_) => {},
  removeKeyDownHandler: (_, __) => {},
  addKeyUpHandler: (_) => {},
  removeKeyUpHandler: (_, __) => {},
});

const KeyboardEventContextProvider = ({ children }: PropsWithChildren) => {
  const [keyboardEventHandler] = useState(() => new KeyboardEventHandler());

  useEffect(() => {
    return () => {
      keyboardEventHandler.release();
    };
  }, []);

  return (
    keyboardEventHandler && (
      <KeyboardEventContext.Provider value={keyboardEventHandler}>
        {children}
      </KeyboardEventContext.Provider>
    )
  );
};

export default KeyboardEventContextProvider;
