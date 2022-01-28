import { useEffect, useRef } from "react";

export function useInterval(
    callback: undefined | (() => void),
    delay: number | null | undefined,
    stopFlag: any
) {
    const savedCallback = useRef();
    //Remember the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        let id: NodeJS.Timer;
        function tick() {
            savedCallback.current();
            if (stopFlag) {
                clearInterval(id);
            }
        }
        if (delay !== null && !stopFlag) {
            id = setInterval(tick, delay);
            return () => {
                clearInterval(id);
            };
        }
    });
}
