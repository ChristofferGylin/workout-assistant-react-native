import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import { useContext, useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Context } from '../Context';
import { MaterialIcons } from '@expo/vector-icons';

const ExerciseDetailsScreen = ({ navigation, route, }) => {
    const { exercises, deleteExercise } = useContext(Context);
    const [exercise, setExercise] = useState(undefined);

    const handleClickDone = () => {
        navigation.goBack();
        navigation.navigate('AddExercise', { id: route.params.id });
    };

    const handleClickDel = () => {
        deleteExercise(route.params.id);
        navigation.goBack();
    };

    const handleClickEdit = () => {

    };


    useEffect(() => {

        if (exercise && exercise.userMade) {

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

    }, [exercise])


    useEffect(() => {

        let newExercise;

        for (let i = 0; i < exercises.length; i++) {

            if (exercises[i].id === route.params.id) {

                newExercise = { ...exercises[i] };
                break;

            }

        }

        setExercise(newExercise);

    }, [exercises]);

    if (!exercise) {
        return <></>
    }

    let DelButton;

    if (exercise.userMade) {

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
                        <View style={styles.exerciseDetail}>
                            <Text >Number of sets:</Text>
                            <Text >{exercise.defaultSets}</Text>
                        </View>
                        <View style={styles.exerciseDetail}>
                            <Text >Number of reps:</Text>
                            <Text >{exercise.defaultReps}</Text>
                        </View>
                        {exercise.weightExercise &&
                            <>

                                <View style={styles.exerciseDetail}>
                                    <Text >Start weight:</Text>
                                    <Text >{exercise.defaultWeight} kg</Text>
                                </View>
                                <View style={styles.exerciseDetail}>
                                    <Text >Weight increment:</Text>
                                    <Text >{exercise.defaultIncrement} kg</Text>
                                </View>

                            </>

                        }

                    </View>

                </ScrollView>

            </View>
            <TouchableOpacity
                style={styles.doneButton}
                onPress={handleClickDone}>
                <Text>Add to session</Text>
            </TouchableOpacity>
            <View style={{ borderTopColor: 'rgb(203 213 225)', borderTopWidth: 1, flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'center', width: '100%', paddingHorizontal: 8 }}>


                {DelButton && <DelButton />}


            </View>


            <StatusBar style="auto" />
        </View>
    );
}

export default ExerciseDetailsScreen;