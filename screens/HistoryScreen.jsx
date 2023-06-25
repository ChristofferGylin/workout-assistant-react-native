import { FlatList, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles';
import { useEffect, useState } from 'react';
import CustomHeader from '../components/CustomHeader';

const HistoryScreen = ({ navigation }) => {


    const [history, setHistory] = useState([]);

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


    // return (
    //     <>
    //         <CustomHeader navigation={navigation} />
    //         <View style={styles.container}>
    //             <View style={styles.innerContainer}>
    //                 <Text style={styles.heading}>Finished sessions</Text>
    //                 <FlatList
    //                     data={history}
    //                     renderItem={({ item }) => (
    //                         <SessionItem title={item.name} id={item.id} navigation={navigation} />
    //                     )}
    //                     keyExtractor={item => `session#${item.id}`}
    //                 />
    //             </View>
    //             <StatusBar style="auto" />
    //         </View>
    //     </>

    // );
}

export default HistoryScreen;