// app/tabs/Screens/PecasManagement/pecaslistening.js
import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import BackButton from '../backButton';

export default function PecasListening() {
    const [pecas, setPecas] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchBy, setSearchBy] = useState('codigo');
    const [filteredPecas, setFilteredPecas] = useState([]);
    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            fetchPecas();
        }, [])
    );

    const fetchPecas = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/api/pecas');
            const data = await response.json();

            console.log('Dados recebidos do backend:', data);

            if (Array.isArray(data)) {
                setPecas(data);
                setFilteredPecas(data); // Inicialmente, as peças filtradas são todas as peças
            } else {
                console.error('Erro: dados inesperados do backend', data);
                Alert.alert('Erro', 'Ocorreu um erro ao buscar as peças.');
            }
        } catch (error) {
            console.error('Erro ao buscar peças:', error);
            Alert.alert('Erro', 'Falha ao conectar com o servidor.');
        }
    };

    const handleSearch = (text) => {
        setSearchText(text); // Atualiza o texto de busca

        if (text.trim() === '') {
            setFilteredPecas(pecas); // Se não houver texto de busca, mostra todas as peças
            return;
        }

        const filtered = pecas.filter(peca => {
            const searchValue = text.toLowerCase();
            if (searchBy === 'codigo') {
                return peca.Codigo.toString().toLowerCase().includes(searchValue);
            } else if (searchBy === 'descricao') {
                return peca.Descricao.toLowerCase().includes(searchValue);
            }
            return false;
        });

        setFilteredPecas(filtered);
    };

    const deletePeca = async (codigo) => {
        try {
            console.log(`Tentando deletar peça com código: ${codigo}`);

            const response = await fetch('http://10.0.2.2:3000/api/pecas', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ codigo }),
            });

            if (!response.ok) {
                console.log('Resposta não OK do servidor:', response.status);
                throw new Error(`Erro ao deletar peça: Código ${response.status}`);
            }

            const result = await response.json();
            console.log('Resposta do servidor para exclusão:', result);

            fetchPecas(); // Atualiza a lista de peças após exclusão

        } catch (error) {
            console.error('Erro ao deletar peça:', error);
            Alert.alert('Erro', 'Falha ao excluir a peça.');
        }
    };

    const confirmDelete = (codigo) => {
        Alert.alert(
            'Confirmar Exclusão',
            'Tem certeza de que deseja excluir esta peça?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'OK', onPress: () => deletePeca(codigo) },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.navigate('Screens/StartMenu/startmenu')} />
            <Image
                source={require('../../../../assets/images/boxpro_logo.png')}
                style={styles.logo}
            />
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder={`Buscar por ${searchBy === 'codigo' ? 'Código' : 'Descrição'}`}
                    value={searchText}
                    onChangeText={handleSearch}
                />
                <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                    <MaterialIcons name="search" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {filteredPecas.length > 0 ? (
                <FlatList
                    data={filteredPecas}
                    keyExtractor={(item) => item.Codigo ? item.Codigo.toString() : Math.random().toString()}
                    renderItem={({ item }) => (
                        <View style={styles.pecaCard}>
                            <Text style={styles.pecaText}>{`Código: ${item.Codigo || 'N/A'}`}</Text>
                            <Text style={styles.pecaText}>{`Descrição: ${item.Descricao || 'N/A'}`}</Text>
                            <Text style={styles.pecaText}>{`Modelos Compatíveis: ${item.ModelosCompativeis || 'N/A'}`}</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Screens/PecasManagement/editPeca', {
                                        codigo: item.Codigo,
                                        descricao: item.Descricao,
                                        modelos: item.ModelosCompativeis
                                    })}
                                >
                                    <MaterialIcons name="edit" size={24} color="blue" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => confirmDelete(item.Codigo)}>
                                    <MaterialIcons name="delete" size={24} color="red" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.emptyMessage}>Nenhuma peça cadastrada.</Text>
            )}
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Screens/PecasManagement/addPeca')}>
                <Text style={styles.addButtonText}>+</Text>
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
        marginBottom: 25
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pecaCard: {
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        padding: 20,
        marginVertical: 8,
        flexDirection: 'column',
    },
    pecaText: {
        fontSize: 13,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 30,
        color: '#fff',
    },
    emptyMessage: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
});
