import {StatusIssuesMap} from "../../src/utils/helpers.js";

export const mockIssues:StatusIssuesMap = {
    open:[
        {
            id: 1,
            title: "Fix bug in authentication",
            url: "https://github.com/example/repo/issues/1",
            state: "open",
            updated_at: "2022-04-01T12:00:00Z",
            comments: 3,
            number: 1,
            assignee: null,
            closed_at: null,
            updated_ago: "2 days ago",
        },
    ],
    progress: [
        {
            id: 4,
            title: "Add new ",
            url: "https://github.com/example/repo/issues/4",
            state: "closed",
            updated_at: "2022-03-15T10:30:00Z",
            comments: 2,
            number: 4,
            assignee: { name: "John Doe", role: "Developer" },
            closed_at: null,
            updated_ago: null,
        }
    ],
    closed: [
        {
            id: 2,
            title: "Add new feature",
            url: "https://github.com/example/repo/issues/2",
            state: "closed",
            updated_at: "2022-03-15T10:30:00Z",
            comments: 5,
            number: 2,
            assignee: { name: "John Doe", role: "Developer" },
            closed_at: "2022-03-20T14:45:00Z",
            closed_ago: "5 days ago",
            updated_ago: null,
        },
    ]
};