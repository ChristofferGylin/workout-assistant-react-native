import { Button, TextInput, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Checkbox from 'expo-checkbox';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import { useContext, useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import { Context } from '../Context';

const defaultValues = {

    weight: '1',
    sets: '3',
    reps: '15',
    increment: '0.5',
    title: 'Awesome exercise name',

}

const NewExerciseScreen = ({ navigation }) => {

    const { addExercise } = useContext(Context);
    const [title, setTitle] = useState('');
    const [weightExercise, setWeightExercise] = useState(false);
    const [defaultWeight, setDefaultWeight] = useState('');
    const [defaultSets, setDefaultSets] = useState('');
    const [defaultReps, setDefaultReps] = useState('');
    const [defaultIncrement, setDefaultIncrement] = useState('');
    const [tags, setTags] = useState([]);


    const handleSubmit = () => {

        let reps;

        if (defaultReps.length === 0 || isNaN(defaultReps)) {

            reps = parseInt(defaultValues.reps);

        } else {

            reps = parseInt(defaultReps);

        }

        let sets;

        if (defaultSets.length === 0 || isNaN(defaultSets)) {

            sets = parseInt(defaultValues.sets);

        } else {

            sets = parseInt(defaultSets);

        }

        const newExercise = {
            id: uuid.v4(),
            name: title,
            defaultReps: reps,
            defaultSets: sets,
            tags,
            userMade: true

        }

        if (weightExercise) {

            let weight;

            if (defaultWeight.length === 0 || isNaN(defaultWeight)) {

                weight = parseFloat(defaultValues.weight);

            } else {

                weight = parseFloat(defaultWeight);

            }

            let increment;

            if (defaultIncrement.length === 0 || isNaN(defaultIncrement)) {

                increment = parseFloat(defaultValues.increment);

            } else {

                increment = parseFloat(defaultIncrement);

            }

            newExercise.defaultWeight = weight;
            newExercise.defaultIncrement = increment;
            newExercise.weightExercise = true;

        }

        addExercise(newExercise);
        navigation.goBack();
        navigation.navigate('ExerciseDetails', { id: newExercise.id, title: newExercise.name });

    }

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

                <Text style={styles.inputTitle}>
                    Name:
                </Text>
                <TextInput
                    style={styles.titleInput}
                    onChangeText={text => setTitle(text)}
                    value={title}
                    placeholder={defaultValues.title}

                />
                <Text style={styles.inputTitle}>
                    Number of sets:
                </Text>
                <TextInput
                    inputMode='numeric'
                    style={styles.titleInput}
                    onChangeText={text => setDefaultSets(text)}
                    value={defaultSets}
                    placeholder={defaultValues.sets}
                />
                <Text style={styles.inputTitle}>
                    Number of reps:
                </Text>
                <TextInput
                    inputMode='numeric'
                    style={styles.titleInput}
                    onChangeText={text => setDefaultReps(text)}
                    value={defaultReps}
                    placeholder={defaultValues.reps}
                />
                <Text style={styles.inputTitle}>
                    Weight exercise:
                </Text>
                <Checkbox
                    onValueChange={setWeightExercise}
                    value={weightExercise}
                    style={styles.checkbox}
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
                            placeholder={defaultValues.weight}
                        />
                        <Text style={styles.inputTitle}>
                            Weight increment:
                        </Text>
                        <TextInput
                            inputMode='decimal'
                            style={styles.titleInput}
                            onChangeText={text => setDefaultIncrement(text)}
                            value={defaultIncrement}
                            placeholder={defaultValues.increment}
                        />
                    </>}

                <StatusBar style="auto" />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default NewExerciseScreen;