import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {screenWidth} from '../../components/Device';


export const MessengerItem = (props) => {

    let {url, showUrl ,isSender,  messengers, timestamp, onPress} = props;
    return (
        isSender == false ? <TouchableOpacity style={styles.container}>
                {showUrl == true ? <Image 
                    style={styles.image}
                    source={{uri: url}}
                /> : <View style={styles.image}></View>}
                <Text style={styles.chatBubble}>{messengers}</Text>
        </TouchableOpacity> : 
        <TouchableOpacity style={styles.containerSender}>
                <Text style={styles.chatBubble}>{messengers}</Text>
                {showUrl == true ? <Image 
                    style={styles.image}
                    source={{uri: url}}
                /> : <View style={styles.image}></View>}
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginVertical: 2,
        flexDirection: 'row',
        borderRadius: 20,
        paddingEnd: 100,
    },
    containerSender: {
        flex: 1,
        padding: 20,
        marginVertical: 2,
        flexDirection: 'row',
        borderRadius: 20,
        paddingStart: 100,
        justifyContent: 'flex-end',
    },
    chatBubble: {
        width: screenWidth * 0.6,
        color: 'black', 
        fontSize: 12, 
        backgroundColor: 'grey',
        borderRadius: 25,
        padding: 20,
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 30,
        marginRight: 10,
        marginStart: 1,
    },
})