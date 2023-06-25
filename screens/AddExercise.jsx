import { FlatList, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import { useContext } from 'react';
import { Context } from '../Context';
import SettingsMenu from '../components/SettingsMenu';
import getExerciseName from '../utils/getExerciseName';
import Item from '../components/Item';

const AddExercise = ({ navigation, route }) => {

    const { menuVisible, toggleMenu, sessions } = useContext(Context);

    const callback = (sessionId) => {

        navigation.goBack();
        navigation.navigate('ConfirmAddExercise', { sessionId, exerciseId: route.params.id })

    };

    if (menuVisible) {
        return <SettingsMenu navigation={navigation} toggleMenu={toggleMenu} />
    }



    return (


        <View style={styles.container}>

            <View style={styles.innerContainer}>
                <Text style={styles.heading}>Choose session</Text>
                <FlatList

                    data={sessions}
                    renderItem={({ item }) => {

                        return (
                            <Item
                                title={item.name}
                                id={item.id}
                                navigation={navigation}
                                callback={() => callback(item.id)}
                            />)
                    }}
                    keyExtractor={item => `scheduleItem#${item.id}`}
                />
            </View>


            <StatusBar style="light" />
        </View>




    );
}

export default AddExercise;