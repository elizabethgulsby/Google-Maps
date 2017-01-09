function Name(props) {
	return (
		<p>{props.textToDisplay}</p>
	)
}

var MyForm = React.createClass ({

	getInitialState: function() {
		return {
			value: ''
		}	
	},

	handleChange: function(event) {
		// console.log(event.target.value);
		this.setState ({
			value: event.target.value
		})
	},

	render: function() {
		return (
		{/*The form element is the single DOM element*/}
			<form>
				<label>Name:</label>
				{/*Add an onChange handler to our input box*/}
				<input type="text" placeholder="Enter your name" onChange={this.handleChange} />
				{/*Pass our Name component this.state.value*/}
				<Name textToDisplay={this.state.value} />
			</form>
		)
	}
});

// OR (fix this!)
// class MyForm extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {value: ''}
// 		this.handleChange = this.handleChange.bind(this)
// 	},

// 	handleChange(event) {
// 		this.setState({
// 			value: event.target.value
// 		})
// 	}
// 	render() {}
// 		return (
// 			<form>
// 				<label>Name:</label>
// 				<input type="text" placeholder="Enter your name" onChange={this.handleChange} />
// 				<Name textToDisplay={this.state.value} />
// 			</form>
// 		)
// 	}
// }

ReactDOM.render (
	<MyForm />,
	document.getElementById('form-container')
)