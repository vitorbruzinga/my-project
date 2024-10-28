// app/tabs/Screens/CreateUser/createUser.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ImageBackground } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { styles } from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import BackButton from '../backButton';

export default function CreateUser() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    // Limpa os campos sempre que a tela ganha foco
    useFocusEffect(
        React.useCallback(() => {
            setName('');
            setEmail('');
            setPassword('');
            setPasswordConfirm('');
            setBirthdate('');
        }, [])
    );

    const handleConfirm = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setBirthdate(formattedDate);
        setDatePickerVisibility(false);
    };

    async function handleCreateUser() {
        if (!name || !email || !password || !passwordConfirm || !birthdate) {
            return Alert.alert('Erro', 'Todos os campos são obrigatórios!');
        }
        if (password !== passwordConfirm) {
            return Alert.alert('Erro', 'As senhas não coincidem!');
        }

        try {
            const usuarioData = {
                nome: name,
                email: email,
                senha: password,
                dataNascimento: birthdate
            };

            const response = await fetch('http://10.0.2.2:3000/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    acao: 'cadastrar',
                    ...usuarioData
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
                navigation.navigate('Screens/Login/login');
            } else {
                Alert.alert('Erro', data.error || 'Ocorreu um erro no cadastro.');
            }
        } catch (error) {
            console.error('Erro no cadastro:', error);
            Alert.alert('Erro', 'Falha ao conectar com o servidor.');
        }
    }

    return (
        <ImageBackground
            source={require('../../../../assets/images/cadastrp_bg.jpg')}
            style={styles.backgroundImage}
            imageStyle={{ opacity: 0.5 }}
        >
            <View style={styles.overlay}>
                <BackButton onPress={() => navigation.navigate('Screens/Login/login')} />
                <Text style={styles.title}>Cadastro</Text>

                <View style={styles.form}>
                    <TextInput
                        style={styles.inputUserName}
                        placeholder='Nome'
                        autoCompleteType='username'
                        autoCapitalize='none'
                        placeholderTextColor='#000'
                        autoCorrect={false}
                        onChangeText={setName}
                        value={name}
                    />
                    <TextInput
                        style={styles.inputForm}
                        placeholder='Email'
                        autoCompleteType='email'
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholderTextColor='#000'
                        onChangeText={setEmail}
                        value={email}
                    />
                    <TextInput
                        style={styles.inputForm}
                        placeholder='Senha'
                        secureTextEntry={true}
                        autoCompleteType='password'
                        autoCapitalize='none'
                        placeholderTextColor='#000'
                        autoCorrect={false}
                        onChangeText={setPassword}
                        value={password}
                    />
                    <TextInput
                        style={styles.inputForm}
                        placeholder='Confirmar senha'
                        secureTextEntry={true}
                        autoCompleteType='password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholderTextColor='#000'
                        onChangeText={setPasswordConfirm}
                        value={passwordConfirm}
                    />

                    <TouchableOpacity style={styles.buttonForm} onPress={() => setDatePickerVisibility(true)}>
                        <Text style={styles.textButton}>
                            {birthdate ? `Data de Nascimento: ${birthdate}` : 'Selecionar Data de Nascimento'}
                        </Text>
                    </TouchableOpacity>

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={() => setDatePickerVisibility(false)}
                    />

                    <TouchableOpacity style={styles.buttonForm} onPress={handleCreateUser}>
                        <Text style={styles.textButton}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}
