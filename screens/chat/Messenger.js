import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Platform, StatusBar, FlatList, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {UIHeader} from '../../components/UIHeader';
import {MessengerItem} from './MessengerItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth, 
    firebaseDatabase, 
    createUserWithEmailAndPassword, 
    sendEmailVerification,
    firebaseDatabaseRef,
    firebaseSet,
    onAuthStateChanged,
    child,
    get,
    } from "../../firebase/Firebase";

import { useSafeAreaInsets } from 'react-native-safe-area-context';

class Messenger extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            typedText: '',
            chatHistory: [],
            
        }
        this.setChat();
    }
    setTypedText(typedText) {
        this.state.typedText = typedText; 
    }

    setChatHistory = (chatHistory) => {
        this.state.chatHistory = chatHistory;
    }


    async setChat() {
        const dbRef = firebaseDatabaseRef(firebaseDatabase);

        get(child(dbRef, 'chats')).then(async (snapshot) => {
            if (snapshot.exists()) {
                let snapshotObject = snapshot.val();
                let stringUser = await AsyncStorage.getItem('user');
                let myUserId = JSON.parse(stringUser).userId;

                let updatedChatHistory = Object.keys(snapshotObject)
                    .filter(item => item.includes(myUserId))
                    .map(eachKey => {
                        let eachObject = snapshotObject[eachKey];
                        return {...eachObject,
                            showUrl: true,
                            isSender: eachKey.split('-')[0] == myUserId,
                            url: 'https://hinhnen123.com/wp-content/uploads/2021/06/anh-avatar-cute-dep-nhat-5.jpg'
                        };
                    })
                    .sort((item1, item2) => item1.timestamp - item2.timestamp);


                    //set
                    
                    this.setState({chatHistory: updatedChatHistory});
                    
            } else {
                console.log('No data available');
            }
        }).catch((error) => {
            console.error(`Cannot get users from Firebase: ${error}`);  
        }, []);
    };



    renderItem = ({ item }) => (
        <MessengerItem
            url={item.url}
            showUrl={item.showUrl}
            isSender={item.isSender}
            messengers={item.messenger}
        ></MessengerItem>
    );

    
    render() {

        const {navigation, route} = this.props;
        const {navigate, goBack} = navigation
        const {userId} = this.props.route.params.user;

        return (
            <View style={styles.container}>
                <UIHeader 
                    title={userId}
                    leftIconName={"angle-left"}
                    rightIconName={"bars"}
                    onPressLeft={goBack}
                    onPressRight={() => {alert("Pressed Right")}}
                />
                <View  style={styles.chat}>
                    <FlatList
                        data={this.state.chatHistory}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.timestamp}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Enter your message'
                        onChangeText={(typedText) => this.setTypedText(typedText)}
                    ></TextInput>
                    <TouchableOpacity
                        style={{
                            paddingEnd: 25
                        }}
                        onPress={async () =>{
                            if (this.state.typedText.trim().length == 0) {
                                return
                            }

                            //
                            let newMessengerObject = {
                                url: 'https://us.123rf.com/450wm/anatolir/anatolir2011/anatolir201106345/159496285-jurist-avatar-icon-simple-style.jpg?ver=6',
                                showUrl: true,
                                messenger: this.state.typedText,
                                timestamp: (new Date()).getTime(),
                            }
                            
                            let stringUser = await AsyncStorage.getItem("user");
                            let myUserId = JSON.parse(stringUser).userId;
                            let myFriendUserId = this.props.route.params.user.userId;
                            
                            Keyboard.dismiss();
                            //save to firebase database
                            firebaseSet(firebaseDatabaseRef(
                                firebaseDatabase,
                                `chats/${myUserId}-${myFriendUserId}-${newMessengerObject.timestamp}`
                            ), 
                                //infor of sender
                                newMessengerObject).then(() => {
                                    this.setTypedText('');
                                    this.setChat();
                                })
                            
                            //"id1-id2: {messenger object}"
                            
                        }}
                    >
                        <Icon 
                            name={"paper-plane"}
                            size={30}
                            color={'pink'}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    chat: {
        flex: 1,
    },
    inputView: {
        flex: 0.1,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textInput: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        height: 45,
        width: "80%",
        margin: 5
    }
})

export default Messenger;