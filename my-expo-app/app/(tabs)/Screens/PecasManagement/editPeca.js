import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import BackButton from '../backButton';

export default function EditPeca() {
    const navigation = useNavigation();
    const route = useRoute();
    const { codigo, descricao, modelos } = route.params || {};

    const [codigoState, setCodigo] = useState(codigo || '');
    const [descricaoState, setDescricao] = useState(descricao || '');
    const [modelosState, setModelos] = useState(modelos || '');

    useFocusEffect(
        React.useCallback(() => {
            // Configura os estados com os valores recebidos da navegação
            setCodigo(codigo);
            setDescricao(descricao);
            setModelos(modelos);
        }, [codigo, descricao, modelos])
    );

    const handleUpdatePeca = async () => {
        if (!descricaoState || !modelosState) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos!');
            return;
        }

        try {
            const response = await fetch(`http://10.0.2.2:3000/api/pecas?codigo=${codigoState}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ descricao: descricaoState, modelosCompativeis: modelosState }), // Corrigido para usar a chave correta
            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Peça atualizada com sucesso!');
                navigation.navigate('Screens/PecasManagement/pecaslistening'); // Certifique-se de que este é o caminho correto
            } else {
                Alert.alert('Erro', 'Falha ao atualizar a peça.');
            }
        } catch (error) {
            console.error('Erro ao atualizar peça:', error);
            Alert.alert('Erro', 'Falha ao conectar com o servidor.');
        }
    };

    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.navigate('Screens/PecasManagement/pecaslistening')} />
            <Image
                source={require('../../../../assets/images/boxpro_logo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Editar Peça</Text>
            <TextInput
                style={[styles.input, styles.disabledInput]}
                defaultValue={String(codigoState)}
                placeholder="Código"
                editable={false}
            />
            <TextInput
                style={styles.input}
                value={descricaoState}
                onChangeText={setDescricao}
                placeholder="Descrição"
            />
            <TextInput
                style={styles.input}
                value={modelosState}
                onChangeText={setModelos}
                placeholder="Modelos Compatíveis"
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdatePeca}>
                <Text style={styles.buttonText}>Atualizar Peça</Text>
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
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: '#000',
    },
    disabledInput: {
        backgroundColor: '#e0e0e0',
        color: '#333',
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
