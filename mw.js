// port: Port to host on
// paths: Specific urls that lead to certain pages
// src: Where can I freely look for files?
process.addListener("uncaughtException",(e) => console.error("MiniWedge >> " + e.message));
process.addListener("unhandledRejection",(r) => console.error("MiniWedge >> " + r));
console.log("MiniWedge >> Starting...");
require("http").createServer((req,res) => {
    if(Object.keys(require("./mw.json").paths).includes(req.url)) {
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(require("fs").readFileSync(require("./mw.json").paths[req.url]));
    } else if(require("fs").existsSync(require("./mw.json").src+req.url.slice(1))) {
        res.writeHead(200,{"Content-Type":((ext) => {
            switch(ext) {
                case ".html": return "text/html";
                case ".js": return "text/js";
                case ".css": return "text/css";
                case ".png": return "image/png";
                case ".gif": return "image/gif";
                case ".svg": return "image/svg+xml";
                case ".jpeg": case "jpg": return "image/jpg";
                case ".ttf": return "font/ttf";
                default: return "text/plain";
            }})(require("node:path").extname(req.url))});
        res.end(require("fs").readFileSync(require("./mw.json").src+req.url.slice(1)));
    }
}).listen(require("./mw.json").port,() => console.log("MiniWedge >> Ready when you are"));
