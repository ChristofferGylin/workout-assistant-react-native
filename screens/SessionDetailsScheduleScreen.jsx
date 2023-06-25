import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import getExerciseName from '../utils/getExerciseName';

const SessionDetailsScheduleScreen = ({ navigation, route }) => {
    const { exercises, sessions, removeFromSchedule } = useContext(Context);
    const [session, setSession] = useState(undefined);

    const handleClickDone = () => {
        removeFromSchedule(session.id, route.params.index);
        navigation.goBack();
        navigation.navigate('Schedule');
    };

    useEffect(() => {

        if (!sessions || sessions.length === 0) return;

        let newSession;

        for (let i = 0; i < sessions.length; i++) {

            if (sessions[i].id === route.params.id) {

                newSession = { ...sessions[i] };
                break;

            }

        }

        setSession(newSession);

    }, [sessions]);

    if (!session) {
        return (
            <></>
        )
    }

    return (
        <View style={styles.container}>

            <View style={{ flex: 10, width: '100%', paddingHorizontal: 8 }}>
                <ScrollView style={{ width: '100%' }}>
                    <View style={{ padding: 10 }}>

                        {session.exercises.map((exercise, index) => {

                            return (
                                <View key={`exercise#${exercise.id}`} style={styles.exerciseDetail}>
                                    <Text >{getExerciseName(exercise.id, exercises)}:</Text>
                                    <Text >{exercise.reps} x {exercise.sets}</Text>
                                </View>
                            )

                        })}

                        <View style={[styles.exerciseDetail, { marginTop: 50 }]}>
                            <Text >Rest time</Text>
                            <Text >{session.restTime} seconds</Text>
                        </View>

                    </View>

                </ScrollView>

            </View>
            <TouchableOpacity
                style={styles.doneButton}
                onPress={handleClickDone}>
                <Text>Remove from schedule</Text>
            </TouchableOpacity>
            <View style={{ borderTopColor: 'rgb(203 213 225)', borderTopWidth: 1, flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'center', width: '100%', paddingHorizontal: 8 }}>


            </View>
            <StatusBar style="auto" />
        </View>
    );
}

export default SessionDetailsScheduleScreen;