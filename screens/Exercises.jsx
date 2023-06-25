import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import { useContext } from 'react';
import CustomHeader from '../components/CustomHeader';
import { Context } from '../Context';
import SettingsMenu from '../components/SettingsMenu';
import ExerciseItem from '../components/ExerciseItem';
import { AntDesign } from '@expo/vector-icons';

const Exercises = ({ navigation }) => {

    const { menuVisible, toggleMenu, exercises } = useContext(Context);


    if (menuVisible) {
        return <SettingsMenu navigation={navigation} toggleMenu={toggleMenu} />
    }


    return (

        <>
            <CustomHeader navigation={navigation} />

            <View style={styles.container}>

                <View style={styles.innerContainer}>
                    <View style={{ position: 'relative' }}>
                        <Text style={styles.heading}>Exercises</Text>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('NewExercise') }}
                            style={{ position: 'absolute', top: 10, right: 8 }}
                        >
                            <AntDesign
                                name="pluscircleo"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>


                    </View>

                    <FlatList

                        data={exercises}
                        renderItem={({ item }) => (

                            <ExerciseItem title={item.name} id={item.id} navigation={navigation} />
                        )}
                        keyExtractor={item => `exercise#${item.id}`}
                    />
                </View>

                <StatusBar style="light" />
            </View>

        </>
    );
}

export default Exercises;