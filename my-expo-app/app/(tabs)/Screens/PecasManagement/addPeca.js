import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import BackButton from '../backButton';

export default function AddPeca() {
    const navigation = useNavigation();
    const [codigo, setCodigo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [modelos, setModelos] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            // Resetar os estados ao focar a tela
            setCodigo('');
            setDescricao('');
            setModelos('');
        }, [])
    );

    const handleAddPeca = async () => {
        if (!codigo || !descricao || !modelos) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos!');
            return;
        }

        try {
            const response = await fetch('http://10.0.2.2:3000/api/pecas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ codigo, descricao, modelosCompativeis: modelos }),

            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Peça cadastrada com sucesso!');
                navigation.navigate('Screens/PecasManagement/pecaslistening');
            } else {
                Alert.alert('Erro', 'Falha ao cadastrar a peça.');
            }
        } catch (error) {
            console.error('Erro ao adicionar peça:', error);
            Alert.alert('Erro', 'Falha ao conectar com o servidor.');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/images/boxpro_logo.png')}
                style={styles.logo}
            />
            <BackButton onPress={() => navigation.navigate('Screens/PecasManagement/pecaslistening')} />
            <Text style={styles.title}>Cadastrar Peça</Text>
            <TextInput
                style={styles.input}
                placeholder="Código"
                value={codigo}
                onChangeText={(text) => setCodigo(text.replace(/[^0-9]/g, ''))} // Remove qualquer caractere que não seja número
                keyboardType="numeric" 
            />

            <TextInput
                style={styles.input}
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
            />
            <TextInput
                style={styles.input}
                placeholder="Modelos Compatíveis"
                value={modelos}
                onChangeText={setModelos}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddPeca}>
                <Text style={styles.buttonText}>Adicionar Peça</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        alignItems: 'center',
        left: 25,
        marginTop: 50,
        width: 300,
        height: 150,
        marginBottom: 25,
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
    },
    title: {
        marginTop: 30,
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});
