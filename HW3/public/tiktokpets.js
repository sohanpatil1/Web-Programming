// 'use strict';  // always start with this 

let submit_button = document.getElementById("submitContinue");

submit_button.addEventListener("click", submitFormContents);

let getAll_button = document.getElementById("getAllButton");

getAll_button.addEventListener("click", getAll);

let myVideos_button = document.getElementById("myVideos");

myVideos_button.addEventListener("click", myVideos);

async function postContents(vidContents) {
    const response = await fetch("/videoData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vidContents)
    });
    let jsonResponse = await response.json();
    console.log(response)
    if (response.status == 200){
        if(jsonResponse.message == "database full")
        {
            alert("The database is full. Continue by clicking on My Videos")
        }
        else
        {
            console.log(response)
        }
    }
    console.log("JSONResponse from Post contents: ",jsonResponse)
    return jsonResponse;
}

async function getContents(){
    const response = await fetch("/getMostRecent", {
        method: 'GET',
    });
    console.log("hello world")
    let jsonResponse = await response.json();
    console.log("JSONResponse from getContents: ",jsonResponse)

    if (response.status == 200){
        console.log("We got this content: ",jsonResponse.message)
        location.href = "./videoPreview.html";
    } 
    return jsonResponse;
}

async function getAll(){
    const response = await fetch("/getAll", {
        method: 'GET',
    });
    let jsonResponse = await response.json();
    console.log("GetAll: ",jsonResponse)

    if (response.status == 200){
        console.log("All values: ",jsonResponse.message)
        location.href = "./videoPreview.html";
    } 
    return jsonResponse
}

async function myVideos(){
    location.href = "./myVideos.html"
}

function submitFormContents(){
    let username = document.getElementById('username').value;
    let tiktokURL = document.getElementById('tiktokURL').value;
    let videoNickname = document.getElementById('videoNickname').value;

    if (isEmpty(username) || isEmpty(tiktokURL) || isEmpty(videoNickname)){
        alert('Please make sure to fill out all the fields!');
        return ;
    }

    username = username.trim();
    tiktokURL = tiktokURL.trim();
    videoNickname = videoNickname.trim();

    console.log("Username:", username);
    console.log("TiktokURL:", tiktokURL);
    console.log("Video Nickname:", videoNickname);

    // AT THIS POINT, THE FORM CONTENTS ARE VALID AND ARE READY TO BE SENT TO THE SERVER

    let obj = {username: username, tiktokURL: tiktokURL, videoNickname: videoNickname};

    postContents(obj)
    .then(data => {
        console.log("Response from server:", data);
        if(data.message != "database full")
        {
            getContents()
            .then(content => {
                console.log("Content from server: ",content)
            })
            .catch(error => {
                console.error('Error:', error);
            })
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

    
    return;
}

function isEmpty(str) {
    return !str.trim().length;
}
