import { StyleSheet, View, Image,Text, Dimensions, Platform } from 'react-native';

const windowDimensions = Dimensions.get('window');
const WinHeight = windowDimensions.height;

const Footer = () => {
    const smallLogo = require('../assets/globomantics-logo-bug-black.png');
    return(
        <View style={styles.footer}>
            <Image
                source={smallLogo}
                style={styles.smallLogoStyle}
            />
            <Text style={styles.menu}>
                OUR STORY
            </Text>
            <Text style={styles.menu}>
                ROBOTICS
            </Text>
            <Text style={styles.menu}>
                CAREERS
            </Text>    
        </View>
    );    
};

const styles = StyleSheet.create({
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        width: '100%',
        ...Platform.select({
            android: {
                position: 'absolute',
                top: WinHeight - 50
            },
            ios: {
                position: 'absolute',
                top: WinHeight - 50
            },
            default: {
                position: 'relative',
                bottom: 0
            },
        })
    },
    smallLogoStyle: {
        height: 30,
        width: 30,
        ...Platform.select({
            android: {
                marginLeft: 23,
            },
            ios: {
                marginLeft: 23,
            },
            default: {
                left: '-35%'
            },
        })
    },
    menu: {
        paddingLeft: 25,
        paddingRight: 25,
    }
});

export default Footer;