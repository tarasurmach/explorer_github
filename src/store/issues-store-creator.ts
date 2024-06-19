import { GetState, SetState} from "zustand";

import {

    groupIssuesByStatuss,
    Issue,
    StatusIssuesMap
} from "../utils/helpers.ts";
import {CombinedState, useAppStore} from "./store.ts";
import {URLs} from "../utils/constants.ts";
import {fetchData} from "../utils/api.ts";



export type IssuesData  = {

    groupedIssues:StatusIssuesMap|null;


};
export type IssuesActions = {
    setGroupedIssues:(groupedIssues:StatusIssuesMap) => void;
    fetchData:()=>void

}
export type IssuesState = IssuesData & IssuesActions
export const createIssuesStore = (set:SetState<CombinedState>, get:GetState<CombinedState>) => ({

    groupedIssues:null,
    fetchData:async () => {
        const {owner, name} = get().repoInfo;
        try {
            console.log(owner, name)
            const issues = await fetchData<Issue>(URLs.ISSUES(owner, name));
            console.log(groupIssuesByStatuss(issues))
            set({groupedIssues:groupIssuesByStatuss(issues)});

        }catch (e) {
            if(e instanceof Error) {
                set({errorMsg:e.message});
                set({groupedIssues:null})
            }
        }},
    setGroupedIssues:(groupedIssues) => {

        console.log("setting grouped")
        set({groupedIssues})
    },

})

export const useGroupedIssues = () => useAppStore(state => state.groupedIssues);
export const useIssuesActions = () => useAppStore(({setGroupedIssues, fetchData}) => ({fetchData, setGroupedIssues}))
