import { FlatList, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import { useContext } from 'react';
import CustomHeader from '../components/CustomHeader';
import { Context } from '../Context';
import SettingsMenu from '../components/SettingsMenu';
import getExerciseName from '../utils/getExerciseName';
import SessionItemSchedule from '../components/SessionItemSchedule';

const Schedule = ({ navigation }) => {

    const { menuVisible, toggleMenu, schedule, sessions } = useContext(Context);

    if (menuVisible) {
        return <SettingsMenu navigation={navigation} toggleMenu={toggleMenu} />
    }


    return (

        <>
            <CustomHeader navigation={navigation} />

            <View style={styles.container}>

                <View style={styles.innerContainer}>
                    <Text style={styles.heading}>Schedule</Text>
                    <FlatList

                        data={schedule}
                        renderItem={({ item, index }) => {
                            const name = getExerciseName(item, sessions)
                            return <SessionItemSchedule title={name} id={item} navigation={navigation} index={index} />
                        }}
                        keyExtractor={(item, index) => `scheduleItem${item}#${index}`}
                    />
                </View>


                <StatusBar style="light" />
            </View>



        </>
    );
}

export default Schedule;