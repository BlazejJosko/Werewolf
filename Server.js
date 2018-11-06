const express = require( 'express' );
const http = require('http');
const fs = require('fs');
//^required Node modules

//server creation
const app = express();
const server = http.createServer(app);

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

//get request
app.get('/', (req, res) => {
    console.log(req.url);
    fs.readFile(__dirname + '/pages/homepage.html', (err, data) => {
        if(err) throw err;
        res.end(data);
    });
});
app.get('/images/background.png', (req, res) => {
    console.log(req.url);
    fs.readFile(__dirname + '/pages/images/background.png', (err, data) => {
        if(err) throw err;
        res.end(data);
    });
});
app.get('/main.js', (req, res) => {
    console.log(req.url);
    fs.readFile(__dirname + '/pages/main.js', (err, data) => {
        if(err) throw err;
        res.end(data);
    });
});
app.get('/main.css', (req, res) => {
    console.log(req.url);
    fs.readFile(__dirname + '/pages/main.css', (err, data) => {
        if(err) throw err;
        res.end(data);
    });
});
//post request
app.post('/', (req, res) => {
    console.log(req.url);
    console.log('Request-Parameter: ', req.body);
    res.end('ty');
});


//server listening
server.listen(8080, '192.168.178.105', () => {
    console.log('Server running');
});