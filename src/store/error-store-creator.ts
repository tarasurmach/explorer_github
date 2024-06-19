import {SetState} from "zustand";
import {useAppStore} from "./store.ts";

type ErrorMsg = string|null;
export type ErrorState = {
    errorMsg:ErrorMsg;
    setErrorMsg:(errorMsg:ErrorMsg) => void;
}
export const createErrorStore = (set:SetState<ErrorState>) => ({
    errorMsg:null,
    setErrorMsg:(errorMsg:ErrorMsg) => set({errorMsg})
})
export const useSetError = () => useAppStore(state => state.setErrorMsg);
export const useErrorMsg = () => useAppStore(state => state.errorMsg)