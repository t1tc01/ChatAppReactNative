import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {UIHeader} from '../../components/UIHeader';
import {auth, 
    onAuthStateChanged,
    firebaseDatabaseRef,
    firebaseSet,
    firebaseDatabase} from "../../firebase/Firebase";
import {StackActions} from "@react-navigation/native";

export const Setting = (props) => {
    const {navigation, route} = props;
    const {navigate, goBack} = navigation; 

    return (
        <View style={styles.container}>
            <UIHeader 
                style={styles.header} 
                title="Settings" 
                leftIconName={"angle-left"}
                onPressLeft={() => {goBack()}}
            />
            {/**Common Setting */}
            <View style={styles.itemContainer}>
                <Text style={styles.headerItem}>Common</Text>
                <TouchableOpacity style={styles.item}>
                    <Icon 
                        name={"globe"}
                        size={25}
                        color={'black'}
                    />
                    <Text style={{paddingLeft: 10}}>Language</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Icon 
                        name={"cloud"}
                        size={25}
                        color={'black'}
                    />
                    <Text style={{paddingLeft: 10}}>Environment</Text>
                </TouchableOpacity>
            </View>
            {/**Account Setting */}
            <View style={styles.itemContainer}>
                <Text style={styles.headerItem}>Account</Text>
                <TouchableOpacity style={styles.item}>
                    <Icon 
                        name={"info"}
                        size={25}
                        color={'black'}
                    />
                    <Text style={{paddingLeft: 10}}>Information</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.item}
                    onPress={() => {
                        auth.signOut();
                        //go to top (Welcome)
                        navigation.dispatch(StackActions.popToTop);
                    }}
                    >
                    <Icon 
                        name={"door-open"}
                        size={25}
                        color={'black'}
                    />
                    <Text style={{paddingLeft: 10}}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    header: {

    },
    itemContainer: {
        flexDirection: 'column',
    },
    headerItem: {
        backgroundColor: '#b3aead',
        color: 'white',
        padding: 10
    },
    item: {
        flexDirection: 'row',
        padding: 10,
    }
})
