console.log("connected")

function load(){
    //blank out feed div
    let feed_div = document.querySelector(".feed")
    feed_div.innerHTML = ""

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

    feed_div.append(div)
    div.append(regionh3)
    div.append(postDescriptionp)

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

    //send to api
    fetch("http://localhost:5000/home", {
        method: "POST",
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

let postButton = document.querySelector("#postSubmitButton")
postButton.onclick = addNewPost

let filterButton = document.querySelector("#filterSubmitButton")
filterButton.onclick = function() {
    let selectedRegion = document.querySelector('#regionFilter').value;
    load_regional_feed(selectedRegion);
};

load()