import { HttpProxyAgent } from "http-proxy-agent";
import fetch from "node-fetch";
import { getConfig } from "../config";

export type FetchPageResult = {
    textContent: string,
    url: string
}

export function fetchPageTextContent(url: string): Promise<FetchPageResult> {
    const config = getConfig();
    const proxy_ip_port = config.settings.httpproxy;
    if (proxy_ip_port === undefined || proxy_ip_port === "") {
        console.log("No proxy")
        return new Promise((resolve, reject) => {
            return fetch(url)
                .then(rs => rs.text())
                .then(textContent => resolve({ textContent, url }))
                .catch(reject);
        });
    }
    else {
        console.log("proxy_ip_port", proxy_ip_port)
        return new Promise((resolve, reject) => {
            return fetch(url,
                {
                    agent: new HttpProxyAgent(proxy_ip_port)
                })
                .then(rs => rs.text())
                .then(textContent => resolve({ textContent, url }))
                .catch(reject);
        });
    }
}
