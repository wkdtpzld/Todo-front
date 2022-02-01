let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
    backendHost = "http://localhost:9001";
    console.log("local")
} else {
    backendHost = "http://Kwangs.ap-northeast-2.elasticbeanstalk.com";
    console.log("not local")
}

export const API_BASE_URL = backendHost;