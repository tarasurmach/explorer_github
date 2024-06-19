import {useEffect, useRef} from "react";

export const usePrevious = <T>(stateValue:T, ...deps:any[]) => {
    console.log(deps)
    const prevRef = useRef<T>();
    useEffect(() => {
        console.log("setting new previous")
        prevRef.current = stateValue
    }, deps);
    return prevRef.current;
}