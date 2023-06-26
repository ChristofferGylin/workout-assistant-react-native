import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import { useContext, useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Context } from '../Context';
import { MaterialIcons } from '@expo/vector-icons';
import getExerciseName from '../utils/getExerciseName';

const NextSessionDetailsScreen = ({ navigation, route }) => {

    const { exercises, sessions, deleteSession, addToSchedule } = useContext(Context);
    const [session, setSession] = useState(undefined);

    const handleClickDone = () => {
        addToSchedule(session.id);
        navigation.goBack();
        navigation.navigate('Sessions');
    };

    const handleClickDel = () => {
        deleteSession(session.id);
        navigation.navigate('Sessions');
    };

    const handleClickEdit = () => {

    };


    useEffect(() => {

        if (session && session.userMade) {

            navigation.setOptions({
                headerRight: () => {

                    return (
                        <TouchableOpacity
                            onPress={handleClickEdit}>
                            <MaterialIcons name="edit" size={24} color='rgb(71 85 105)' />
                        </TouchableOpacity>
                    )

                },
            })

        }

    }, [session])


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

    let DelButton;

    if (session.userMade) {

        DelButton = () => {

            return (
                <TouchableOpacity
                    onPress={handleClickDel}>
                    <AntDesign name="delete" size={24} color='rgb(71 85 105)' />
                </TouchableOpacity>
            )

        }

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
                                    <View style={{ flexDirection: 'row', gap: 12 }}>
                                        {exercise.weight && <Text >{exercise.weight} kg</Text>}
                                        <Text >{exercise.reps} x {exercise.sets}</Text>

                                    </View>

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
                <Text>Start session</Text>
            </TouchableOpacity>
            <View style={{ borderTopColor: 'rgb(203 213 225)', borderTopWidth: 1, flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'center', width: '100%', paddingHorizontal: 8 }}>

            </View>


            <StatusBar style="auto" />
        </View>
    );
}

export default NextSessionDetailsScreen;