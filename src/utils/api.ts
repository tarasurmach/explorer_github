

export type RepoInfo = {
    stargazers_count:number;
    owner:string;
    name:string;
    language:string;
    description:string
}
export const initInfo:RepoInfo = {
    stargazers_count:0,
    owner:"",
    name:"",
    language:"",
    description:""
}


export const fetchData = async <T extends any>(url:string) => {
    try {
        const response = await fetch(url);
        console.log(response)
        if(!response.ok) {
            throw new Error("Failed to load issues. Please try again.");
        }
        return await response.json();

    }catch (e:unknown) {

        if(e instanceof Error) {
            console.log(e)
            throw new Error(e.message)
        }
    }
}