'use strict';  // always start with this 

let submit_button = document.getElementById("myVideos");

submit_button.addEventListener("click", submitFormContents);

async function postContents(vidContents) {
    const response = await fetch("/getList", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vidContents)
    });

    if (response.status == 200){
        sessionStorage.setItem("getList", vidContents.videoNickname);
        location.href = "myVideos.html";
    }
    return response.json();
  }