const express = require( 'express' );
const http = require('http');
const fs = require('fs');
//^required Node modules

//ip variables
const ip = '192.168.178.105';
const testip = 'localhost';

//server pw arrays
var pwArray = []; // contains all games
var inGameArray = [] // contains which games are currently in a game

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
app.post('/createServer', (req, res) => {
    console.log(req.url);
    console.log('Request-Parameter:', req.body);
    if(req.body.pw){
        console.log('There is a password!');
        if(req.body.pw != ''){
            console.log('And it is not nothing!');
            var k = 0;
            for(let i = 0; i <= pwArray.length; i++){
                console.log(i);
                console.log(pwArray[i]);
                if(pwArray[i] == req.body.pw){
                    // if the pw is in the array there is already a server with this name
                    console.log('pw collision');
                    res.end('server not created');
                }  else {
                    // increase the pw not in the array variable
                    k++;
                }
                if(k === pwArray.length + 1){
                    // if the pw isn't already in the array the server can be created
                    // and push the pw into the array
                    pwArray.push(req.body.pw);
                    i++;
                    console.log('pw valid');
                    res.write(pwArray + ':' + i);
                    res.end('server created');
                }
            }
            console.log(pwArray);
        }
    }
});

app.post('/login', (req, res) => {
    console.log(req.url);
    console.log('Request-Parameter:', req.body);
})

//server listening
server.listen(8080, testip, () => {
    console.log('Server running');
});