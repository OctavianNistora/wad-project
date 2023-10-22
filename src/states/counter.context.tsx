import { createContext, useState, PropsWithChildren, useMemo } from "react";

type CounterState = {
  counter?: number;
  setCounter: React.Dispatch<React.SetStateAction<number | undefined>>;
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CounterContext = createContext<CounterState>({
  counter: undefined,
  setCounter: () => null,
  loader: false,
  setLoader: () => null,
});

export const CounterContextProvider = (
  props: PropsWithChildren<Record<never, any>>
) => {
  const { children } = props;
  const [counter, setCounter] = useState<number | undefined>();
  const [loader, setLoader] = useState(false);
  const counterValue = useMemo(
    () => ({ counter, setCounter, loader, setLoader }),
    [counter, setCounter, loader, setLoader]
  );
  return (
    <CounterContext.Provider value={counterValue}>
      {children}
    </CounterContext.Provider>
  );
};
