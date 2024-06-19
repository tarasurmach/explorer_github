import {initInfo} from "./api.ts";

export const extractCredentials = (url:string): [string,string] => {
    const arr = url.split("/");
    return [arr[arr.length-3], arr[arr.length-2]]
}
export const extractCredentialsFromRepoURL = (repoURL:string):[string, string] => {
    const [_, rest] = repoURL.split(".com/");
    const segments = rest.split("/");
    console.log(segments)
    return [segments[0], segments[1]]

}
export const isValidURL = (newUrl:string, oldUrl?:string):boolean => {
    console.log(newUrl + "____" + oldUrl);
    if(!/^https:\/\/github\.com(?:\/[^\/]+){2,}$/g.test(newUrl)) return false;
    if(!oldUrl) return true;

    const [oldOwner, oldName] = extractCredentialsFromRepoURL(oldUrl);
    const [owner, name] = extractCredentialsFromRepoURL(newUrl);
    const old = `${oldOwner}-${oldName}`;
    const neww = `${owner}-${name}`;

    return old !== neww
}
export const createRepoInfo = (repositoryInfo:any) => {
    const newObj = Object.assign({}, initInfo);
    for (const key in initInfo) {
        if(key === "owner") {
            newObj[key] = repositoryInfo[key].login;
            continue;
        }
        (newObj[key]) = repositoryInfo[key];
    }
    return newObj;

}
type Helper<T = "closed"|"open"> = T extends "closed" ? string : "open"
export type Issue = {
    id:number,
    title:string,
    url:string,
    state:"open"|"closed",
    updated_at:string,
    comments:number,
    number:number,
    assignee:null|Object,
    closed_at:Helper,
    closed_ago?:string,
    updated_ago?:string

}
export const statuses = {
    open:"Open",
    progress:"In progress",
    closed: "Closed"
};

export type StatusIssuesMap = Record<keyof typeof statuses, Issue[]>
export const initIssues:StatusIssuesMap = {
    "open":[],
    "progress":[],
    "closed":[]
}
export const getTimeAgo = (dateString:string): string => {
    const currentDate = new Date();
    const newDate = new Date(dateString)
    const utcDate = new Date(newDate.toISOString().slice(0, 10));
    const utcCurrentDate = new Date(currentDate.toISOString().slice(0, 10));

    const oneDay = 24 * 60 * 60 * 1000;
    const daysDifference = Math.floor((utcCurrentDate.getTime() - utcDate.getTime()) / oneDay);

    if(daysDifference === 0) {
        return "today"
    }
    if(daysDifference === 1) {
        return "yesterday";
    }
    return `${daysDifference} days ago`

}
export const getStarsCount = (stargazer:number):string => {
    if(stargazer < 1000) return stargazer.toString();
    if(stargazer < 10000) {
        const thousands = Math.floor(stargazer/1000);
        const hundreds = Math.floor((stargazer%1000) / 100);
        return `${thousands}.${hundreds}K`;
    }
    if(stargazer < 1000000) return `${Math.floor(stargazer/1000)}K`;
    return `${Math.floor(stargazer/1000000)}M`
}

const transformIssue = ({comments, id, title, url, state, updated_at, number, assignee, closed_at}:any):Issue => ({
    comments,
    id,
    title,
    url,
    state,
    updated_at,
    number,
    assignee,
    closed_at
})


export const groupIssuesByStatuss = (unorderedIssues:any[]) => {
    return unorderedIssues.reduce<StatusIssuesMap>((prev, curr)=>{
        let status:keyof typeof statuses;
        const issue = transformIssue(curr)
        if(issue.assignee && issue.state === "open") {
            status = "progress";
            issue.updated_ago = getTimeAgo(issue.updated_at)
        }else if(issue.closed_at){
            status = "closed";
            issue.closed_ago = getTimeAgo(issue.closed_at)
        }else {
            status= "open";
            issue.updated_ago = getTimeAgo(issue.updated_at)
        }
        prev[status].push(issue)
        return prev;
    },
        Object.keys(statuses).reduce((prev, curr) => ({...prev, [curr]:[]}), {} as StatusIssuesMap))

}
export const notEmptyIssues = (issuesMap:StatusIssuesMap) => {
    for (const key in issuesMap) {
        if(issuesMap[key].length > 0) return true;
    }
    return false;
}


export const updatedIssues = (groupedIssues:StatusIssuesMap) => {
    for (const key in groupedIssues) {
        groupedIssues[key] = groupedIssues[key].map(issue => {
            if(issue.updated_ago) {
                issue.updated_ago = getTimeAgo(issue.updated_at);
            }else if(issue.closed_at){
                issue.closed_ago = getTimeAgo(issue.closed_at)
            }
            return issue;
        });
    }
    console.log("updated")
    return groupedIssues;
}
const curry = (fn:(...args:any[])=>any) => {
    const arity = fn.length;
    return (...args:any[]) => {
        if(args.length < arity) {
            return fn.bind(this, ...args);
        }else {
            return fn.apply(this, args)
        }
    }

}

const partialSum = (num:number) => {
    let sum = num;
    return (arg:number) => {
        return sum+=arg
    }
}

