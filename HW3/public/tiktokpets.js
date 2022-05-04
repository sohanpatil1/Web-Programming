'use strict';  // always start with this 

let submit_button = document.getElementById("submitContinue");

submit_button.addEventListener("click", submitFormContents);

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
            alert("The database is full")
        }
        else
        {
            console.log(response)
        }
    }
    return jsonResponse;
}

async function getContents(){
    const response = await fetch("/getMostRecent", {
        method: 'GET',
    });
    console.log(response.json())
    // let jsonResponse = response.json();
    
    if (response.status == 200){
        location.href = "./videoPreview.html";
    }
    console.log("We got this content: ",response)
    return response;
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
        
        getContents()
        .then(content => {
            console.log("Content from server: ",content)
        })
        .catch(error => {
            console.error('Error:', error);
        })
    })
    .catch(error => {
        console.error('Error:', error);
    });

    
    return;
}

function isEmpty(str) {
    return !str.trim().length;
}
