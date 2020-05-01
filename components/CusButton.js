import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';

import Color from '../constants/colors'

const CusButton=props=>{
    return <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
    <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>

    </View>
    </TouchableOpacity>
}

const styles= StyleSheet.create({
    button:{
        backgroundColor:Color.primary,
        paddingVertical:12,
        paddingHorizontal:30, 
        borderRadius:25
    },
    buttonText:{
        color:'white',
        fontFamily:'OpenSans-Regular',
        fontSize:18
    }
});

export default CusButton;