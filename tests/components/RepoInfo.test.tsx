import RepoInfo from "../../src/components/RepoInfo.js";
import {act, render, renderHook, screen} from "@testing-library/react";
import {expect, vi} from "vitest";
import {initInfo} from "../../src/utils/api.js";
import {useAppStore, useRepoInfo} from "../../src/store/store.js";



describe("RepoInfo component", ()=>{
    /*vi.mock("../../src/store/store.js", async (importOriginal) => {
        const actual = await importOriginal();

        return {
            ...actual,
            // your mocked methods
        }
    })*/


    it('renders repository information correctly', () => {

        const {result} = renderHook(() => useAppStore());

        const { getByText, getByTestId } = render(<RepoInfo />);
        const repoInfoDiv = getByTestId("repoinfo");
        const newName = "pmndrs";
        act(() => {
            result.current.updateRepoInfo({...result.current.repoInfo, name:"pmndrs"})
        });
        const nameElement = getByText(newName.charAt(0).toUpperCase() + newName.slice(1))
        expect(result.current.repoInfo.name).toEqual(newName)
        screen.debug(repoInfoDiv);




    });

})