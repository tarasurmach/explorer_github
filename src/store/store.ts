import {create, GetState, SetState, StoreApi, UseBoundStore} from "zustand";
import { createIssuesStore, IssuesState, /*useIssues,*/ useGroupedIssues, useIssuesActions} from "./issues-store-creator.ts";
import {createRepoStore, RepoState, useRepoUrl, useRepoInfo, useRepoActions} from "./repo-store-creator.ts";
import {createErrorStore, ErrorState, useErrorMsg, useSetError} from "./error-store-creator.ts";
export type CombinedState = IssuesState & RepoState & ErrorState
export const useAppStore:UseBoundStore<StoreApi<CombinedState>> = create((set, get) => ({
        ...createIssuesStore(set, get as unknown as GetState<CombinedState>),
        ...createRepoStore(set, get as unknown as GetState<CombinedState>),
        ...createErrorStore(set as unknown as SetState<CombinedState>)
}))
export {useRepoUrl, useRepoInfo, useRepoActions};

export {useIssuesActions, useGroupedIssues}
export {useErrorMsg, useSetError}
