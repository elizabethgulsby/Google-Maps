// Two utility functions to convert C > F, F > C
function toCelcius(f) {
	return (f - 32) * 5/9;
}

function toFahreheit(c) {
	return (c * 9/5) + 32;
}

// Make another utility function that tries the conversion.  
// If it can, it returns the conversion rounded; if it can't, it returns an empty string.
function tryConvert(value, tUnit) {
	var tryNumber = Number(value);
	if (isNaN(tryNumber)) {
		//this is NOT!!!! a valid number we can work with!
		return '';
	}
	else {
		//this is a valid number (isNaN returned false) we can convert!
		if (tUnit == 'c') {
			var convertedNumber = toFahreheit(tryNumber);
		}
		else {
			var convertedNumber = toCelcius(tryNumber);
		}
		return convertedNumber;
	}
}
console.log('100 deg f is ',tryConvert(100, 'f'), 'celcius');
console.log('100 deg c is ',tryConvert(0, 'c'), 'fahrenheit');


function BoilingVerdict(props) {
	if (props.celcius >= 100) {
		return (
			<p>The water would boil at {props.celcius}</p>
		)
	}
	else {
		return (
			<p>The water would NOT boil at {props.celcius}</p>
		)
	}
}


var TemperatureInput = React.createClass ({
	// getInitialState: function() {
	// 	return {
	// 		value: ''
	// 	}
	// },

	handleChange: function(event) {
		// this.setState ({
		// 	value: event.target.value
		// })
		this.props.onChange(event.target.value)
	},

	render: function() {
		var value = this.props.value;
		var tUnits = this.props.tUnits;
		return (
			<div>
				<label>Enter temperature in question in {tUnits}</label>
				<input placeholder="temp" value={value} onChange={this.handleChange} />
			</div>
		)
	}
});


var Calculator = React.createClass({

	render: function() {
		// var userEnteredTemp = this.state.value;
		return (
			<div>
				<TemperatureInput tUnits="Celcius" />
				<TemperatureInput tUnits="Fahrenheit" />
				<BoilingVerdict celcius={Number(1)} />
			</div>
		)
	}
});


ReactDOM.render (
	<Calculator />,
	document.getElementById('boiling')
)