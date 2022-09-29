import React, {useState, useEffect} from "react";
import {Text, View, StyleSheet, StatusBar, Platform, FlatList} from 'react-native';
import {UIHeader} from '../../components/UIHeader';
import { ChatItem } from "./ChatItem";
import Icon from 'react-native-vector-icons/FontAwesome5';
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

import AsyncStorage from '@react-native-async-storage/async-storage';

export const Chat = (props) => {
    
    const {navigation, route} = props;
    const {navigate, goBack} = navigation; 

    const [users, setUsers] = useState([
        {
            // id: '4',
            // url: 'https://hinhnen123.com/wp-content/uploads/2021/06/anh-avatar-cute-dep-nhat-5.jpg',
            // name: 'Julie Snyder',
            // email: 'julie.snyder@example.com',
            // birthday: '10/5/1948',
            // address: '8386 Pockrus Page Rd',
            // phoneNumber: '(373) 626-3090',
            // recentMessage: 'Konnichiwaaaaaa',
            // timeRecentMessage: '23:42',
            // numberOfUnreadMessage: 0,
        }
        
    ]);

    useEffect(() => {
        const dbRef = firebaseDatabaseRef(firebaseDatabase);

        get(child(dbRef, 'users')).then(async (snapshot) => {
            if (snapshot.exists()) {
                let snapshotObject = snapshot.val();
                let stringUser = await AsyncStorage.getItem('user');
                let myUserId = JSON.parse(stringUser).userId;

                setUsers(Object.keys(snapshotObject)
                .filter(eachKey => eachKey != myUserId)
                .map(eachKey => {
                    let eachObject = snapshotObject[eachKey];
                    return  {
                        //Default profile url
                        url: 'https://hinhnen123.com/wp-content/uploads/2021/06/anh-avatar-cute-dep-nhat-5.jpg',
                        name: eachObject.email,
                        email: eachObject.email,
                        accessToken: eachObject.accessToken,
                        numberOfUnreadMessage: 0,
                        userId: eachKey
                    }
                }));
            } else {
                console.log('No data available');
            }
        }).catch((error) => {
            console.error(`Cannot get users from Firebase: ${error}`);  
        }, []);
    })


    const renderItem = ({ item }) => (
        <ChatItem 
            name={item.name} 
            url={item.url} 
            numberOfUnreadMessage={item.numberOfUnreadMessage}
            userId={item.userId}
            email={item.email}
            //recentMessage={item.recentMessage}
            //timeRecentMessage={item.timeRecentMessage}
            onPress={() => {
                //alert(`you pressed item ${item.id}`);
                navigate('Messenger', {user: item});
            }}
        />
    );

    return (
        <View style={styles.container}>
            <UIHeader 
                style={styles.header} 
                title="Messages" 
                leftIconName={"angle-left"}
                rightIconName={"wrench"}
                onPressLeft={() => {alert("Pressed Left")}}
                onPressRight={() => {navigate('Setting')}}
                />
            <View style={styles.unread}>
                <Text style={{color:'white', paddingLeft: 15}}>Number of Unread messages</Text>
                <Icon 
                    name={"trash"}
                    style={{padding: 10}}
                    size={25}
                    color={'pink'}
                    onPress={() => {alert("You pressed Delete")}}
                />
            </View>
            <View style={styles.chat}>
                <FlatList
                    style={{flex: 1}}
                    data={users}
                    renderItem={renderItem}
                    //keyExtractor={item => item.accessToken}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {

    },
    unread: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    chat: {
        flex: 1,
    },
})