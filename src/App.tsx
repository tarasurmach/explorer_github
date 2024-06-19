import './App.css'
import IssuesList from "./components/IssuesList.tsx";
import SearchBar from "./components/SearchBar.tsx";
import RepoInfo from "./components/RepoInfo.tsx";
import {Box} from "@chakra-ui/react";

function App() {
    return (
        <Box m={"auto"} maxW={1200} padding={10} height={950}>
            <SearchBar/>
            <RepoInfo/>
            <IssuesList />
        </Box>

    )
}

export default App
