import React from "react";
import {Text, View, StyleSheet, FlatList, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


export const UIHeader = (props) => {
    const {title, leftIconName, rightIconName,  onPressLeft, onPressRight} = props;
    return (
        <View style={styles.container}>
            {leftIconName != undefined ? <Icon 
                name={leftIconName}
                style={{padding: 10}}
                size={25}
                color={'white'}
                onPress={onPressLeft}
            /> : <View style={{width: 50, height: 50, backgroundColor: 'pink'}}></View>}
            <Text style={styles.title}>{title}</Text>
            {rightIconName != undefined ? <Icon 
                name={rightIconName}
                style={{padding: 10}}
                size={25}
                color={'white'}
                onPress={onPressRight}
            /> : <View style={{width: 50, height: 50, backgroundColor: 'pink'}}></View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink',
        height: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        lineHeight: 45,
        color: 'white',
    }
})