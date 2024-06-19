import {ChangeEvent, Dispatch, KeyboardEvent, useEffect, useRef} from "react";
import {Search2Icon} from "@chakra-ui/icons"



import {

    useIssuesActions,
    useRepoActions,
    useRepoInfo,
    useRepoUrl,
    useSetError
} from "../store/store.ts";
import {usePrevious} from "../hooks/usePrevious.ts";
import {localStorageWrapper} from "../utils/storageWrapper.ts";
import {StatusIssuesMap, updatedIssues} from "../utils/helpers.ts";

import {Box, HStack, Input} from "@chakra-ui/react";


const SearchBar = () => {
    const searchQuery = useRepoUrl()
    const {setRepoInfo, setSearchQuery} = useRepoActions();
    const {setGroupedIssues, fetchData} = useIssuesActions();
    const {name, owner} = useRepoInfo()
    const setError = useSetError()
    const prevSearchQuery = usePrevious<string>(`${owner}/${name}`);

    const handleSearch = () => {
        if(prevSearchQuery === searchQuery) {
            setError("Invalid URl. Please try again")
            return;
        }

        setRepoInfo();

    }
    const handleKeyboardInput = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== "Enter") return;
        handleSearch()

    }
    useEffect(() => {
        const existingIssues = localStorageWrapper.getItem<StatusIssuesMap>(`${owner}/${name}`)
        if(existingIssues) {
            setGroupedIssues(updatedIssues(existingIssues));
            return;
        }
        if(!owner) return;
        fetchData()
    }, [name, owner]);
    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }

    return (
        <Box width={500} height={30} margin={"1rem auto"} data-testid="searchbar">
            <HStack w={"inherit"} h={"inherit"} gap={0}>
                <Input onKeyDown={handleKeyboardInput} value={searchQuery} onChange={handleInputChange} placeholder={"Enter repository URL..."} w={"inherit"} h={"inherit"} data-testid="searchinput"/>
                <Search2Icon onClick={handleSearch} ml={-25}  cursor={"pointer"} data-testid={"searchIcon"}/>

            </HStack>
        </Box>
    );
};

export default SearchBar;