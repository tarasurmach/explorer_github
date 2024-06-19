import {afterEach, beforeEach, vi} from "vitest";
import * as zustand from "zustand"
import {act} from "@testing-library/react";
import {StateCreator} from "zustand";
const {create:actualCreate, createStore:actualCreateStore} = await vi.importActual<typeof zustand>("zustand");

const storeResetFns = new Set<() => void>();

// when creating a store, we get its initial state, create a reset function and add it in the set
export const create =
    () =>
        <S>(createState: StateCreator<S>) => {
            const store = actualCreate(createState);
            const initialState = store.getState();
            storeResetFns.add(() => store.setState(initialState, true));

            return store;
        };

// Reset all stores after each test run
beforeEach(() => {
    act(() => storeResetFns.forEach(resetFn => resetFn()));
});
afterEach(() => {
    storeResetFns.forEach((resetFn) => resetFn());
});