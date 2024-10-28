// app/tabs/Screens/StartMenu/support.js
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Importação do hook
import { View, Text, Image, StyleSheet } from 'react-native';
import BackButton from '../backButton';

export default function Support() {
    const navigation = useNavigation(); // Obter a instância de navegação

    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.navigate('Screens/StartMenu/startmenu')} />
            <Image
                source={require('../../../../assets/images/boxpro_logo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Entre em contato para suporte técnico:</Text>
            <Text style={styles.contactInfo}>Número: (11) 1234-5678</Text>
            <Text style={styles.contactInfo}>Email: suporte@example.com</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 300,
        height: 150,
        marginBottom: 25,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        color: '#FFFFFF',
        marginBottom: 20,
    },
    contactInfo: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 10,
    },
});
