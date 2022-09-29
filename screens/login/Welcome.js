import React, {useState, useEffect} from 'react';
import {Text, View, Image, ImageBackground, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {auth, 
  onAuthStateChanged,
  firebaseDatabaseRef,
  firebaseSet,
  firebaseDatabase} from "../../firebase/Firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';


class Welcome extends React.Component {

  constructor(props) {
    super(props);
    
  }

  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    )
  }

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      onAuthStateChanged(auth, (responseUser) => {
        if (responseUser) {
          //signed in

          let user = {
            userId: responseUser.uid,
            email: responseUser.email,
            emailVerified: responseUser.emailVerified,
            accessToken: responseUser.accessToken
          }

          //save data to firebase, like INSERT 
          firebaseSet(firebaseDatabaseRef(
            firebaseDatabase,
            `users/${responseUser.uid}`
          ), {
           user
          })

          //save user to local storage
          AsyncStorage.setItem("user", JSON.stringify(user));

          //
          this.props.navigation.navigate('Chat');
        } else {
          this.props.navigation.navigate('Register');
        }
      })
    }
  }

  render() {
    const {navigation, route} = this.props;
    const {navigate, goBack} = navigation; 
    return (
      <View style={styles.viewStyles}>
        <Text style={styles.textStyles}>
          Chat App
        </Text>
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink'
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  }
}
export default Welcome;