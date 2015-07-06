/*
Ian Durra
INFO 343
HW #4
07/05/15
JS file for Police Shooting
*/

// Function to draw your map
var drawMap = function() {
	// Create map and set viewd
	var map = L.map("container");
	map.setView([34,-100],4);
	// Create an tile layer variable using the appropriate url
	var layer = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png");
	// Add the layer to your map
	layer.addTo(map);
	// Execute your function to get data
	getData(map);
}

// Function for getting data
var getData = function(map) {
	// Execute an AJAX request to get the data in data/response.json
	// When your request is successful, call your customBuild function
	$.ajax({
		context: map,
		url:"data/response.json",
		type: "get",
		success: customBuild,
		dataType:"json"
	});
}

// Do something creative with the data here!  
var customBuild = function(data) {
	var map = this;
	var gender;
	var mNum = 0;
	var fNum = 0;
	var text;
	var circle
	data.map(function(d){
		gender = d["Victim's Gender"];
		summary = d["Summary"];
		source = d["Source Link"];
		text = ""
		gender = d["Victim's Gender"]
		if(gender){
			if(gender.charAt(0) == "M" || gender.charAt(0) == "m"){
				mNum++;
				circle = new L.circle([d.lat, d.lng], 200, {color:'blue', opacity:.5}).addTo(map);
			} else {
				fNum++;
				circle = new L.circle([d.lat, d.lng], 200, {color:'red', opacity:.5}).addTo(map);
			}
			if(summary){
				text = "Police Report: " + summary;
				if(source){
					text += "<br><a href=\"" + source  + "\">Source Link</a>";
				}
			}
			circle.bindPopup(text);
		}
	});
	$("#additional").html("<h3>Male suspects: " + mNum + " Female suspects: " + fNum + "</h3>");
}


