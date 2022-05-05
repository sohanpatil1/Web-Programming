'use strict';  // always start with this 

let continue_button = document.getElementById("redirect-page-continue");

continue_button.addEventListener("click", goBackToMainPage);

getDynamicText().then((resp)=>{
    if (resp == undefined){
      location.href = "tiktokpets.html";
      alert("This session is either invalid or has expired! You'll be redirected to the main page.");
      return ;
    }

    let dynamic_text = " '" + resp + "' ";
    document.getElementById("dynamic-part").textContent = dynamic_text;
    console.log(resp);
})
.catch((error)=>{
    console.error(error);
})

async function getDynamicText() {
    let vidNickname = sessionStorage.getItem("videoNickname");

    return vidNickname;
}

function goBackToMainPage(){
    location.href = 'tiktokpets.html';
}
