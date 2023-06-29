import { Text, View, Button, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import { useContext, useEffect, useState } from 'react';
import CustomHeader from '../components/CustomHeader';
import { Context } from '../Context';
import SettingsMenu from '../components/SettingsMenu';
import StartButton from '../components/StartButton';
import getExerciseName from '../utils/getExerciseName';
import uuid from 'react-native-uuid';
import GenericButton from '../components/GenericButton';
import { FontAwesome } from '@expo/vector-icons';

const WorkoutReady = ({ navigation, route }) => {

    const { schedule, nextSession, sessions, exercises, updateThisSession, thisSession } = useContext(Context);

    const handleClose = () => {

        navigation.goBack();
        navigation.navigate('Home')

    }

    const buttonCallBack = () => {

        const time = Date.now();

        const sendThisSession = { ...thisSession };

        sendThisSession.startTime = time;

        sendThisSession.results.exercises[thisSession.currentExercise].setsReps[thisSession.currentSet].startTime = time;

        updateThisSession(sendThisSession);

        navigation.navigate('WorkoutActive')

    }

    useEffect(() => {

        if (route.params.first) {

            let session;

            for (let i = 0; i < sessions.length; i++) {

                if (sessions[i].id === schedule[nextSession]) {

                    session = { ...sessions[i] };
                    break;

                }

            };


            for (let i = 0; i < session.exercises.length; i++) {

                session.exercises[i].name = getExerciseName(session.exercises[i].id, exercises)
                session.exercises[i].setsReps = [];


                for (let j = 0; j < session.exercises[i].sets; j++) {

                    session.exercises[i].setsReps.push({});

                }

            }

            const results = {

                id: uuid.v4(),
                sessionId: session.id,
                name: session.name,
                restTime: session.restTime,
                exercises: [...session.exercises],

            };

            const newThisSession = {

                currentExercise: 0,
                currentSet: 0,
                session,
                results,

            }

            updateThisSession(newThisSession);

        }

    }, [])


    if (!thisSession) {

        return <><View><Text>No session</Text></View></>

    }

    return (

        <View style={[styles.container, styles.workoutContainer, { position: 'relative' }]}>

            <View style={[styles.innerContainer, styles.workoutInputContainer]}>
                <View style={{ alignItems: 'flex-end', marginBottom: 10, position: 'absolute', top: 30, right: 10 }}>
                    <TouchableOpacity onPress={handleClose}>
                        <FontAwesome name="close" size={24} color="rgb(255 237 213)" />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.heading, styles.workoutTextColor, { fontSize: 50 }]}>Get ready!</Text>
                <Text style={[styles.heading, styles.workoutTextColor, { fontSize: 30, fontWeight: 'bold' }]}>{thisSession.session.exercises[thisSession.currentExercise].name}</Text>
                {thisSession.session.exercises[thisSession.currentExercise].weight && <Text style={[styles.heading, styles.workoutTextColor]}>{thisSession.session.exercises[thisSession.currentExercise].weight} kg</Text>}
                <Text style={[styles.heading, styles.workoutTextColor]}>{thisSession.session.exercises[thisSession.currentExercise].reps} reps</Text>
                <Text style={[styles.heading, styles.workoutTextColor]}>Set {thisSession.currentSet + 1} of {thisSession.session.exercises[thisSession.currentExercise].sets}</Text>
                <GenericButton title='Start exercise' callback={buttonCallBack} />

            </View>

            <StatusBar style="light" />
        </View>

    );

}

export default WorkoutReady;