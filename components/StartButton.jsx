import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { AntDesign } from '@expo/vector-icons';


const StartButton = ({ navigation }) => {

    return (

        <TouchableOpacity
            style={[styles.item, styles.exerciseItem]}
            onPress={() => {

            }}>
            <Text style={styles.itemText}>Start session</Text>
            <AntDesign name="right" size={24} color='rgb(71 85 105)' />
        </TouchableOpacity>

    )

}

export default StartButton;