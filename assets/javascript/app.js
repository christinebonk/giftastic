var topics = ["pink", "rainbow", "cooked", "cartoon", "shark", "happy", "ugly", "gold", "cat", "cute", "star"];
var favourites = [];
//render buttons function
function renderButtons() {
	var fishButtons = document.getElementById("fish-buttons");
	fishButtons.innerHTML = ""; //empty existing buttons

	//loop through array to generate buttons
	var l=topics.length
	for(i=0;i<l;i++) {
		//create buttons
		var newButton = document.createElement("button");
		newButton.className = "fishBtn"
		newButton.setAttribute("data-name", topics[i]);
		var buttonContent = document.createTextNode(topics[i]);
		newButton.appendChild(buttonContent);
		//add event listener
		newButton.addEventListener("click", displayFish);
		//add buttons to html
		fishButtons.appendChild(newButton);
	}
}

//render buttons on load
renderButtons();


//add gifs function
function displayFish() {
	//define query
	var fishType = $(this).attr("data-name");
	var key = "&api_key=9yB1iQE0uPH4SpZ4Cf7rnaiWj2SGJKz7";
	var limit = "&limit=3";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=fish+" + fishType + key + limit;

	//ajax call
	$.ajax({
		url: queryURL,
		method: "GET" 
	}).then(function(response) {
		console.log(response);
		var results = response.data;
		var l=results.length;
		for(i=0;i<l;i++) {
			//Create new fish div and give it a class of fish
			var newFish = document.createElement("div");
			newFish.className = "fish";
			//Create image element and add attributes
			var newFishImg = document.createElement("img");
			var fishStill = response.data[i].images.fixed_height_still.url;
			var fishAnimate = response.data[i].images.fixed_height.url;
			newFishImg.src = fishStill;
			newFishImg.setAttribute("data-still", fishStill);
			newFishImg.setAttribute("data-animate", fishAnimate);
			newFishImg.setAttribute("data-state", "still");
			newFishImg.className = "fish-image";
			//Get fish rating
			var fishRating = document.createTextNode("Danger Level: " + response.data[i].rating);
			var newFishRating = document.createElement("figcaption");
			newFishRating.appendChild(fishRating);
			//Get fish name
			var fishName = response.data[i].username;
			if (!fishName) {
				fishNameNode = document.createTextNode("Name: Bob");
			} else {
				fishNameNode = document.createTextNode("Name: " + fishName);
			}
			var newFishName = document.createElement("figcaption");
			newFishName.appendChild(fishNameNode);
			//Attach the image to div and div to the document
			newFish.appendChild(newFishImg);
			newFish.appendChild(newFishName);
			newFish.appendChild(newFishRating);
			var tank = document.getElementById("tank");
			tank.appendChild(newFish);
		}
	})
}

//Pause and start animations on click
$("#tank").on("click", "img", function() {
	 var state = $(this).attr("data-state");
     var animateState = $(this).attr("data-animate");
     var stillState = $(this).attr("data-still");

     if (state == "still") {
        $(this).attr("src", animateState);
        $(this).attr("data-state", "animate");
        console.log("hello");
      } else if (state == "animate") {
        $(this).attr("src", stillState);
        $(this).attr("data-state", "still");
      }
});

//Create input box 
$("#add-fish").on("click", function(event) {
	event.preventDefault();
	var userButton = $("#fish-input").val();
	topics.push(userButton);
	renderButtons();
	$("#fish-input").val("");
})
	

	 


