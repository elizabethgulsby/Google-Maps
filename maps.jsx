/**************GOOGLE****************/
// Create the google map
//First set mapOptions so when we make the Map constructor it's easier to read
var mapOptions = {
	center: {lat: 39.8282, lng: -98.5795},
	zoom: 4
}

//now make the map
var map = new google.maps.Map(
	document.getElementById('map'),
	mapOptions
);

//make an infoWindow for use later
var infoWindow = new google.maps.InfoWindow({});
//Make a markers array for use later
var markers = [];

//Make an array to hold our points of interest
var PoIMarkers = [];

// Set up the directionsService so we can use it
var directionsService = new google.maps.DirectionsService();
// Set up the directionsDisplay so we can use it
var directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setMap(map);


function calcRoute() {
	var request = {
		origin: start,
		destination: end,
		travelMode: 'DRIVING'
	};
	directionsService.route(request, function(result, status) {
		if (status == 'OK') {
			directionsDisplay.setDirections(result);
			directionsDisplay.setPanel(document.getElementById('directionsPanel'));
		}
	});
}

var start = "Atlanta, GA";
var end;



// A function to place a marker at a city location
function createMarker(city) {
	var icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7CFE7569'
	var cityLL = {
		lat: city.lat, 
		lng: city.lon
	}
	var marker = new google.maps.Marker({
		position: cityLL,
		map: map,
		title: city.city,
		icon: icon
	});
	// We only want ONE info window!
	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.setContent(`<h2> ${city.city}</h2><div> ${city.state}</div><div> ${city.yearEstimate}</div>`)
		infoWindow.open(map, marker);
	});
	// Push the marker just created above onto the global array "markers"
	markers.push(marker);
}
 function createPoI(place) {
 	// console.log(place);
 	var infoWindow = new google.maps.InfoWindow({});
 	var marker = new google.maps.Marker({
 		map: map,
 		position: place.geometry.location,
 		icon: place.icon
 	})
 	google.maps.event.addListener(marker, 'click', () => {
 		infoWindow.setContent(place.name);
 		infoWindow.open(map, marker);
 	});
 	PoIMarkers.push(marker)
 }

/*************REACT**************/
var GoogleCity = React.createClass({
	getDirections: function() {
		end = this.props.cityObject.city;
		calcRoute();
	},

	handleClickedCity: function(event) {
		console.log("Someone clicked on a city!");
		google.maps.event.trigger(markers[this.props.cityObject.yearRank - 1], "click"); /*yearRank corresponds with indices of cities MINUS 1*/
	},
	// create a new map at this city's center
	zoomToCity: function() {
		console.log("Test")
		var cityLL = new google.maps.LatLng(this.props.cityObject.lat, this.props.cityObject.lon)
		map = new google.maps.Map(
			document.getElementById('map'),
			{
				zoom: 16,
				center: cityLL
			}
		)
		// Add direction service to new map
		// directionsDisplay.setMap(map);

		//working with places in each city now
		var service = new google.maps.places.PlacesService(map);
		//AJAX request - takes two parameters (object, what to do with object once it's back)
		service.nearbySearch(
		{
			location: cityLL,
			radius: 500,
			type: ['store']
		},
			function (results, status) {
				// console.log(status)
				// console.log(results);
				if(status === 'OK') {
					//we got a good response.
					results.map(function(currPlace, index){
						//run on all the places in the results array
						createPoI(currPlace);
					})
				}
			}
		);
		//lat/lng bounds - google constructor - 
		var bounds = new google.maps.LatLngBounds(cityLL);
		PoIMarkers.map(function(currMarker, index){
			bounds.extend(currMarker.getPosition());
		})
		map.fitBounds(bounds);
	},

	render: function() {
		return (
			<tr>
				<td className="city-rank">{this.props.cityObject.yearRank}</td>
				<td className="city-name" onClick={this.handleClickedCity}>{this.props.cityObject.city}</td>
				<td><button className="btn btn-primary" onClick={this.getDirections}>Get Directions</button></td>
				<td><button className="btn btn-success"onClick={this.zoomToCity}>Zoom</button></td>
			</tr>
		)
	}
});

var Cities = React.createClass({

	getInitialState: function() {
		return {
			currCities: this.props.cities
		}
	},

	setStartingLocation: function() {
		start = event.target.value
	},

	handleInputChange: function(event) {
		var newFilterValue = event.target.value;
		var filteredCitiesArray = [];
		// Loop through the original list of cities
		this.props.cities.map(function(currCity, index) {
			if (currCity.city.toLowerCase().indexOf(newFilterValue.toLowerCase()) !== -1) {
				//when indexOf returns -1, it means nothing was found
				//hit!  I don't care where it's at, but it's in the word
				filteredCitiesArray.push(currCity);
			}
		});
		// console.log(filteredCitiesArray);
		this.setState({
			currCities: filteredCitiesArray
		})		
	},

	updateMarkers: function(event) {
		event.preventDefault();
		markers.map(function(marker, index){
			/*takes the marker off the map*/
			marker.setMap(null);
		});
		/*Puts markers back on (specifically the filtered ones)*/
		this.state.currCities.map(function(city, index) {
			createMarker(city)
		})
	},

	render: function() {
		var cityRows = [];
		this.state.currCities.map(function(currentCity, index){
			createMarker(currentCity);
			cityRows.push(<GoogleCity cityObject={currentCity} key={index} />)
		});
		return (
			<div>
				<form onSubmit={this.updateMarkers}>
					<label>Search: </label>
					<input type="text" onChange={this.handleInputChange} />
					<input className="btn btn-primary btn-sm" type="submit" value="Update Markers" />
				</form>
				<form>
					<input type="text" placeholder="Please enter starting location" onChange={this.setStartingLocation} />
				</form>
				<table className="table table-striped table-bordered">
					<thead>
						<tr>
							<th>City Rank</th>
							<th>City Name</th>
						</tr>
					</thead>
					<tbody>
						{cityRows}
					</tbody>
				</table>
			</div>
		)
	}
})

/*cities.js can be accessed by this (global)*/
ReactDOM.render(
	<Cities cities={cities} />,
	document.getElementById('cities-container')
)
