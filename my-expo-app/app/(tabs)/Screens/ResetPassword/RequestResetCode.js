// app/tabs/Screens/ForgotPassword/ForgotPasswordScreen.js
import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import BackButton from '../backButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function ForgotPasswordScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            setEmail('');
        }, [])
    );

    const handleSendCode = async () => {
        if (!email) {
            return Alert.alert('Erro', 'Por favor, insira seu email.');
        }

        try {
            const response = await fetch('http://10.0.2.2:3000/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    acao: 'enviar-codigo-recuperacao',
                    email,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Sucesso', 'Código enviado para o seu email.');
                navigation.navigate('Screens/ResetPassword/resetPassword', { email });
            } else {
                Alert.alert('Erro', data.error || 'Erro ao enviar o código.');
            }
        } catch (error) {
            console.error('Erro ao enviar o código:', error);
            Alert.alert('Erro', 'Falha ao conectar com o servidor.');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <BackButton onPress={() => navigation.navigate('Screens/Login/login')} />
                <Image
                    source={require('../../../../assets/images/boxpro_logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>Recuperação de senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email"
                    placeholderTextColor="#888"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={handleSendCode}>
                    <Text style={styles.buttonText}>Enviar Código</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 300,
        height: 150,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        color: '#ffffff',
        backgroundColor: '#333333',
    },
    button: {
        backgroundColor: '#1e88e5',
        padding: 12,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});
