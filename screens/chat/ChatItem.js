import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const ChatItem = (props) => {
    let {
        userId,
        url,
        name,
        email,
        birthday,
        address,
        phoneNumber,
        recentMessage,
        numberOfUnreadMessage,
        timeRecentMessage,
        onPress
    } = props;

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View>
                <Image 
                    style={styles.image}
                    source={{uri: url}}
                />
                {numberOfUnreadMessage > 0 && <Text style={{
                     backgroundColor: 'red',
                     position: 'absolute',
                     fontSize: 12,
                     color: 'white',
                     borderRadius: 10,
                     paddingHorizontal: numberOfUnreadMessage > 9 ? 2 : 5,
                }}>{numberOfUnreadMessage}</Text>}
            </View>
            <View 
                style={{flexdirection: 'column',}}
                >
                <Text style={styles.name}>{userId}</Text>
                <View
                    style={{flexDirection: 'row',}}
                >
                    <Text style={{color: 'grey', padding: 5,}}>{timeRecentMessage}</Text>
                    <Text style={{color: 'grey', padding: 5,}}>{recentMessage}</Text>
                </View>
            </View>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        borderRadius: 15,
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 30,
        marginRight: 15,
        marginStart: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})