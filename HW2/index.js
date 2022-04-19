// index.js
// This is our main server file

// include express
const express = require("express");
// create object to interface with express
const app = express();

// make all the files in 'public' available 
app.use(express.static("public"));

// Code in this section sets up an express pipeline

// print info about incoming HTTP request 
// for debugging
//req : request : object I use to interact with tht HTTP request
//res : response
app.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
})



// if no file specified, return the main page
app.get("/", (request, response) => {
	response.sendFile(__dirname + "/public/tiktokpets.html");
});

// Need to add response if page not found!

// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, function() {
	console.log("The static server is listening on port " + listener.address().port);
});
