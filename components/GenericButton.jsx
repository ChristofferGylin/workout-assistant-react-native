import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';



const GenericButton = ({ title, callback }) => {

    const { nextSession, schedule, sessions } = useContext(Context);


    return (

        <TouchableOpacity
            style={[styles.item, styles.exerciseItem, { justifyContent: 'center' }]}
            onPress={callback}>
            <Text style={styles.itemText}>{title}</Text>
        </TouchableOpacity>

    )

}

export default GenericButton;