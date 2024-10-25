import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20, 
    },
    title: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 40, 
        textAlign: 'center',
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        paddingVertical: 20, 
        paddingHorizontal: 15, 
        borderRadius: 10,
        width: 280, 

    },
    inputEmail: {
        backgroundColor: '#FFF',
        width: 250,
        height: 35,
        borderRadius: 5,
        padding: 5,
        marginBottom: 15, 
    },
    inputPassword: {
        backgroundColor: '#FFF',
        width: 250,
        height: 35,
        borderRadius: 5,
        padding: 5,
        marginBottom: 20, 
    },
    buttonForm: {
        backgroundColor: '#00229A',
        width: 100,
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20, 
    },
    textButton: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    ButtonCreate: {
        color: '#000',
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    }
});
