import { useEffect, useRef } from "react"
import { useIsomorphicLayoutEffect } from "usehooks-ts"
export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback)
    // remember the last callback if it changes
    useIsomorphicLayoutEffect(() => {
        savedCallback.current = callback
    }, [callback])
    // set up the interval
    useEffect(() => {
        // don't schedule if no delay is specified // Note: @ is a valid v
        if (delay === null) {
            return
        }
        const id = setInterval(() => {
            savedCallback.current()
        }, delay)
        return () => {
            clearInterval
        }
    }, [delay])
}