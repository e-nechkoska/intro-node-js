const http = require("http");
const fs = require("fs");
const path = require("path");
const mime = require("mime");
const url = require("url");

const hostname = "localhost"; //how to connect phone to this server?
const port = 3000;

const findFile = (name) => {
    const filePath = path.join(__dirname, "../assets", name); // how to create the path if you don't know the file location?
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, { encoding: "utf-8" }, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };

const server = http.createServer((req, res) => {
    const method = req.method;
    const route = url.parse(req.url).path;

    if(route === "/") {
        res.setHeader = {"Content-Type": mime.getType("html")};
        findFile("index.html").then(result => {
            res.write(result);
            res.statusCode = 200;
            console.log(method, route, 200);
            res.end();
        });
    }
    else if(route === "/style.css") {
        res.writeHead(200, {"Content-Type": mime.getType("css")});
        findFile("style.css").then(result => {
            res.write(result);
            console.log(method, route, 200);
            res.end();
        }) 
    }
    else {
        res.statusCode = 404;
        console.log(method, route, 404);
        res.end("Page not found.");
    }
});

server.listen(port, hostname, () => {
    console.log(`Server listening at ${hostname}:${port}`);
})