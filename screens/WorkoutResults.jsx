import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import React, { useContext, useState } from 'react';
import { Context } from '../Context';
import uuid from 'react-native-uuid';
import GenericButton from '../components/GenericButton';
import { useFocusEffect } from '@react-navigation/native';
import { millisToTime } from '../utils/millisToTime';
import { FontAwesome } from '@expo/vector-icons';

const WorkoutResults = ({ navigation, route }) => {

    const { updateNextSession, thisSession, addToHistory, increaseWeight } = useContext(Context);
    const [result, setResult] = useState();
    const [congratulations, setCongratulations] = useState(true);

    const handleClose = () => {

        navigation.goBack();
        navigation.navigate('Home')

    }

    useFocusEffect(

        React.useCallback(() => {

            const newResult = {
                id: uuid.v4(),
                name: thisSession.session.name,
                totalTime: Date.now() - thisSession.startTime,
                startTime: new Date(thisSession.startTime),
                exercises: [],


            }

            for (let i = 0; i < thisSession.results.exercises.length; i++) {

                const target = thisSession.results.exercises[i].reps;
                let allTargetsMet = true;

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
                        console.log('nope');
                        console.log(`thisSession.results.exercises[${i}].setsReps[${j}].reps:`, thisSession.results.exercises[i].setsReps[j].reps);
                        console.log(`target:`, target);
                        setCongratulations(false);
                        allTargetsMet = false;


                    }

                }

                if (allTargetsMet && thisSession.results.exercises[i].weight) {

                    increaseWeight(thisSession.session.id, thisSession.results.exercises[i].id)

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

        <View style={[styles.container, styles.workoutContainer, { paddingTop: 40, position: 'relative' }]}>
            <View style={[styles.innerContainer]}>

                {congratulations ?
                    <View>
                        <Text style={[styles.heading, styles.workoutTextColor, { fontSize: 50 }]}>Congratulations!</Text>
                        <Text style={[styles.heading, styles.workoutTextColor, { fontSize: 30 }]}>You reached all your targets</Text>
                    </View>
                    : <Text style={[styles.heading, styles.workoutTextColor, { fontSize: 50 }]}>All done!</Text>}


                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.heading, styles.workoutTextColor, { fontVariant: ['tabular-nums'], fontWeight: 'bold' }]}>Total time:</Text>
                    <Text style={[styles.heading, styles.workoutTextColor, { fontVariant: ['tabular-nums'] }]}>{millisToTime(result.totalTime)}</Text>
                </View>


                <ScrollView style={{ width: '100%', backgroundColor: 'rgb(251 146 60)' }}>
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