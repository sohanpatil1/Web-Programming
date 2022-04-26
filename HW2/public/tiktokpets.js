"use strict";

let submitbutton = document.getElementById("continueButton")
submitbutton.addEventListener("click", myParser);


function myParser() {
    let username = document.getElementById("username").value;
    let tiktokurl = document.getElementById("tiktokURL").value;
    let nickname = document.getElementById("videoNickname").value;
    console.log(username);
    console.log(tiktokurl);
    console.log(nickname);
    let values = username+"-["+tiktokurl+"-["+nickname
    sendPostRequest('/videoData',values)
    return;
  };

  async function sendPostRequest(url,data) {
    console.log("about to send post request");
    console.log(data);
    let response = await fetch(url, {   //Fetch: API Call
      method: 'POST', 
      headers: {'Content-Type': 'text/plain'},
      body: data });

    if (response.ok) {
        let responseData = await response.json();
        console.log(responseData);
        
        sessionStorage.setItem("content",data);
        location.href = "/acknowledge.html";
        return data;
    } 
    else {
        throw Error(response.status);
    }
  }

