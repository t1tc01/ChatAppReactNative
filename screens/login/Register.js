import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {auth, 
  firebaseDatabase, 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  firebaseDatabaseRef,
  firebaseSet,
  onAuthStateChanged,
  signInWithEmailAndPassword
  } from "../../firebase/Firebase";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
 
export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {navigation, route} = props;
  const {navigate, goBack} = navigation; 
 
  return (
    <View style={styles.container}>
      <Image style={styles.image} 
            source={{uri: 'https://png.pngtree.com/png-vector/20200622/ourlarge/pngtree-carrot-cute-character-logo-icon-png-image_2260896.jpg'}} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Repeat."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {navigate('Login')}}
      >
        <Text style={styles.forgot_button}>Have an account?</Text>
      </TouchableOpacity>
 
      <TouchableOpacity 
        style={styles.loginBtn}
        onPress={
            //()=>alert(`email: ${email} password: ${password}`)
           () => { createUserWithEmailAndPassword(auth, email, password)
                .then((userCredentials)=>{
                    const user = userCredentials.user
                    //
                    sendEmailVerification(user).then(() => {
                      console.log(`sent email to ${user.email}`)
                    });

                    //save data to firebase, like INSERT 
                    firebaseSet(firebaseDatabaseRef(
                      firebaseDatabase,
                      `users/${user.uid}`
                    ), {
                      userId: user.uid,
                      email: user.email,
                      emailVerified: user.emailVerified,
                      accessToken: user.accessToken
                    })

                    //navigate
                    alert(`Register successfull`);
                    navigate('Chat');
                }).catch((error) => {alert(`Cannot sign in, error: ${error.message}`)})
        }}
        >
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 30,
    marginRight: 15,
    marginStart: 10,
  },
 
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 10,
    alignItems: "center",

  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 10,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});