// app/auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logout = async () => {
    try {
        await AsyncStorage.removeItem('userToken'); // Remove o token do AsyncStorage
        return true;
    } catch (error) {
        console.error('Erro ao deslogar:', error);
        return false;
    }
};
