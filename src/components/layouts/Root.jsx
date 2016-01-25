import React  from 'react';

export default class Root extends React.Component {
  
	render () {
		let people = this.props.people;
		let options = this.props.options;

		return (
			<html>
				<head>
					<title>Test Application</title>
				</head>
				<body>
					My React application! With data, too!
					{people.map(person =>
						<li key={person.name}>{person.name} <em>(age {person.age})</em> {options.A}</li>
					)}
				</body>
			</html>
		);
	}
}
