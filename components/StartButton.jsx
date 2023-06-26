import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { AntDesign } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import getExerciseName from '../utils/getExerciseName';


const StartButton = ({ navigation }) => {

    const { nextSession, schedule, sessions } = useContext(Context);
    const [sessionName, setSessionName] = useState('');

    useEffect(() => {
        setSessionName(getExerciseName(schedule[nextSession], sessions))
    }, [nextSession, schedule, sessions])


    return (

        <TouchableOpacity
            style={[styles.item, styles.exerciseItem]}
            onPress={() => {
                navigation.navigate('NextSessionDetails', { id: schedule[nextSession], title: sessionName })
            }}>
            <Text style={styles.itemText}>{sessionName}</Text>
            <AntDesign name="right" size={24} color='rgb(71 85 105)' />
        </TouchableOpacity>

    )

}

export default StartButton;