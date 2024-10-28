// app/tabs/Screens/StartMenu/profile.js
import React, { useEffect, useState } from 'react';
import BackButton from '../backButton';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Profile() {
    const [userInfo, setUserInfo] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();
    const route = useRoute(); // Captura a rota atual
    const { email } = route.params || {}; // Obtém o email da rota (agora com fallback)

    useEffect(() => {
        async function fetchUserData() {
            if (!email) {
                Alert.alert('Erro', 'Email do usuário não encontrado.');
                return;
            }

            try {
                const response = await fetch(`http://10.0.2.2:3000/api/usuarios?email=${email}`);
                const data = await response.json();

                if (data && data.nome && data.email && data.dataNascimento) {
                    setUserInfo(data);
                } else {
                    Alert.alert('Erro', 'Dados do usuário não encontrados.');
                }
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
                Alert.alert('Erro', 'Falha ao buscar informações do usuário.');
            }
        }
        fetchUserData();
    }, [email]);

    const handleChangePassword = async () => {
        if (!newPassword || !confirmPassword) {
            return Alert.alert('Erro', 'Por favor, preencha todos os campos!');
        }

        if (newPassword !== confirmPassword) {
            return Alert.alert('Erro', 'As senhas não coincidem!');
        }

        const jsonData = {
            email: userInfo.email,
            senha: newPassword,
        };

        try {
            const response = await fetch('http://10.0.2.2:3000/api/usuarios', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    acao: 'alterarSenha',
                    ...jsonData,
                }),
            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Senha alterada com sucesso!');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                const data = await response.json();
                Alert.alert('Erro', data.error || 'Erro ao alterar a senha.');
            }
        } catch (error) {
            console.error('Erro ao alterar a senha:', error);
            Alert.alert('Erro', 'Falha ao conectar com o servidor.');
        }
    };

    return (
        <View style={styles.container}>
            {userInfo ? (
                <>
                    <Text style={styles.title}>{userInfo.nome}</Text>
                    <Text style={styles.info}>Email: {userInfo.email}</Text>
                    <Text style={styles.info}>Data de Nascimento: {userInfo.dataNascimento}</Text>
                    <BackButton onPress={() => navigation.navigate('Screens/StartMenu/startmenu')} />
                    <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
                        <Text style={styles.buttonText}>Mudar Senha</Text>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="Nova Senha"
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirme a Nova Senha"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <Button title="Salvar" onPress={handleChangePassword} />
                </>
            ) : (
                <Text style={styles.loading}>Carregando informações do usuário...</Text>
            )}
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        width: '100%',
        padding: 10,
        color: '#000',
    },
    loading: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});
