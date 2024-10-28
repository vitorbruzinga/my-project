import React, { useState } from 'react';
import { Image, View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import BackButton from '../backButton';

const ValidateCode = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params;
    const [codigo, setCodigo] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const handleResetPassword = async () => {
        if (novaSenha !== confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        try {
            const response = await fetch('http://10.0.2.2:3000/api/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    acao: 'validar-codigo-e-resetar-senha',
                    email: email,
                    codigo: codigo,
                    novaSenha: novaSenha,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
                navigation.navigate('Screens/Login/login');
            } else {
                Alert.alert('Erro', data.error || 'Código de recuperação inválido.');
            }
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
            Alert.alert('Erro', 'Ocorreu um erro. Tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.navigate('Screens/ResetPassword/RequestResetCode')} />
            <Image
                source={require('../../../../assets/images/boxpro_logo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Validar Código de Recuperação</Text>
            <TextInput
                style={styles.input}
                placeholder="Código de recuperação"
                value={codigo}
                onChangeText={setCodigo}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Nova senha"
                value={novaSenha}
                onChangeText={setNovaSenha}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar nova senha"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
            />
            <Button title="Redefinir Senha" onPress={handleResetPassword} />
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 300,
        height: 150,
        marginBottom: 25,
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
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
});

export default ValidateCode;
