import { Button, TextInput, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import { useContext, useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import { Context } from '../Context';

const defaultValues = {

    restTime: '60',
    title: 'Awesome session name',

}

const NewSessionScreen = ({ navigation }) => {

    const { addSession } = useContext(Context);
    const [title, setTitle] = useState('');
    const [restTimeInput, setRestTimeInput] = useState('');



    const handleSubmit = () => {

        const newSession = {
            id: uuid.v4(),
            name: title,
            restTime: parseInt(restTimeInput),
            tags: [],
            exercises: [],
            userMade: true

        }

        addSession(newSession);
        navigation.goBack();
        navigation.navigate('Sessions');

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

    }, [navigation, title, restTimeInput]);


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
                    Rest time in seconds:
                </Text>
                <TextInput
                    inputMode='numeric'
                    style={styles.titleInput}
                    onChangeText={text => setRestTimeInput(text)}
                    value={restTimeInput}
                    placeholder={defaultValues.restTime}
                />
                <StatusBar style="auto" />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default NewSessionScreen;