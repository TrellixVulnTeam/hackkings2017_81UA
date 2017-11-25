const send = require('./send.js');
var http = require('http');
var express = require('express');
var twilio = require('twilio');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.post('/sms', function(req, res) {
  var responder = require('twilio').twiml.MessagingResponse;
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
  console.log(req.body);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
  var twiml = new responder();
  twiml.message(req.body);
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.get('/sms', function(req, res) {
  var twilio = require('twilio');
  var twiml = new twilio.twiml.MessagingResponse();
  twiml.message('The Robots are coming! Head for the hills!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(process.env.PORT, function () {
  console.log("Express server listening on port 1337");
});
