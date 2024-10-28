// app/tabs/Screens/HomePage/home.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../../assets/images/home.png')} style={styles.homeImage} />
            <Image source={require('../../../../assets/images/boxpro_logo.png')} style={styles.minicardImage} />
            <Text style={styles.title}>Box Pro</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Screens/Login/login')}
            >
                <Text style={styles.buttonText}>ENTRAR</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    homeImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    minicardImage: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        width: 300,
        height: 300,
        resizeMode: 'contain',
        transform: [{ translateX: -150 }, { translateY: -150 }],
    },
    title: {
        position: 'absolute',
        top: 20,
        left: 20,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    button: {
        position: 'absolute',
        top: 420,
        left: 150,
        backgroundColor: '#343a40',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});
