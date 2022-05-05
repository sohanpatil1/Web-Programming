'use strict'

async function getAll(){
  const response = await fetch("/getAll", {
      method: 'GET',
  });
  let jsonResponse = await response.json();
  console.log("GetAll: ",jsonResponse)

  if (response.status == 200){
      console.log("All values: ",jsonResponse.message)
  } 
  return jsonResponse
}


getAll()
.then(content => {
    console.log("Content from server for myVideos: ",typeof(content))
    
    var size = Object.keys(content['message']).length;
    
    parent = document.getElementById("main-container")
    
    for (let i=0; i<size; i++) 
    {
      let div = document.createElement("div");  //Make a div
      div.classList.add("videoLine"); //Add classname
      div.setAttribute("id", "div"+i)
      let p = document.createElement("p");  //Make a p tag
      p.classList.add("videoName");     //Add classname to p tag
      div.appendChild(p);               //The paragraph is appended to child
      let X = document.createElement("p")
      X.classList.add("deleteRow")
      X.setAttribute("id", "div"+i)
      X.textContent = 'X'
      div.appendChild(X)
      parent.appendChild(div);
      X.addEventListener("click", deleteRow)
    }
})
.catch(error => {
    console.error('Error:', error);
})

async function deleteRow(){
  const response = await fetch("/deleteElement", {
    method: 'POST',
    headers: {
      'Content-Type': 'text/html'
    },
    body: nickname
  });
}


