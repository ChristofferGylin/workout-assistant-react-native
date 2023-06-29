import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import { useContext, useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Context } from '../Context';
import { MaterialIcons } from '@expo/vector-icons';
import getExerciseName from '../utils/getExerciseName';
import { millisToTime } from '../utils/millisToTime';

const SessionDetailsHistoryScreen = ({ navigation, route }) => {

    const { exercises, sessions, deleteSession, addToSchedule, history } = useContext(Context);
    const [result, setResult] = useState(undefined);

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


    // useEffect(() => {

    //     if (session && session.userMade) {

    //         navigation.setOptions({
    //             headerRight: () => {

    //                 return (
    //                     <TouchableOpacity
    //                         onPress={handleClickEdit}>
    //                         <MaterialIcons name="edit" size={24} color='rgb(71 85 105)' />
    //                     </TouchableOpacity>
    //                 )

    //             },
    //         })

    //     }

    // }, [session])


    useEffect(() => {

        if (!history || history.length === 0) return;

        let newResult;

        for (let i = 0; i < history.length; i++) {

            if (history[i].id === route.params.id) {

                newResult = { ...history[i] };
                break;

            }

        }

        setResult(newResult);

    }, [sessions]);

    if (!result) {
        return (
            <></>
        )
    }

    // let DelButton;

    // if (session.userMade) {

    //     DelButton = () => {

    //         return (
    //             <TouchableOpacity
    //                 onPress={handleClickDel}>
    //                 <AntDesign name="delete" size={24} color='rgb(71 85 105)' />
    //             </TouchableOpacity>
    //         )

    //     }

    // }

    return (
        <View style={styles.container}>

            <View style={{ flex: 10, width: '100%', paddingHorizontal: 8 }}>
                <Text style={[styles.heading]}>{result.name}</Text>
                <Text style={[styles.heading, { fontVariant: ['tabular-nums'] }]}>Total time: {millisToTime(result.totalTime)}</Text>
                <ScrollView style={{ width: '100%' }}>
                    <View style={{ padding: 10, gap: 8 }}>

                        {result.exercises.map((exercise, index) => {

                            const sets = [];

                            for (let i = 0; i < exercise.sets.length; i++) {

                                const newSet = (
                                    <View key={`set#${i}`} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 4, borderBottomColor: 'rgb(203 213 225)', borderBottomWidth: 1 }}>
                                        <Text style={[{ fontVariant: ['tabular-nums'] }]}> # {i + 1}</Text>
                                        <Text style={[{ fontVariant: ['tabular-nums'] }]}>{millisToTime(exercise.sets[i].time)}</Text>
                                        <Text style={[{ fontVariant: ['tabular-nums'] }]}>{exercise.sets[i].reps} of {exercise.repsTarget}</Text>
                                    </View>
                                )

                                sets.push(newSet);

                            }

                            return (
                                <View key={`exercise#${index}`} style={[styles.exerciseDetailResult, { paddingBottom: 20 }]}>
                                    <Text style={[{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }]}>{exercise.name}</Text>
                                    {exercise.weight && <Text style={[{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 6 }]}>{exercise.weight} kg</Text>}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 4, borderBottomColor: 'rgb(203 213 225)', borderBottomWidth: 1 }}>
                                        <Text style={[{ fontWeight: 'bold', fontVariant: ['tabular-nums'] }]}>Set</Text>
                                        <Text style={[{ fontWeight: 'bold', fontVariant: ['tabular-nums'] }]}>Time</Text>
                                        <Text style={[{ fontWeight: 'bold', fontVariant: ['tabular-nums'] }]}>Reps</Text>
                                    </View>
                                    {sets}

                                </View>
                            )

                        })}

                    </View>
                </ScrollView>

            </View>

            <View style={{ borderTopColor: 'rgb(203 213 225)', borderTopWidth: 1, flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'center', width: '100%', paddingHorizontal: 8 }}>


                {/* {DelButton && <DelButton />} */}


            </View>


            <StatusBar style="auto" />
        </View>
    );
}

export default SessionDetailsHistoryScreen;