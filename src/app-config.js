let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
    backendHost = "http://localhost:9001"; //eslint-disable-line no-unused-vars
}

export const API_BASE_URL = backendHost;