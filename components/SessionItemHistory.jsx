import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles';
import { AntDesign } from '@expo/vector-icons';
import { millisToTime } from '../utils/millisToTime';


const SessionItemHistory = ({ navigation, title, startTime, totalTime, id }) => {



    return (

        <TouchableOpacity
            style={[styles.item, styles.exerciseItem, { flexDirection: 'column', gap: 8 }]}
            onPress={() => {

                navigation.navigate('SessionDetailsHistory', { id, title })
            }}>

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.itemText, { fontSize: 12 }]}>{startTime.split('T')[0]}</Text>
                <Text style={[styles.itemText, { fontSize: 12 }]}>{millisToTime(totalTime)}</Text>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.itemText}>{title}</Text>
                <AntDesign name="right" size={24} color='rgb(71 85 105)' />
            </View>


        </TouchableOpacity>

    )

}

export default SessionItemHistory;