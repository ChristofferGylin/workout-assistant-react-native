import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { AntDesign } from '@expo/vector-icons';


const SessionItemSchedule = ({ navigation, title, id, index }) => {

    return (

        <TouchableOpacity
            style={[styles.item, styles.exerciseItem]}
            onPress={() => {

                navigation.navigate('SessionDetailsSchedule', { id, title, index })
            }}>
            <Text style={styles.itemText}>{title}</Text>
            <AntDesign name="right" size={24} color='rgb(71 85 105)' />
        </TouchableOpacity>

    )

}

export default SessionItemSchedule;