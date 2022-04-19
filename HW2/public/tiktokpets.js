let submit_button = document.getElementById('submitContinue');

submit_button.addEventListener('click', submitFormContents);

function submitFormContents(){
    let username = document.getElementById('username').textContent;
    let tiktokURL = document.getElementById('tiktokURL').textContent;
    let videoNickname = document.getElementById('videoNickname').textContent;

    console.log(username);
    console.log(tiktokURL);
    console.log(videoNickname);
    return ;
}
