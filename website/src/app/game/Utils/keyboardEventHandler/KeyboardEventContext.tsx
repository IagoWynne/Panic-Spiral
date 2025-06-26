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
  const [keyboardEventHandler, setKeyboardEventHandler] =
    useState<KeyboardEventHandler>();

  useEffect(() => {
    if (!keyboardEventHandler) {
      setKeyboardEventHandler(new KeyboardEventHandler());
    }

    return () => {
      if (keyboardEventHandler) {
        keyboardEventHandler.release();
      }
    };
  }, [keyboardEventHandler]);

  return (
    keyboardEventHandler && (
      <KeyboardEventContext.Provider value={keyboardEventHandler}>
        {children}
      </KeyboardEventContext.Provider>
    )
  );
};

export default KeyboardEventContextProvider;
