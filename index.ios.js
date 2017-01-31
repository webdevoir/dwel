/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import SessionFormContainer from './frontend/components/session_form/session_form';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class Dwel extends Component {
  render() {
    return (

      <View style={styles.container}>
        <Text style={styles.welcome}>
          Dwel!
        </Text>
        <SessionForm/>
        <Text style={styles.instructions}>
          An app for landlords and tenants index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b3bbc9',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Dwel', () => Dwel);