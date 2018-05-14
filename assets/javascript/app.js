var topics = ["pink", "rainbow", "cooked", "cartoon", "shark", "happy", "ugly", "gold", "cat", "cute", "star"];

//render buttons
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


//add gifs 
function displayFish() {
	//define query
	var fishType = $(this).attr("data-name");
	var key = "&api_key=9yB1iQE0uPH4SpZ4Cf7rnaiWj2SGJKz7";
	var limit = "&limit=3";
	var rating = "&rating=g"
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=fish+" + fishType + key + limit + rating;

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
			var fishStill = response.data[i].images.fixed_height.url;
			var fishAnimate = response.data[i].url;
			newFishImg.src = fishStill;
			newFishImg.setAttribute("data-still", fishStill);
			newFishImg.setAttribute("data-animate", fishAnimate);
			newFishImg.setAttribute("data-state", "still");
			//Attach the image to div and div to the document
			newFish.appendChild(newFishImg);
			var tank = document.getElementById("tank");
			tank.appendChild(newFish);
		}
	})
}