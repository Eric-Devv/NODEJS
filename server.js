const http = require("http");
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // set headers content type:
    // res.setHeader('content-Type', 'text/html');
    // res.write("<h1>We are learning node!</h1>")
    // res.write("<p>Hallo tech Genius</p>");
    // res.end();

    res.setHeader('Content-Type','text/html');

    let path = './views/';

    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode=200;
            break;

        case '/about':
            path += 'about.html';
            res.statusCode=200;
            break;
            
        // managing Redirects
        case '/about-me':
            res.statusCode=301;
            res.setHeader('Location','/about');
            res.end()
            break;
    

        default:
            path +='404.html';
            res.statusCode = 404;
            break;
    }

    // sending html file as a response:
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
        }

        //res.write(data);
        res.end(data);
    })

})

server.listen(3000, 'localhost', () => {
    console.log("listening for request on port 3000")
})


/*
// STATUS CODES:

1. 100 Range = "information responses"
2. 200 Range = "Success codes"
3. 300 Range = "codes for redirects"
4. 400 Range = "user or client error codes"
5. 500 Range = "server error codes"


*/