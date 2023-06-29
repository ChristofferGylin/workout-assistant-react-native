import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles';
import { AntDesign } from '@expo/vector-icons';
import { millisToTime } from '../utils/millisToTime';

const millisToEstTime = (millis) => {

    if (millis < 60000) {

        const rest = millis % 1000;
        const secs = (millis - rest) / 1000;

        return `${secs} sec`;

    } else {

        let rest = millis % 60000;
        let minutes = (millis - rest) / 60000;

        return `ca ${minutes} min`

    }

}

const SessionItemHistory = ({ navigation, title, startTime, totalTime, id }) => {



    return (

        <TouchableOpacity
            style={[styles.item, styles.exerciseItem, { flexDirection: 'column', gap: 8 }]}
            onPress={() => {

                navigation.navigate('SessionDetailsHistory', { id, title })
            }}>

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.itemText, { fontSize: 12 }]}>{startTime.split('T')[0]}</Text>
                <Text style={[styles.itemText, { fontSize: 12 }]}>{millisToEstTime(totalTime)}</Text>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.itemText}>{title}</Text>
                <AntDesign name="right" size={24} color='rgb(71 85 105)' />
            </View>


        </TouchableOpacity>

    )

}

export default SessionItemHistory;