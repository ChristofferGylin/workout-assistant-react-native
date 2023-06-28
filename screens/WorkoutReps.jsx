import { Text, TextInput, TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import { useContext, useState } from 'react';
import { Context } from '../Context';
import GenericButton from '../components/GenericButton';

const WorkoutReps = ({ navigation, route }) => {

    const { updateNextSession, updateThisSession, thisSession } = useContext(Context);
    const [reps, setReps] = useState(`${thisSession.session.exercises[thisSession.currentExercise].reps}`)

    const buttonCallBack = () => {

        let repsInput;

        if (reps.length === 0 || isNaN(reps)) {

            repsInput = parseInt(thisSession.session.exercises[thisSession.currentExercise].reps);

        } else {

            repsInput = parseInt(reps);

        }

        const newThisSession = { ...thisSession };
        newThisSession.results.exercises[newThisSession.currentExercise].setsReps[thisSession.currentSet].reps = repsInput;

        newThisSession.currentSet++;

        let workoutFinished = false;

        if (newThisSession.currentSet > newThisSession.session.exercises[newThisSession.currentExercise].sets - 1) {

            newThisSession.currentSet = 0;
            newThisSession.currentExercise++;

            if (newThisSession.currentExercise > newThisSession.session.exercises.length - 1) {

                workoutFinished = true;
                newThisSession.currentExercise = 0;

            }

        }

        updateThisSession(newThisSession)

        if (workoutFinished) {

            navigation.navigate('WorkoutResults');

        } else {

            navigation.navigate('WorkoutPause');

        }

    }


    if (!thisSession) {

        return <></>

    }

    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[styles.container, styles.workoutContainer]}>

                <View style={[styles.innerContainer, styles.workoutInputContainer]}>
                    <Text style={[styles.heading, styles.workoutTextColor]}>How many reps did you do?</Text>

                    <TextInput
                        inputMode='numeric'
                        style={[styles.titleInput, styles.workoutTextColor]}
                        onChangeText={text => setReps(text)}
                        value={reps}


                    />
                    <GenericButton title='Save' callback={buttonCallBack} />
                </View>

                <StatusBar style="light" />
            </View>
        </TouchableWithoutFeedback>

    );

}

export default WorkoutReps;