"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPageTextContent = void 0;
const http_proxy_agent_1 = require("http-proxy-agent");
const node_fetch_1 = require("node-fetch");
const config_1 = require("../config");
function fetchPageTextContent(url) {
    const config = (0, config_1.getConfig)();
    const proxy_ip_port = config.settings.httpproxy;
    if (proxy_ip_port === undefined || proxy_ip_port === "") {
        console.log("No proxy");
        return new Promise((resolve, reject) => {
            return (0, node_fetch_1.default)(url)
                .then(rs => rs.text())
                .then(textContent => resolve({ textContent, url }))
                .catch(reject);
        });
    }
    else {
        console.log("proxy_ip_port", proxy_ip_port);
        return new Promise((resolve, reject) => {
            return (0, node_fetch_1.default)(url, {
                agent: new http_proxy_agent_1.HttpProxyAgent(proxy_ip_port)
            })
                .then(rs => rs.text())
                .then(textContent => resolve({ textContent, url }))
                .catch(reject);
        });
    }
}
exports.fetchPageTextContent = fetchPageTextContent;
