import {notEmptyIssues, statuses, StatusIssuesMap} from "../utils/helpers.ts";
import IssuesColumn from "./IssuesColumn/IssuesColumn.tsx";

import {
    useErrorMsg,
    useGroupedIssues,
    useIssuesActions,
    useRepoInfo,
    useSetError
} from "../store/store.ts";

import {DropResult, DragDropContext} from "react-beautiful-dnd";
import {localStorageWrapper} from "../utils/storageWrapper.ts";
import {Flex, Text} from "@chakra-ui/react";
import {useTimedError} from "../hooks/useTimedError.ts";




const IssuesList = () => {
    const groupedIssues = useGroupedIssues();
    const errorMsg = useErrorMsg();
    const setError = useSetError()
    const {setGroupedIssues} = useIssuesActions();
    const {name, owner} = useRepoInfo();
    useTimedError(errorMsg, setError)
    console.log(groupedIssues)

    const handleDragEnd = (event:DropResult) => {
        const {destination, source} = event;
        if(!destination) return;
        if(destination.droppableId === source.droppableId  && destination.index === source.index) return;
        const sourceColumn = {...groupedIssues} as StatusIssuesMap;
        const [removedIssue] = sourceColumn[source.droppableId].splice(source.index, 1);
        sourceColumn[destination.droppableId].splice(destination.index, 0, removedIssue);
        setGroupedIssues(sourceColumn);
        localStorageWrapper.set(`${owner}/${name}`, sourceColumn);
    }
    let content;
    if(errorMsg) {
        content = <Text>{errorMsg}</Text>
    }else if(!groupedIssues) {
        content = "";
    }else if(!notEmptyIssues(groupedIssues)) {
        content = <Text>This repository has no issues</Text>
    }else {
        content = (
            <DragDropContext onDragEnd={handleDragEnd}>
                <Flex gap={"0.5rem"} width={"95%"} m={"auto"} h={"80%"} mb={5} data-testid="issuesList">
                    {Object.keys(statuses).map((status, index) => <IssuesColumn status={status} issues={groupedIssues[status]} key={index.toString()} index={index}/>)}
                </Flex>
            </DragDropContext>
        )
    }
    return content;
};

export default IssuesList;