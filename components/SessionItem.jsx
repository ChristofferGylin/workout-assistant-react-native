import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { AntDesign } from '@expo/vector-icons';


const SessionItem = ({ navigation, title, id }) => {

    return (

        <TouchableOpacity
            style={[styles.item, styles.exerciseItem]}
            onPress={() => {

                navigation.navigate('SessionDetails', { id, title })
            }}>
            <Text style={styles.itemText}>{title}</Text>
            <AntDesign name="right" size={24} color='rgb(71 85 105)' />
        </TouchableOpacity>

    )

}

export default SessionItem;