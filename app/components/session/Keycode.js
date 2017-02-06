'use strict';
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,
         TextInput, Button, Image } from 'react-native';
import GroupIndex from '../groups/group_index';

class Keycode extends Component {
	constructor(props) {
		super(props);
		this.state = {
      address: "",
      keycode: "",
			errors: "",
			currentUser: this.props.currentUser,
      newGroup: {},
		};
    this.joinGroup = this.joinGroup.bind(this);
		this._goToGroupIndex = this._goToGroupIndex.bind(this);
    this.keyGenerator = this.keyGenerator.bind(this);
    this.createNewGroup = this.createNewGroup.bind(this);
	}


  createNewGroup(){
		fetch('http://localhost:3000/api/groups', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({group:{
					address: this.state.address,
					token: this.keyGenerator()
				}})
			})
			.then((response) => response.json())
		 .then(response => {
       console.log(response);
			 if (response.token){
				 this.setState({
				 newGroup: response
				});
			 } else {
				 this.setState({
					 errors: response[0]
				 });
			 }
		 });
		 setTimeout(this._goToGroupIndex, 500);
		}


    // update response from membership success / fail
    joinGroup(){
  		fetch('http://localhost:3000/api/memberships', {
  				method: 'POST',
  				headers: {
  					'Accept': 'application/json',
  					'Content-Type': 'application/json',
  				},
  				body: JSON.stringify( {membership:{
  					token: this.state.keycode
  				}})
  			})
  			.then((response) => response.json())
  		 .then(response => {
  			 if (response.first.id){
  				 this.setState({
  				 newGroup: response
  				});
  			 } else {
  				 this.setState({
  					 errors: response[0]
  				 });
  			 }
  		 });
  		 setTimeout(this._goToGroupIndex, 500);
  		}


		_goToGroupIndex() {
    if(this.state.newGroup.id){
    this.props.navigator.push({
    component: GroupIndex,
    title: 'Your Groups',
    passProps: {
			newGroup: this.state.newGroup,
			currentUser: this.props.currentUser,
			groups: [{id: 1, address: "650 S. Spring St. Apt. 1006", otherUser: "Barry Shy",
			todos: [{description: "Fix sink", body: "the sink has been leaking for days", category: "plumbing", resolved: false},
			{description: "Ants", body: "There are ants coming out of the wall behind the couch", category: "pests", resolved: false}]},
			{id: 2, address: "1228 Evelyn Ave.", otherUser: "Sally Rice",
				todos: [{description: "Air conditioner broken", body: "The air conditioner isn't working", category: "utilities", resolved: false},
				{description: "Washing machine is leaking", body: "It't getting EVERYWHERE", category: "plumbing", resolved: false}]}]
  		}
    });
    }
  }




  keyGenerator(){
    return Math.random().toString(36).slice(2,8);
  }



	render() {
    console.log(this.state.address);
		return (
		<View style={styles.inputForm}>
				<Text style={styles.title}>
					Add Group
				</Text>
				<Image
					style={styles.logo}
					source={require('../../../images/logo.png')}
				/>
        <Text style={styles.title}>
          Enter a Key
        </Text>
				<TextInput
					style={styles.passwordInput}
					placeholder="Ex: abc123"
					onChangeText={(text) => this.setState({keycode: text})}
					value={this.state.keycode}
				/>
				<TouchableOpacity
          onPress={this.joinGroup}
					style={styles.button}>
	          <Text style={styles.buttonText}>
	            Join Group
	          </Text>
        </TouchableOpacity>
        <Text style={styles.title}>
                Or
        </Text>
        <Text style={styles.title}>
					Enter an Address
				</Text>
        <TextInput
					style={styles.passwordInput}
					placeholder="Ex: 160 Spear Street"
					onChangeText={(text) => this.setState({address: text})}
					value={this.state.address}
				/>
				<TouchableOpacity
					onPress={this.createNewGroup}
					style={styles.button}>
	          <Text style={styles.buttonText}>
	            Create New Group
	          </Text>
        </TouchableOpacity>
        <Text style={styles.errors}>
					{this.state.errors}
				</Text>
		</View>
		);
	}

}

const styles = StyleSheet.create({

  usernameInput:{
		  height: 50,
			borderColor: 'gray',
			padding: 10,
			fontSize: 12,
			borderWidth: 1,
			width: 280,
			marginBottom: 10,
			marginTop: 10,
			backgroundColor: "white",
			left: 40

	},

	passwordInput: {

		  height: 50,
			borderColor: 'gray',
			padding: 10,
			borderWidth: 1,
			width: 280,
			fontSize: 20,
			marginBottom: 20,
      marginTop: 10,
			backgroundColor: "white",
			left: 40
 	},

	inputForm: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "center",
		flexDirection: 'column',
		padding: 10,
		backgroundColor: '#259ebc',

	},

	button: {
		height: 50,
		width: 280,
		borderWidth: 1,
		borderColor: 'gray',
		flexDirection: 'row',
	  justifyContent: "center",
		backgroundColor: '#efbc45',
		alignItems: 'center',
		left: 40,
		marginTop: 5
	},

	login: {
		height: 30,
		width: 200,
		flexDirection: 'row',
	  justifyContent: 'space-between',
		alignItems: 'center',
		left: 70,
		padding: 10,
	},

	logo: {
		justifyContent:'center',
		width: 60,
		height: 60,
		left: 142
	},

	buttonText: {
		flex: 1,
		height: 40,
		paddingTop: 8,
		paddingBottom: 10,
		width: 190,
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 20,
		justifyContent: "center"
	},

	title: {
		height: 35,
		width: 200,
		flexDirection: 'row',
	  justifyContent: 'center',
		alignItems: 'center',
		left: 75,
		padding: 5,
    paddingTop: 10,
		fontSize: 20,
		textAlign: 'center',
		marginBottom: 10
	},
	errors: {
		height: 30,
		width: 300,
		color: "red",
		flexDirection: 'row',
	  justifyContent: 'center',
		alignItems: 'center',
		left: 30,
		padding: 10,
		textAlign: 'center',
		fontSize: 20
	}


});


module.exports = Keycode;
