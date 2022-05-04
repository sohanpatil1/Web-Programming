// include express
const { request } = require("express");
const express = require("express");
const { type } = require("express/lib/response");
const app = express();
const db = require('./public/sqlWrap');


// Code in this section sets up an express pipeline


app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
})

app.use(express.static("public"));

app.use(express.json());


app.post("/videoData", async function (request, response){
  let dbLengthjson = await db.get("SELECT COUNT(*) AS Counter FROM VideoTable");
  let dbLength = dbLengthjson["Counter"]
  if(dbLength>=20)
  {
    console.log({message: "8 Elements already added"});
    response.send({message:"database full"});
  }
  databaseCodeExample(request.body, response); //inserting to database  
  response.send({message:"got POST"});
  console.log("Sent response: got POST")
});


app.get("/getMostRecent" , async function(request,response){  
  await db.all("SELECT * FROM VideoTable WHERE flag=1")
  // await db.run("UPDATE VideoTable SET flag=0 where flag=1")
  .then((value)=>{
    console.log("This is the response",value)
    response.send(value)
    
  })
  .catch((error) =>{
    console.log(error)
  });
});


app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/tiktokpets.html");
});


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



function databaseCodeExample(vidObj) {

  insertVideo(vidObj)
    .then(function() {
      console.log("success! No errors")
    dumpTable()
    .then(function(result) {
      console.log("whole table: looks like this\n",result);
  })
    })
    .catch(function(err) {
      console.log("SQL error",err)} );
}

// An async function to insert a video into the database
async function insertVideo(v) {
  v = JSON.stringify(v);
  let sql = "insert into VideoTable (url,nickname,userid,flag) values (?,?,?,TRUE)";
  v = JSON.parse(v)
  let dbLengthjson = await db.get("SELECT COUNT(*) AS Counter FROM VideoTable");
  let dbLength = dbLengthjson["Counter"]
  if(dbLength>1)
  {
    cmd = "UPDATE VideoTable SET flag=0 where flag=1;";
    await db.run(cmd);
  }
  await db.run(sql,[v.tiktokURL, v.videoNickname, v.username]); 
  console.log("Inserted element")
}

// an async function to get a video's database row by its nickname
async function getVideo(nickname) {

  const sql = 'select * from VideoTable where nickname = ?';

  let result = await db.get(sql, [nickname]);
  return result;
}

// an async function to get the whole contents of the database 
async function dumpTable() {
  const sql = "select * from VideoTable"
  
  let result = await db.all(sql)
  
  return result;
}