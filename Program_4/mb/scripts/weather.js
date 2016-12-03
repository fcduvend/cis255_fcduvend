//modified to allow the user to select between C and F and to update when the user
//clicks on a radio button

function getWeather(location, units) {
	if (location == undefined) {
		var location = document.getElementById("loc").value;
	}

  if (units == undefined) {
    var units = document.getElementById("radCel").checked ? "c" : "f";
  }

	var url = "https://query.yahooapis.com/v1/public/yql?q=SELECT * FROM weather.forecast WHERE woeid in (select woeid from geo.places(1) where text='" + location + "') and u='" + units + "'&format=json";

	$.getJSON( url, function( data ) {
		console.log(data);

		if (data.query.count > 0) {
			location = data.query.results.channel.location.city
			
			if (data.query.results.channel.location.region != "") {
				location += ", " + data.query.results.channel.location.region;
			}

			location += ", " + data.query.results.channel.location.country;

			var temp = data.query.results.channel.item.condition.temp;
			var cond = data.query.results.channel.item.condition.text;

			var find  = document.getElementById('find');
			var found = document.getElementById('found');

			var my_loc  = document.getElementById('location');
			var my_cond = document.getElementById('cond');
			var my_temp = document.getElementById('temp');
      var my_unit = document.getElementById('unit');

			my_temp.innerHTML = temp;
			my_cond.innerHTML = cond;
			my_loc.innerHTML  = location;
      my_unit.innerHTML = units.toUpperCase();


			find.style.display  = 'none';
			found.style.display = 'block';
		} else {
			document.getElementById('error').style.display = 'block';
		}
	});
}

function showSearch() {
	var find  = document.getElementById('find');
	var found = document.getElementById('found');

	find.style.display  = 'block';
	found.style.display = 'none';
}

$( document ).ready(function() {
  $("#error").css("display", "");
  $.get("http://ipinfo.io", function(response) {
      var location = response.city + ", " + response.region;
      getWeather(location, document.getElementById("radCel").checked ? "c" : "f");
  }, "jsonp");

  $(".radtemp").click(function() {
    $("#error").css("display", "none");
    getWeather(document.getElementById("loc").value, document.getElementById("radCel").checked ? "c" : "f");
  });
});
