
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { View, TouchableOpacity } from "react-native"
import { Context } from '../Context';
import { useContext } from 'react';

const CustomHeader = ({ navigation }) => {

    const { toggleMenu } = useContext(Context);
    return (

        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            backgroundColor: 'rgb(249 115 22)',
            color: 'white',
            position: 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: 60,
            padding: 8
        }}
        >
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <MaterialCommunityIcons name="weight-lifter" size={24} color="rgb(255 237 213)" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('History')}>
                <MaterialCommunityIcons name="history" size={24} color="rgb(255 237 213)" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { toggleMenu() }}>
                <Feather name="menu" size={24} color="rgb(255 237 213)" />


            </TouchableOpacity>

        </View>

    )

}

export default CustomHeader;