import { Text, TextInput, TouchableWithoutFeedback, View, Keyboard, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import { useContext, useState } from 'react';
import { Context } from '../Context';
import GenericButton from '../components/GenericButton';
import { FontAwesome } from '@expo/vector-icons';

const WorkoutReps = ({ navigation, route }) => {

    const { updateNextSession, updateThisSession, thisSession } = useContext(Context);
    const [reps, setReps] = useState(`${thisSession.session.exercises[thisSession.currentExercise].reps}`)

    const handleClose = () => {

        navigation.goBack();
        navigation.navigate('Home')

    }

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
                    <View style={{ alignItems: 'flex-end', marginBottom: 10, position: 'absolute', top: 30, right: 10 }}>
                        <TouchableOpacity onPress={handleClose}>
                            <FontAwesome name="close" size={24} color="rgb(255 237 213)" />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.heading, styles.workoutTextColor, { fontSize: 50 }]}>How many reps did you do?</Text>


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