// app/tabs/Screens/Login/login.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ImageBackground, Alert } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../backButton';

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        if (!email || !password) {
            return Alert.alert('Erro', 'Por favor, preencha todos os campos!');
        }

        try {
            const response = await fetch('http://10.0.2.2:3000/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    acao: 'login',
                    email: email,
                    senha: password,
                }),
            });

            const data = await response.json();
            console.log('Resposta do login:', data);

            if (response.ok) {
                await AsyncStorage.setItem('token', data.token);
                Alert.alert('Sucesso', 'Login bem-sucedido!');
                navigation.navigate('Screens/StartMenu/startmenu', { email: email });
            } else {
                Alert.alert('Erro', data.error || 'Credenciais inválidas.');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            Alert.alert('Erro', 'Falha ao conectar com o servidor.');
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ImageBackground source={require('../../../../assets/images/login_bg.png')} style={styles.backgroundImage}>
                <View style={styles.Container}>
                    <BackButton onPress={() => navigation.navigate('Screens/HomePage/home')} />
                    <Text style={styles.title}>BOX PRO - GESTÃO AUTOMOTIVA & AUTOPEÇAS</Text>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.inputEmail}
                            placeholder='Email'
                            autoCompleteType='email'
                            autoCapitalize='none'
                            placeholderTextColor='#000'
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.inputPassword}
                            placeholder='Senha'
                            autoCompleteType='password'
                            autoCapitalize='none'
                            placeholderTextColor='#000'
                            secureTextEntry={true}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity style={styles.buttonForm} onPress={handleLogin}>
                            <Text style={styles.textButton}>Entrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Screens/ResetPassword/RequestResetCode')}>
                            <Text style={styles.ButtonCreate}>Esqueci minha senha</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Screens/CreateUser/createUser')}>
                            <Text style={styles.ButtonCreate}>Não tem conta? Cadastre-se!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
}
