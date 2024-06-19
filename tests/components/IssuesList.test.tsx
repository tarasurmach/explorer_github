import IssuesList from "../../src/components/IssuesList.js";
import {act, render, renderHook, screen, within} from "@testing-library/react";
import {useAppStore} from "../../src/store/store.js";
import {mockIssues} from "../utils/mock_issues.js";
import {expect} from "vitest";
import IssuesColumn from "../../src/components/IssuesColumn/IssuesColumn.js";
import IssueCard from "../../src/components/IssueCard/IssueCard.js";

vi.mock("react-beautiful-dnd", () => ({
    Droppable:({children}) => children({
        draggableProps:{
            style:{}
        },
        innerRef: vi.fn(),
    }, {}),
    Draggable: ({ children }) => children({

        draggableProps: {
            style: {},
        },
        innerRef: vi.fn(),
    }, {}),
    DragDropContext: ({ children }) => children,

}))
describe("IssuesList component", () => {
    const {result} = renderHook(() => useAppStore());
    expect(result.current.groupedIssues).toBeNull();
    const spyOnSetIssues = vi.spyOn(result.current, "setGroupedIssues");
    act(() => {
        result.current.setGroupedIssues(mockIssues)
    });
    expect(spyOnSetIssues).toHaveBeenCalled()

    it('Renders IssuesList properly', () => {
        const {getByTestId, getByText} = render(<IssuesList/>);
        const listContainer = getByTestId("issuesList");
        const {getAllByRole} = within(listContainer);
        const columns = getAllByRole("column");
        expect(columns.length).toBe(3);


    });
    it('Renders IssueColumn', () => {
        const {getByText ,rerender} = render(<IssuesColumn status={"open"} issues={result.current.groupedIssues.open} key={"0"} index={0}/>);
        const openIssuesColumn = getByText(/Open/s);
        expect(openIssuesColumn.textContent).toHaveLength(4)
        expect(spyOnSetIssues).toBeCalled();
        act(()=> {
            const copyArr = Object.assign({}, result.current.groupedIssues);
            const [openIssue] = copyArr.open.splice(0, 1);
            copyArr.progress.unshift(openIssue);
            result.current.setGroupedIssues(copyArr);

        });

        rerender(<IssuesColumn status={"open"} issues={result.current.groupedIssues.open} key={"0"} index={0}/>);
        const openIssues = screen.getByTestId(/column/s);
        screen.debug(openIssues);
        expect(result.current.groupedIssues.open).toHaveLength(0);
        expect(openIssues.textContent).toHaveLength(0);
    });
    it('Renders IssueCard', () => {
        const {getByRole} = render(<IssueCard issue={result.current.groupedIssues.progress[0]} index={0}/>);
        const issueCard = getByRole("card");
        screen.debug(issueCard);
        expect(issueCard.innerHTML).toBeTruthy()

    });
})