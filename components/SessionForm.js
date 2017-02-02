'use strict';
import React, { Component } from 'react';
import { View, Text, StyleSheet,
	       TouchableHighlight, TextInput,
				 Button, Image } from 'react-native';
import Keycode from './Keycode';

class SessionForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: ""
		};
		this.createAccount = this.createAccount.bind(this);
		this._onForward = this._onForward.bind(this);
	}

	createAccount(){
		fetch('http://localhost:3000/api/users', {
			  method: 'POST',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({
			    username: this.state.username,
			    password: this.state.password
			  })
			});
  	}

		_onForward() {
    this.props.navigator.push({
    component: Keycode,
    title: 'My Initial Scene',
    passProps: {
			username: this.state.username,
		 	password: this.state.password
		},
  });
  }




	render() {
		return (
		<View style={styles.inputForm}>
				<Image
					style={styles.logo}
					source={require('../images/logo.png')}
				/>
				<TextInput
					style={styles.usernameInput}
					placeholder="Username"
					onChangeText={(text) => this.setState({username: text})}
					value={this.state.username}
				/>
				<TextInput
					style={styles.passwordInput}
					placeholder="Password"
					onChangeText={(text) => this.setState({password: text})}
					value={this.state.password}
				/>
				<TouchableHighlight
					style={styles.button}
					onPress={this.createAccount}>
	          <Text style={styles.buttonText}>
	            Continue
	          </Text>
        </TouchableHighlight>
		</View>
		);
	}

}

const styles = StyleSheet.create({

	usernameInput:{
		  height: 30,
			borderColor: 'gray',
			padding: 10,
			fontSize: 12,
			borderWidth: 1,
			width: 200,
			marginBottom: 10,
			backgroundColor: "white",
			left: 70

	},

	passwordInput: {

		  height: 30,
			borderColor: 'gray',
			padding: 10,
			fontSize: 12,
			borderWidth: 1,
			width: 200,
			marginBottom: 20,
			backgroundColor: "white",
			left: 70
 	},

	inputForm: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "center",
		padding: 10,
		backgroundColor: '#259ebc',

	},

	button: {
		height: 30,
		width: 200,
		borderColor: 'gray',
		flexDirection: 'row',
	  justifyContent: 'space-between',
		backgroundColor: '#259ebc',
		alignItems: 'center'
	},

	logo: {
		justifyContent:'center',
		width: 50,
		height: 50,
		left: 145,
		marginBottom: 20
	},

	buttonText: {

		height: 30,
		borderColor: 'gray',
		padding: 10,
		fontSize: 12,
		borderWidth: 1,
		width: 200,
		marginBottom: 10,
		backgroundColor: "white",
		left: 70,
		fontWeight: 'bold',
		textAlign: 'center'

	}

});


module.exports = SessionForm;
