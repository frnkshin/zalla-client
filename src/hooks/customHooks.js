import React, {useRef, useEffect} from "react";

export const useInterval = (cb, delay) => {
  const lastCb = useRef();

  useEffect(() => {
    lastCb.current = cb;
  }, [cb]);

  useEffect(() => {
    const tick = () => {
      lastCb.current();
    };

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
