import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ImageBackground, Alert } from 'react-native';
import { styles } from './styles';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        // Validação simples
        if (!email || !password) {
            return Alert.alert('Erro', 'Por favor, preencha todos os campos!');
        }

        try {
            // Requisição POST para o login
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

            // Tratamento da resposta
            if (response.ok) {
                Alert.alert('Sucesso', 'Login bem-sucedido!');
                // Redirect
                navigation.navigate('Home'); // pagina inicial
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
                    <Text style={styles.title}>SISTEMA DE GESTÃO AUTOMOTIVA & AUTOPEÇAS</Text>
                    {/* Formulário de login */}
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
                        <TouchableOpacity onPress={() => navigation.navigate('CreateUser')}>
                            <Text style={styles.ButtonCreate}>Ainda não possui uma conta? Clique aqui e cadastre-se!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
}
