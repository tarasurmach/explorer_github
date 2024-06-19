import {useEffect} from "react";

export const useTimedError = (msg:string|null, setMsg:(msg:string|null)=>void) => {
    useEffect(() => {
        if(!msg) return;
        const timeout = setTimeout(()=>{
            setMsg(null)
        }, 3000);
        return () => {
            clearTimeout(timeout)
        };
    }, [msg]);
}
