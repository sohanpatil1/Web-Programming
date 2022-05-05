/*
Example Video Links
video = "https://www.tiktok.com/@hannahbrit36/video/7063550723329379630"
video = "https://www.tiktok.com/@afvofficial/video/7077586589958032686"
video = "https://www.tiktok.com/@_catben_/video/7086928829062630698"
video = "https://www.tiktok.com/@jkentrn/video/7093549978513181995"
*/


let continue_button = document.getElementById("continueButton");

continue_button.addEventListener("click", continueButton);


async function getMostRecent(){
  const response = await fetch("/getMostRecent", {
      method: 'GET',
  });
  let jsonResponse = await response.json();
  console.log("GetMostRecent: ",jsonResponse);

  if (response.status == 200){
      console.log("Video Details shown from VideoPreview.js file : ",jsonResponse.message);
      return jsonResponse.message;
  } 
}

async function continueButton(){
  const response = await fetch("/getMostRecent", {
      method: 'GET',
  });
  let jsonResponse = await response.json();
  console.log("GetMostRecent: ",jsonResponse);

  if (response.status == 200){
      console.log("Video Details shown from VideoPreview.js file : ",jsonResponse.message);
      location.href = "./myVideos.html"
  } 
}

let example = getMostRecent()
.then(content => {
  console.log("Received Most Recent Video in VideoPreview.js file: ",content[0])
  addVideo(content[0]['url'],divElmt);
  document.getElementById("dynamic-part").textContent = content[0]['nickname'];
  return content[0]['url']
})
.catch(error => {
  console.error('Error:', error);
})
console.log("Example is ",example) //--------------------PENDING-------------------

// grab elements we'll use 
// these are global! 
let reloadButton = document.getElementById("reload");
let divElmt = document.getElementById("tiktokDiv");

// set up button
reloadButton.addEventListener("click",reloadVideo);

// add the blockquote element that TikTok wants to load the video into
// addVideo(example['url'],divElmt);

// on start-up, load the videos
loadTheVideos();

// Add the blockquote element that tiktok will load the video into
async function addVideo(tiktokurl,divElmt) {

  let videoNumber = tiktokurl.split("video/")[1];

  let block = document.createElement('blockquote');
  block.className = "tiktok-embed";
  block.cite = tiktokurl;
  // have to be formal for attribute with dashes
  block.setAttribute("data-video-id",videoNumber);
  block.style = "width: 325px; height: 563px;"

  let section = document.createElement('section');
  block.appendChild(section);
  
  divElmt.appendChild(block);
}

// Ye olde JSONP trick; to run the script, attach it to the body
function loadTheVideos() {
  body = document.body;
  script = newTikTokScript();
  body.appendChild(script);
}

// makes a script node which loads the TikTok embed script
function newTikTokScript() {
  let script = document.createElement("script");
  script.src = "https://www.tiktok.com/embed.js"
  script.id = "tiktokScript"
  return script;
}

// the reload button; takes out the blockquote and the scripts, and puts it all back in again.
// the browser thinks it's a new video and reloads it
function reloadVideo () {
  
  // get the two blockquotes
  let blockquotes 
 = document.getElementsByClassName("tiktok-embed");

  // and remove the indicated one
    block = blockquotes[0];
    console.log("block",block);
    let parent = block.parentNode;
    parent.removeChild(block);

  // remove both the script we put in and the
  // one tiktok adds in
  let script1 = document.getElementById("tiktokScript");
  let script2 = script.nextElementSibling;

  let body = document.body; 
  body.removeChild(script1);
  body.removeChild(script2);

  addVideo(example,divElmt);
  loadTheVideos();
}