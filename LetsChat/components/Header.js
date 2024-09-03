import { StyleSheet, View, Image,Text } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { GloboContext } from '../providers/GloboContext';
import { useEffect, useContext } from 'react';

const Header = () => {
    const logo = require('../assets/globomantics-logo-white.png');
    const router = useRouter();
    const {toggleLogin,getUser, isLoggedIn} = useContext(GloboContext);

    useEffect(() => {
        getUser();    
    },[isLoggedIn]);

    let userDisplay = isLoggedIn ? <FontAwesome6 name="user-circle" size={30} color="#00bda5" /> : <FontAwesome6 name="user-circle" size={30} color="#FFFFFF" />;
    
    return(
        <View style={styles.header}>
            <Image
                source={logo}
                style={styles.logoStyle}
            />
            <Text style={styles.menu}>
                BRANDS
            </Text>
            <Text 
                style={styles.menu}
                onPress={() => {
                    router.push('/Chat');
                }}
            >
                GLOBOCHAT
            </Text>
            <Text 
                style={styles.menu}
                onPress={() => {
                    router.push('/Register');
                }}
            >
                REGISTER
            </Text>
            <Text 
                style={styles.menu}
                onPress={toggleLogin}
            >
                {userDisplay}
            </Text>    
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        backgroundColor: '#212121',
        height: 120,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    logoStyle: {
        height: 40,
        width: '25%',
        resizeMode: 'stretch'    
    },
    menu: {
       color: '#00bda5',
       fontSize: 16,
       alignSelf: 'center',
       paddingHorizontal: 5
    }
});

export default Header;