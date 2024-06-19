export const URLs = {
    ISSUES:(owner:string, repo:string) => `https://api.github.com/repos/${owner}/${repo}/issues?state=all`,
    REPOSITORY:(owner:string, repo:string) => `https://api.github.com/repos/${owner}/${repo}`,
    OwnerRepo:(owner:string, repo:string) => [`https://github.com/${owner}`, `https://github.com/${owner}/${repo}`],
    SearchRepo:(query:string) => `https://api.github.com/search/repositories?q=${query}`,
    REPO_URL:(owner:string, name?:string) => `https://github.com/${owner}/${name ?? ""}`
}