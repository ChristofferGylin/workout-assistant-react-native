import { Text, View, Button } from 'react-native';
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
import { millisToTime } from '../utils/millisToTime';

const WorkoutPaus = ({ navigation, route }) => {

    const { thisSession, updateThisSession } = useContext(Context);
    const [restStart, setRestStart] = useState(Date.now() + thisSession.session.restTime * 1000);
    const [buttonTitle, setButtonTitle] = useState('Skip rest');
    const [time, setTime] = useState('00:00:00');
    const [timerId, setTimerId] = useState();

    const buttonCallBack = () => {

        const time = Date.now();

        const sendThisSession = { ...thisSession };

        sendThisSession.results.exercises[thisSession.currentExercise].setsReps[thisSession.currentSet].startTime = time;
        updateThisSession(sendThisSession);
        navigation.navigate('WorkoutActive');

    }



    useEffect(() => {

        const animation = () => {

            if (!restStart) {

                requestAnimationFrame(animation);
                return;
            }

            let finished = false;

            let millis = restStart - Date.now();

            if (millis <= 0) {
                setButtonTitle('Start next exercise')
                millis = 0;
                finished = true;

            }
            const timeText = millisToTime(millis);
            setTime(timeText);

            if (!finished) {

                requestAnimationFrame(animation);

            }


        }

        const id = requestAnimationFrame(animation);

        setTimerId(id);

        return (() => {

            cancelAnimationFrame(timerId);
        })

    }, [])



    if (!thisSession) {

        return <></>

    }

    return (

        <View style={[styles.container, styles.workoutContainer]}>

            <View style={[styles.innerContainer, styles.workoutInputContainer]}>
                <Text style={[styles.heading, styles.workoutTextColor]}>Next exercise:</Text>
                <Text style={[styles.heading, styles.workoutTextColor]}>{thisSession.session.exercises[thisSession.currentExercise].name}</Text>
                {thisSession.session.exercises[thisSession.currentExercise].weight && <Text style={[styles.heading, styles.workoutTextColor]}>{thisSession.session.exercises[thisSession.currentExercise].weight} kg</Text>}
                <Text style={[styles.heading, styles.workoutTextColor]}>Set {thisSession.currentSet + 1} of {thisSession.session.exercises[thisSession.currentExercise].sets}</Text>
                <GenericButton title={buttonTitle} callback={buttonCallBack} />
                <Text style={[styles.heading, styles.workoutTextColor, { fontVariant: ['tabular-nums'] }]}>{time}</Text>

            </View>

            <StatusBar style="light" />
        </View>

    );

}

export default WorkoutPaus;