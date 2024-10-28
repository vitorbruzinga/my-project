// app/tabs/Screens/StartMenu/profile.js
import React, { useEffect, useState } from 'react';
import BackButton from '../backButton';
import { Image, View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
    const [userInfo, setUserInfo] = useState(null);
    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            const fetchUserData = async () => {
                const storedEmail = await AsyncStorage.getItem('email'); // Recuperar o email do AsyncStorage
                console.log(storedEmail);
                if (!storedEmail) {
                    Alert.alert('Erro', 'Email do usuário não encontrado.');
                    return;
                }

                try {
                    const response = await fetch(`http://10.0.2.2:3000/api/usuarios?email=${storedEmail}`);
                    const data = await response.json();

                    if (data && data.Nome && data.Email && data.DataNascimento) {
                        setUserInfo(data);
                    } else {
                        Alert.alert('Erro', 'Dados do usuário não encontrados.');
                    }
                } catch (error) {
                    console.error('Erro ao buscar informações do usuário:', error);
                    Alert.alert('Erro', 'Falha ao buscar informações do usuário.');
                }
            };

            fetchUserData();
        }, [])
    );

    const handleChangePassword = () => {
        navigation.navigate('Screens/ResetPassword/RequestResetCode'); 
    };

    // Função para formatar a data
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', options); // Formato: DD/MM/AAAA
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/images/boxpro_logo.png')}
                style={styles.logo}
            />
            {userInfo ? (
                <>
                    <Text style={styles.title}>{userInfo.Nome}</Text>
                    <Text style={styles.info}>Email: {userInfo.Email}</Text>
                    <Text style={styles.info}>Data de Nascimento: {formatDate(userInfo.DataNascimento)}</Text>
                    <BackButton onPress={() => navigation.navigate('Screens/StartMenu/startmenu')} />
                    <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
                        <Text style={styles.buttonText}>Mudar Senha</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.loading}>Carregando informações do usuário...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 300,
        height: 150,
        marginBottom: 25,
    },
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: '#FFFFFF',
        marginBottom: 20,
    },
    info: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 10,
    },
    changePasswordButton: {
        marginTop: 20,
        backgroundColor: '#343a40',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
    },
    loading: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});
