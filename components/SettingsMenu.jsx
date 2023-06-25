import { TouchableOpacity, View, Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons';



const SettingsMenu = ({ navigation, toggleMenu }) => {

    const MenuItem = ({ title, link }) => {

        return (

            <TouchableOpacity
                onPress={() => {
                    toggleMenu();
                    navigation.navigate(link);
                }}
                style={{
                    borderTopWidth: 1,
                    borderTopColor: 'rgb(253 186 116)',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8
                }}
            >
                <Text style={{
                    color: 'rgb(255 237 213)',
                    fontSize: 24,
                }}
                >
                    {title}
                </Text>
            </TouchableOpacity>

        )

    }

    return (

        <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgb(249 115 22)',
            paddingTop: 30,
            paddingHorizontal: 10,
        }}>
            <View style={{ alignItems: 'flex-end', marginBottom: 10 }}>
                <TouchableOpacity onPress={() => { toggleMenu() }}>
                    <FontAwesome name="close" size={24} color="rgb(255 237 213)" />
                </TouchableOpacity>
            </View>
            <View>
                <MenuItem title='Exercises' link='Exercises' />
                <MenuItem title='Sessions' link='Sessions' />
                <MenuItem title='Schedule' link='Schedule' />
            </View>

        </View>

    )

}

export default SettingsMenu;