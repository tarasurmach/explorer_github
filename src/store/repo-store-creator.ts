import {create, GetState, SetState} from "zustand";
import {fetchData, initInfo, RepoInfo} from "../utils/api.ts";
import {URLs} from "../utils/constants.ts";
import {createRepoInfo} from "../utils/helpers.ts";

import {CombinedState, useAppStore} from "./store.ts";

type RepoData = {
    searchQuery:string;
    repoInfo:RepoInfo;

}
type RepoActions = {
    setSearchQuery:(query:string) => void,
    setRepoInfo:() => void,
    updateRepoInfo:(repoInfo:RepoInfo)=>void
}
export type RepoState = RepoData & RepoActions
export const createRepoStore = (set:SetState<CombinedState>, get:GetState<CombinedState>) => ({
    searchQuery:'',
    repoInfo:initInfo,
    setSearchQuery:(searchQuery:string) => {
        set({searchQuery});
    },
    setRepoInfo: async () => {
        const url = get().searchQuery;
        try {
            const {items} = await fetchData(URLs.SearchRepo(url));
            const [data] = items;

            set({repoInfo:createRepoInfo(data)});
            set({errorMsg:null})
        } catch (error) {
            if(error instanceof Error) {
                console.log(error)
                set({errorMsg:error.message});
                set({repoInfo:initInfo})
            }
        }
        },
    updateRepoInfo:(repoInfo:RepoInfo) => {
        set({repoInfo})
    }

});

export const useRepoUrl = () => useAppStore((state) => state.searchQuery);
export const useRepoInfo = () => useAppStore(state => state.repoInfo);
export const useRepoActions = () => useAppStore(({setSearchQuery, setRepoInfo}) => ({setSearchQuery, setRepoInfo}))

