// index.js
// This is our main server file

// include express
const express = require("express");
// create object to interface with express
const app = express();

// make all the files in 'public' available 
app.use(express.static("public"));

app.use(express.text());	
// Code in this section sets up an express pipeline

app.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
})

app.post("/videoData", (request, response) => {
	console.log("server got request at : ",request.url);
	console.log(request.body);
	response.send({message: "got POST"});
});


// if no file specified, return to the main page
app.get("/", (request, response) => {
	response.sendFile(__dirname + "/public/tiktokpets.html");
});

// Need to add response if page not found!
app.use(function(req, res){
	res.status(404); 
	res.type('txt'); 
	res.send('404 - File '+req.url+' not found'); 
});
// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, function() {
	console.log("The static server is listening on port " + listener.address().port);
});
