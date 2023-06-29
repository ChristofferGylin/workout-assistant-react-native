import { FlatList, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import { useContext, useEffect, useState } from 'react';
import CustomHeader from '../components/CustomHeader';
import { Context } from '../Context';
import SessionItemHistory from '../components/SessionItemHistory';
import SettingsMenu from '../components/SettingsMenu';

const HistoryScreen = ({ navigation }) => {
    const { history, toggleMenu, menuVisible } = useContext(Context);

    if (menuVisible) {
        return <SettingsMenu navigation={navigation} toggleMenu={toggleMenu} />
    }

    if (history.length === 0) {

        return (
            <>
                <CustomHeader navigation={navigation} />
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.heading}>You haven´t finished any sessions yet.</Text>
                    </View>
                    <StatusBar style="auto" />
                </View>
            </>

        )

    }


    return (
        <>
            <CustomHeader navigation={navigation} />
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <Text style={styles.heading}>Finished sessions</Text>
                    <FlatList
                        data={history.reverse()}
                        renderItem={({ item }) => (

                            <SessionItemHistory title={item.name} id={item.id} navigation={navigation} startTime={item.startTime} totalTime={item.totalTime} />
                        )}
                        keyExtractor={item => `session#${item.id}`}
                    />
                </View>
                <StatusBar style="auto" />
            </View>
        </>

    );
}

export default HistoryScreen;