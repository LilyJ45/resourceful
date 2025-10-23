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

function load_feed(post){
    let feed_div = document.querySelector(".feed")
    let div = document.createElement("article")
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
    div.append(regionh3)
    div.append(postDescriptionp)
    div.append(deleteButton)
    div.append(editButton)

    regionh3.innerHTML = post.region
    postDescriptionp.innerHTML = post.post
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
    let region = document.querySelector('#region').value
    console.log("The region is ", region)
    let postInput = document.querySelector('#post')
    let post = postInput.value

    //get it ready to send to api
    let data = "region="+encodeURIComponent(region)
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
    let foo = confirm("Are you sure?") //THIS ISNT FULLY FUNCTIONAL YET< NEEDS AN IF STATEMENT< DONT DELETE IF THEY CANCEL!
    console.log(foo)
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
}

function do_edit(post){
    console.log("you are going to edit post: ", post.id)
    document.querySelector('#region').value = post.region
    document.querySelector('#post').value = post.post

    document.querySelector("#postSubmitButton").innerHTML = "SAVE"
    editID = post.id
}

function reset_form(){
    document.querySelector('#region').value = ""
    document.querySelector('#post').value = ""

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