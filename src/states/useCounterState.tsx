import { useCallback, useContext } from "react";
import { CounterContext } from "./counter.context";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function fetchNumber(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getRandomNumber(0, 100));
    }, 2000);
  });
}

export const useCounterState = () => {
  const { counter, setCounter, loader, setLoader } = useContext(CounterContext);
  const fetchCounter = useCallback(async () => {
    if (loader) {
      return;
    }
    setLoader(true);
    const newNumber = await fetchNumber();
    setCounter(newNumber);
    setLoader(false);
    /*fetchNumber()
      .then((newNumber) => {
        setCounter(newNumber);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });*/
  }, [loader]);
  return { counter, setCounter, fetchCounter, loader };
};
