import { ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import React, { useContext, useState } from 'react';
import { Context } from '../Context';
import uuid from 'react-native-uuid';
import GenericButton from '../components/GenericButton';
import { useFocusEffect } from '@react-navigation/native';
import { millisToTime } from '../utils/millisToTime';

const WorkoutResults = ({ navigation, route }) => {

    const { updateNextSession, thisSession, addToHistory } = useContext(Context);
    const [result, setResult] = useState();
    const [congratulations, setCongratulations] = useState(true);

    useFocusEffect(

        React.useCallback(() => {

            console.log('create result');

            const newResult = {
                id: uuid.v4(),
                name: thisSession.session.name,
                totalTime: Date.now() - thisSession.startTime,
                startTime: new Date(thisSession.startTime),
                exercises: [],


            }

            for (let i = 0; i < thisSession.results.exercises.length; i++) {

                const target = thisSession.results.exercises[i].reps;

                const exercise = {
                    name: thisSession.results.exercises[i].name,
                    repsTarget: target,
                    sets: [],
                    weight: thisSession.results.exercises[i].weight,
                }

                for (let j = 0; j < thisSession.results.exercises[i].setsReps.length; j++) {

                    const set = {
                        time: thisSession.results.exercises[i].setsReps[j].endTime - thisSession.results.exercises[i].setsReps[j].startTime,
                        reps: thisSession.results.exercises[i].setsReps[j].reps,
                    }

                    exercise.sets.push(set);

                    if (thisSession.results.exercises[i].setsReps[j].reps < target) {

                        setCongratulations(false);


                    }

                }

                newResult.exercises.push(exercise);

            }

            setResult(newResult);

        }, [thisSession])

    )

    const buttonCallBack = () => {

        updateNextSession(true);
        addToHistory(result);
        navigation.navigate('Home');

    }



    if (!thisSession || !result) {

        return <></>

    }

    return (

        <View style={[styles.container, styles.workoutContainer, { paddingTop: 40 }]}>

            <View style={[styles.innerContainer]}>
                {congratulations ? <Text style={[styles.heading, styles.workoutTextColor]}>Congratulations! You reached all your targets</Text>
                    : <Text style={[styles.heading, styles.workoutTextColor]}>All done!</Text>}
                <Text style={[styles.heading, styles.workoutTextColor]}>{result.name}</Text>
                <Text style={[styles.heading, styles.workoutTextColor, { fontVariant: ['tabular-nums'] }]}>Total time: {millisToTime(result.totalTime)}</Text>

                <ScrollView style={{ width: '100%' }}>
                    <View style={{ padding: 10, gap: 8 }}>

                        {result.exercises.map((exercise, index) => {

                            const sets = [];

                            for (let i = 0; i < exercise.sets.length; i++) {

                                const newSet = (
                                    <View key={`set#${i}`} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 4, borderBottomColor: 'rgb(251 146 60)', borderBottomWidth: 1 }}>
                                        <Text style={[styles.workoutTextColor, { fontVariant: ['tabular-nums'] }]}> # {i + 1}</Text>
                                        <Text style={[styles.workoutTextColor, { fontVariant: ['tabular-nums'] }]}>{millisToTime(exercise.sets[i].time)}</Text>
                                        <Text style={[styles.workoutTextColor, { fontVariant: ['tabular-nums'] }]}>{exercise.sets[i].reps} of {exercise.repsTarget}</Text>
                                    </View>
                                )

                                sets.push(newSet);

                            }

                            return (
                                <View key={`exercise#${index}`} style={[styles.exerciseDetailResult, { paddingBottom: 20 }]}>
                                    <Text style={[styles.workoutTextColor, { fontSize: 18, fontWeight: 'bold', textAlign: 'center' }]}>{exercise.name}</Text>
                                    {exercise.weight && <Text style={[styles.workoutTextColor, { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 6 }]}>{exercise.weight} kg</Text>}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 4, borderBottomColor: 'rgb(251 146 60)', borderBottomWidth: 1 }}>
                                        <Text style={[styles.workoutTextColor, { fontWeight: 'bold', fontVariant: ['tabular-nums'] }]}>Set</Text>
                                        <Text style={[styles.workoutTextColor, { fontWeight: 'bold', fontVariant: ['tabular-nums'] }]}>Time</Text>
                                        <Text style={[styles.workoutTextColor, { fontWeight: 'bold', fontVariant: ['tabular-nums'] }]}>Reps</Text>
                                    </View>
                                    {sets}

                                </View>
                            )

                        })}

                    </View>
                </ScrollView>
                <GenericButton title='Save session' callback={buttonCallBack} />

            </View>

            <StatusBar style="light" />
        </View>

    );

}

export default WorkoutResults;