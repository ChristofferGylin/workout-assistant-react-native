import { Button, TextInput, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import getExerciseName from '../utils/getExerciseName';


const ConFirmAddExercise = ({ navigation, route }) => {

    const { addToSession, exercises, sessions } = useContext(Context);
    const [title, setTitle] = useState('');
    const [weightExercise, setWeightExercise] = useState(false);
    const [defaultWeight, setDefaultWeight] = useState('');
    const [defaultSets, setDefaultSets] = useState('');
    const [defaultReps, setDefaultReps] = useState('');
    const [defaultIncrement, setDefaultIncrement] = useState('');

    const handleSubmit = () => {

        const exercise = {
            id: route.params.exerciseId,
            reps: parseInt(defaultReps),
            sets: parseInt(defaultSets),

        }

        if (weightExercise) {

            exercise.weight = parseFloat(defaultWeight.replace(',', '.'));
            exercise.increment = parseFloat(defaultIncrement.replace(',', '.'));
            exercise.weightExercise = true;

        }

        const sessionId = route.params.sessionId;

        addToSession(sessionId, exercise)
        navigation.goBack();
        navigation.navigate('SessionDetails', { id: sessionId, title: getExerciseName(sessionId, sessions) });

    }

    useEffect(() => {

        let exercise;

        for (let i = 0; i < exercises.length; i++) {

            if (exercises[i].id === route.params.exerciseId) {

                exercise = exercises[i];
                break;

            }
        }

        setTitle(exercise.name);
        setDefaultSets(`${exercise.defaultSets}`);
        setDefaultReps(`${exercise.defaultReps}`);

        if (exercise.weightExercise) {

            setWeightExercise(true);
            setDefaultWeight(`${exercise.defaultWeight}`);
            setDefaultIncrement(`${exercise.defaultIncrement}`);

        }

    }, [])

    useEffect(() => {

        navigation.setOptions({
            headerRight: () => (
                <Button
                    title='Done'
                    onPress={() => handleSubmit()}
                />
            )
        })

    }, [navigation, title, weightExercise, defaultWeight, defaultSets, defaultReps, defaultIncrement]);


    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

            <View style={[styles.container, styles.inputContainer]}>

                <View style={{ marginTop: 10, marginBottom: 30 }}>
                    <Text style={styles.heading}>Add the exercise "{title}" to the session "{getExerciseName(route.params.sessionId, sessions)}" with these settings:</Text>
                </View>


                <Text style={styles.inputTitle}>
                    Number of sets:
                </Text>
                <TextInput
                    inputMode='numeric'
                    style={styles.titleInput}
                    onChangeText={text => setDefaultSets(text)}
                    value={defaultSets}

                />
                <Text style={styles.inputTitle}>
                    Number of reps:
                </Text>
                <TextInput
                    inputMode='numeric'
                    style={styles.titleInput}
                    onChangeText={text => setDefaultReps(text)}
                    value={defaultReps}

                />

                {weightExercise &&
                    <>
                        <Text style={styles.inputTitle}>
                            Start weight:
                        </Text>
                        <TextInput
                            inputMode='decimal'
                            style={styles.titleInput}
                            onChangeText={text => setDefaultWeight(text)}
                            value={defaultWeight}

                        />
                        <Text style={styles.inputTitle}>
                            Weight increment:
                        </Text>
                        <TextInput
                            inputMode='decimal'
                            style={styles.titleInput}
                            onChangeText={text => setDefaultIncrement(text)}
                            value={defaultIncrement}

                        />
                    </>}

                <StatusBar style="auto" />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default ConFirmAddExercise;