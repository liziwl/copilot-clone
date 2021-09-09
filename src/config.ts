import * as vscode from 'vscode';

const CSConfig = {
    SEARCH_PATTERN: /(\/\/|#|--|<!--)\s?find\s?(.+)\s?(\.|-->)/
};

export function getSearchURL(site: string, keyword: string) {
    const search_url = `https://www.google.com/search?q=site%3A${site}+${keyword.replace(/\s/g, "+")}`
    console.log("serarch url:", search_url);
    return search_url;
}

type IConfig = {
    settings: {
        sites: { [name: string]: boolean },
        maxResults: number,
        httpproxy: string
    }
}

export function getConfig() {
    const config = vscode.workspace.getConfiguration("captainStack");

    let sites = {
        "stackoverflow.com": config.settings.sites.stackoverflow,
        "gist.github.com": config.settings.sites.githubGist
    }

    return {
        settings: {
            sites,
            maxResults: config.settings.maxResults,
            httpproxy: config.settings.httpproxy
        }
    } as IConfig;
}

export default CSConfig;
