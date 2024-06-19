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