console.log("connected")

function load(){
    //blank out feed div
    let feed_div = document.querySelector(".feed")
    feed_div.innerHTML = ""
    reset_form()

    fetch("http://localhost:5000/home")
        .then(function(response){
            response.json()
                .then(function(data){
                    console.log(data)
                    data.forEach(post => load_feed(post));
    })
})
}

/*function load_feed(post){
    let feed_div = document.querySelector(".feed")
    let div = document.createElement("article")

    let titleh2 = document.createElement("h2")
    let authorh4 = document.createElement("h4")
    let datep = document.createElement("p")
    let regionh3 = document.createElement("h3")
    let postDescriptionp = document.createElement("p")
    let deleteButton = document.createElement("p")
    deleteButton.innerHTML = "delete"
    let editButton = document.createElement("p")
    editButton.innerHTML = "edit"

    deleteButton.onclick = function(){
        do_delete(post.id)
    }

    editButton.onclick = function(){
        do_edit(post)
    }

    feed_div.append(div)
    div.append(titleh2)
    div.append(authorh4)
    div.append(datep)
    div.append(regionh3)
    div.append(postDescriptionp)
    div.append(deleteButton)
    div.append(editButton)

    titleh2.innerHTML = post.title
    authorh4.innerHTML = post.author
    datep.innerHTML = post.date
    regionh3.innerHTML = post.region
    postDescriptionp.innerHTML = post.post
}*/

function load_feed(post){
    let feed_div = document.querySelector(".feed");
    let div = document.createElement("article"); // This is the main card

    let titleH2 = document.createElement("h2");
    titleH2.innerHTML = post.title;

    let infoDiv = document.createElement("div");
    infoDiv.className = "post-info"; 

    let authorP = document.createElement("p");
    authorP.innerHTML = `By: ${post.author}`;
    
    let dateP = document.createElement("p");
    dateP.innerHTML = post.date;
    
    let regionP = document.createElement("p");
    regionP.innerHTML = `Region: ${post.region}`;

    infoDiv.append(authorP);
    infoDiv.append(dateP);
    infoDiv.append(regionP);

    let postDescriptionp = document.createElement("p");
    postDescriptionp.innerHTML = post.post;

    let controlsDiv = document.createElement("div");
    controlsDiv.className = "post-controls"; 

    let editButton = document.createElement("p");
    editButton.innerHTML = "✏️";
    editButton.onclick = function() {
        do_edit(post);
    };

    let deleteButton = document.createElement("p");
    deleteButton.innerHTML = "🗑️";
    deleteButton.onclick = function() {
        do_delete(post.id);
    };

    controlsDiv.append(editButton);
    controlsDiv.append(deleteButton);

    feed_div.append(div);
    div.append(titleH2);
    div.append(infoDiv);
    div.append(postDescriptionp);
    div.append(controlsDiv);
}

function load_regional_feed(region) {
    let feed_div = document.querySelector(".feed");
    feed_div.innerHTML = "";

    fetch(`http://localhost:5000/home/region/${encodeURIComponent(region)}`)
        .then(function(response){
            response.json()
                .then(function(data){
                    console.log(data);
                    data.forEach(post => load_feed(post));
                });
        });
}

function addNewPost(){
    //get the form data
    let date = document.querySelector('#date').value
    let author = document.querySelector('#author').value
    let region = document.querySelector('#region').value
    console.log("The region is ", region)
    let title = document.querySelector('#title').value
    let postInput = document.querySelector('#post')
    let post = postInput.value

    //get it ready to send to api
    let data = "date="+encodeURIComponent(date)
    data += "&author="+encodeURIComponent(author)
    data += "&region="+encodeURIComponent(region)
    data += "&title="+encodeURIComponent(title)
    data += "&post="+encodeURIComponent(post)

    let submit_method = "POST"
    const button_text = document.querySelector("#postSubmitButton").innerHTML
    let url = "http://localhost:5000/home"
    if (button_text == "SAVE"){
        submit_method = "PUT"
        url = "http://localhost:5000/home/" + editID
    }

    //send to api
    fetch(url, {
        method: submit_method,
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
        .then(function(response){
            console.log("Saved")
            load()
            postInput.value = ""
        })

    //display results
}

function do_delete(id){
    console.log("you are going to delete post: ", id)
    
    // confirm() returns 'true' if they click OK, and 'false' if they click Cancel
    if (confirm("Are you sure?")) { 
        fetch("http://localhost:5000/home/"+id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(function(response){
            console.log("Deleted")
            load()
        })
    } else {
        console.log("Delete canceled")
    }
}

function do_edit(post){
    console.log("you are going to edit post: ", post.id)
    document.querySelector('#region').value = post.region
    document.querySelector('#post').value = post.post
    document.querySelector('#date').value = post.date
    document.querySelector('#author').value = post.author
    document.querySelector('#title').value = post.title

    document.querySelector("#postSubmitButton").innerHTML = "SAVE"
    editID = post.id
}

function reset_form(){
    document.querySelector('#region').value = ""
    document.querySelector('#post').value = ""
    document.querySelector('#date').value = ""
    document.querySelector('#author').value = ""
    document.querySelector('#title').value = ""


    document.querySelector("#postSubmitButton").innerHTML = "SUBMIT"
}

let postButton = document.querySelector("#postSubmitButton")
postButton.onclick = addNewPost

let filterButton = document.querySelector("#filterSubmitButton")
filterButton.onclick = function() {
    let selectedRegion = document.querySelector('#regionFilter').value;
    load_regional_feed(selectedRegion);
};

load()