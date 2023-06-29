import { Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import GenericButton from '../components/GenericButton';
import { millisToTime } from '../utils/millisToTime';
import { FontAwesome } from '@expo/vector-icons';

const WorkoutPaus = ({ navigation, route }) => {

    const { thisSession, updateThisSession } = useContext(Context);
    const [restStart, setRestStart] = useState(Date.now() + thisSession.session.restTime * 1000);
    const [buttonTitle, setButtonTitle] = useState('Skip rest');
    const [time, setTime] = useState('00:00:00');
    const [timerId, setTimerId] = useState();
    const [encourage, setEncourage] = useState('Relax!')

    const handleClose = () => {

        navigation.goBack();
        navigation.navigate('Home')

    }

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
                setEncourage('No more rest!')
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
                <View style={{ alignItems: 'flex-end', marginBottom: 10, position: 'absolute', top: 30, right: 10 }}>
                    <TouchableOpacity onPress={handleClose}>
                        <FontAwesome name="close" size={24} color="rgb(255 237 213)" />
                    </TouchableOpacity>

                </View>
                <Text style={[styles.heading, styles.workoutTextColor, { fontSize: 50 }]}>{encourage}</Text>
                <Text style={[styles.heading, styles.workoutTextColor]}>Next exercise:</Text>
                <Text style={[styles.heading, styles.workoutTextColor, { fontSize: 30, fontWeight: 'bold' }]}>{thisSession.session.exercises[thisSession.currentExercise].name}</Text>
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