function GoogleCity(props) {
	return (
		<div className="cityName">
			<table>
				<tbody>
					<tr>
						<td>{props.cityObject.city}</td>
						<td>{props.cityObject.yearRank}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

var Cities = React.createClass({
	render: function() {
		var cityRows = [];
		this.props.cities.map(function(currentCity, index) {
			// console.log(currentCity.city) //gets the city property of the one we're on in the cities array
			cityRows.push(<GoogleCity cityObject={currentCity} key={index} />)
		})
		var string = "Hello, world.  I'm cold."
		return (
			<div>{cityRows}</div>
		)
	}
});



//cities.js is global and can be accessed by this file
ReactDOM.render(
	<Cities cities={cities} />,
	document.getElementById('cities-container')
)