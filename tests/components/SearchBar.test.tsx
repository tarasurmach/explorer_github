import SearchBar from "../../src/components/SearchBar.js";
import {act, fireEvent, render, renderHook, screen} from "@testing-library/react";
import {beforeEach, expect, vi} from "vitest";

import {useAppStore, useRepoUrl} from "../../src/store/store.js";




describe("SearchBar", () => {

    it("renders components and ensures event handlers ", async () => {
        const {getByTestId, getByPlaceholderText} = render(<SearchBar/>);
        const element = getByTestId("searchbar")
        expect(element).toBeInstanceOf(HTMLDivElement);
        const mockRepoUrl = 'url';
        const input = getByPlaceholderText("Enter repository URL...");


        const {result} = renderHook(() => useAppStore());
        const spyOnUseRepoURL = vi.spyOn(result.current, "setRepoUrl");
        spyOnUseRepoURL.mockImplementation((args)=>{
            result.current.repoUrl = args;
        })

        //fireEvent.change(input, { target: { value: mockRepoUrl } });
        fireEvent.keyDown(input);

        //expect(result.current.repoUrl).toBe(mockRepoUrl);
        const reactURL = "https://github.com/facebook/reac";
        act(()=> {
            result.current.setRepoUrl(reactURL)
        });
        expect(spyOnUseRepoURL).toHaveBeenCalledWith(reactURL)
        expect(result.current.repoUrl).toEqual(reactURL);
        fireEvent.keyDown(input, {key:"Enter"});



        screen.debug(element)


    });
    it('should handle search event with appropriate URL', () => {

        const {getByTestId} = render(<SearchBar/>);
        const searchIcon = getByTestId("searchIcon");
        const input = getByTestId("searchinput")


        const mockURL = "https://github.com/pmndrs/zustand";
        fireEvent.change(input, {target:{value:mockURL}})
        fireEvent.click(searchIcon);

        screen.debug(input)
        const {result} = renderHook(() => useAppStore());
        act(()=> result.current.setErrorMsg(null))

        expect(result.current.errorMsg).toBeNull();
    });
    /*it(() => {

    })*/
})