import { Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import React, { useContext, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Context } from '../Context';
import GenericButton from '../components/GenericButton';
import { millisToTime } from '../utils/millisToTime';
import { FontAwesome } from '@expo/vector-icons';

let timerId;

const WorkoutActive = ({ navigation, route }) => {

    const { updateThisSession, thisSession } = useContext(Context);
    const [time, setTime] = useState('00:00:00');

    const handleClose = () => {

        navigation.goBack();
        navigation.navigate('Home')

    }

    useFocusEffect(

        React.useCallback(() => {

            const animation = () => {

                const millis = Date.now() - thisSession.results.exercises[thisSession.currentExercise].setsReps[thisSession.currentSet].startTime;
                const timeText = millisToTime(millis);
                setTime(timeText);
                timerId = requestAnimationFrame(animation);

            }
            //cancelAnimationFrame(timerId)

            timerId = requestAnimationFrame(animation);

            return (() => {

                cancelAnimationFrame(timerId);
            })
        }, [thisSession])

    )

    const buttonCallBack = () => {

        const time = Date.now();

        const newThisSession = { ...thisSession };

        newThisSession.results.exercises[newThisSession.currentExercise].setsReps[thisSession.currentSet].endTime = time;

        updateThisSession(newThisSession)
        cancelAnimationFrame(timerId);

        navigation.navigate('WorkoutReps')

    }


    if (!thisSession) {

        return <></>

    }

    return (

        <View style={[styles.container, styles.workoutContainer]}>

            <View style={[styles.innerContainer, styles.workoutInputContainer]}>
                <View style={{ alignItems: 'flex-end', marginBottom: 10, position: 'absolute', top: 30, right: 10 }}>
                    <TouchableOpacity onPress={handleClose}>
                        <FontAwesome name="close" size={24} color="rgb(255 237 213)" />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.heading, styles.workoutTextColor, { fontSize: 50 }]}>Go!</Text>
                <Text style={[styles.heading, styles.workoutTextColor, { fontSize: 30, fontWeight: 'bold' }]}>{thisSession.session.exercises[thisSession.currentExercise].name}</Text>
                {thisSession.session.exercises[thisSession.currentExercise].weight && <Text style={[styles.heading, styles.workoutTextColor]}>{thisSession.session.exercises[thisSession.currentExercise].weight} kg</Text>}
                <Text style={[styles.heading, styles.workoutTextColor]}>{thisSession.session.exercises[thisSession.currentExercise].reps} reps</Text>
                <Text style={[styles.heading, styles.workoutTextColor]}>Set {thisSession.currentSet + 1} of {thisSession.session.exercises[thisSession.currentExercise].sets}</Text>
                <GenericButton title='Done' callback={buttonCallBack} />
                <Text style={[styles.heading, styles.workoutTextColor, { fontVariant: ['tabular-nums'] }]}>{time}</Text>

            </View>

            <StatusBar style="light" />
        </View>

    );

}

export default WorkoutActive;