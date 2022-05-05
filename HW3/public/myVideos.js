'use strict'

let submit_button = document.getElementById("addNew");

submit_button.addEventListener("click", bringhome);

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

function bringhome(){
  location.href = "tiktokpets.html";
}

getAll()
.then(content => {    
    var size = Object.keys(content['message']).length;
    parent = document.getElementById("main-container")
    
    for (let i=1; i<=8; i++) 
    {
      if(i<=size)
      {
        let nickname = content["message"][i]["nickname"];
        let div = document.createElement("div");  //Make a div
        div.classList.add("videoLine"); //Add classname
        div.setAttribute("id", "div"+i)
        let p = document.createElement("div");  //Make a p tag
        p.classList.add("videoName");     //Add classname to p tag
        p.textContent = nickname
        div.appendChild(p);               //The paragraph is appended to child
        let X = document.createElement("p")
        X.classList.add("deleteRow")
        X.setAttribute("id", "div"+i)
        X.textContent = 'X'
        div.appendChild(X)
        parent.appendChild(div);
        X.addEventListener("click", deleteRow)
      }
      else{
        console.log("Adding extra content for ",i)
        let div = document.createElement("div");  //Make a div
        div.classList.add("videoLine"); //Add classname
        div.setAttribute("id", "div"+i)
        let p = document.createElement("p");  //Make a p tag
        p.classList.add("videoName");
        div.appendChild(p);               //The paragraph is appended to child
        let X = document.createElement("p")
        X.classList.add("deleteRow")
        X.setAttribute("id", "div"+i)
        X.textContent = 'X'
        div.appendChild(X)
        parent.appendChild(div);
        X.addEventListener("click", deleteRow)
      }
    }
})
.catch(error => {
    console.error('Error:', error);
})

async function deleteRow(e){  
  let nickname = e.target.parentNode.childNodes[0].textContent;
  console.log("This is the nickname",nickname);
  const response = await fetch("/deleteElement", {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: nickname
  });

  let jsonResponse = await response.json();
  if (response.status == 200){
      if(jsonResponse.message == "Deleted Element")
      {
        e.target.parentNode.childNodes[0].textContent = ""
        location.reload()
        alert("The element has been deleted. Refreshing page")
      }
      else if(jsonResponse.message == "Length: 0")
      {
          alert("Nothing to delete")
      }
  }

}


