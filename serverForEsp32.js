var WebSocketServer = require('websocket').server;
var http = require('http');
const express = require("express");
const mongoose = require('mongoose');
let dataMessage;



mongoose.connect('mongodb+srv://mohammadawwad30520:Mohammad211@cluster0.ichsfhv.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
.then(()=>{
    console.log("Database connection done");
}).catch(()=>{
    console.log("Something  went wrong");
})


const delaySchema = new mongoose.Schema({
    delay:{
        type: String,
    }
})

const collection = new mongoose.model('delay', delaySchema);



 
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});


server.listen(5000, function() {
    console.log((new Date()) + ' Server is listening on port 5000');
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  return true;
}

wsServer.on('request', function(request) {
    console.log(request)


    
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    var connection = request.accept(null, request.origin)
    console.log((new Date()) + ' Connection accepted.');


    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            data = message.utf8Data;
            // let jsonMessage = message.toJSON();
            // console.log(jsonMessage);
            collection.insertMany([data]);
            console.log("Data saved to mongodb.");
            connection.sendUTF("1234");
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});


wsServer.on('connection', async(ws)=>{
    console.log("We are connected");
    ws.on('message', (message)=>{
        dataMessage = message;
   
        console.log(jsonMessage);
        collection.insertMany([dataMessage]);
        console.log(message);
    });


    
});


collection.insertMany([dataMessage]);

console.log(dataMessage);