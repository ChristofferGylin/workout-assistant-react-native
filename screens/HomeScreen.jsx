import { Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import { useContext } from 'react';
import CustomHeader from '../components/CustomHeader';
import { Context } from '../Context';
import SettingsMenu from '../components/SettingsMenu';
import StartButton from '../components/StartButton';
import getExerciseName from '../utils/getExerciseName'

const HomeScreen = ({ navigation }) => {

    const { menuVisible, toggleMenu, schedule, nextSession, sessions, updateNextSession } = useContext(Context);

    if (menuVisible) {
        return <SettingsMenu navigation={navigation} toggleMenu={toggleMenu} />
    }



    if (!schedule || schedule.length === 0) {

        return (

            <>
                <CustomHeader navigation={navigation} />

                <View style={styles.container}>

                    <View style={styles.innerContainer}>
                        <Text style={styles.heading}>Next session</Text>
                        <Text style={{ textAlign: 'center' }}>You don´t have any sessions in your schedule yet. </Text>
                        <Button title='Go to sessions' onPress={() => navigation.navigate('Sessions')} />

                    </View>

                    <StatusBar style="light" />
                </View>

            </>
        );

    }

    return (

        <>
            <CustomHeader navigation={navigation} />

            <View style={[styles.container, { justifyContent: 'center', paddingTop: 0 }]}>

                <View style={[styles.innerContainer, { justifyContent: 'center', gap: 20, }]}>
                    <Text style={styles.heading}>Next session</Text>
                    <StartButton navigation={navigation} />
                    <Button
                        title='Skip session'
                        onPress={() => {
                            updateNextSession(true);
                        }}
                    />
                </View>

                <StatusBar style="light" />
            </View>

        </>
    );




}

export default HomeScreen;