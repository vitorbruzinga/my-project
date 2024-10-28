// app/tabs/Screens/StartMenu/startmenu.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export default function StartMenu() {
    const navigation = useNavigation();
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token'); // Remove o token do AsyncStorage
            Alert.alert('Logout', 'Você foi desconectado com sucesso!', [
                { text: 'OK', onPress: () => navigation.navigate('Screens/HomePage/home') },
            ]);
        } catch (error) {
            console.error('Erro ao deslogar:', error);
            Alert.alert('Erro', 'Falha ao desconectar. Tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/images/boxpro_logo.png')}
                style={styles.logo}
            />
            <TouchableOpacity onPress={() => { navigation.navigate('Screens/StartMenu/profile') }}>
                <Text style={styles.option}>Meu perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Screens/PecasManagement/pecaslistening') }}>
                <Text style={styles.option}>Minhas peças</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Screens/StartMenu/support') }}>
                <Text style={styles.option}>Suporte técnico</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.option}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        marginTop: 50,
        width: 300,
        height: 150,
        marginBottom: 25
    },
    option: {
        color: '#FFFFFF',
        fontSize: 35,
        textDecorationLine: 'underline',
        marginVertical: 10,
    },
});
