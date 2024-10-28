import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputUserName: {
        backgroundColor: '#FFF',
        width: 250,
        height: 40,
        borderRadius: 5,
        padding: 5,
    },
    inputForm: {
        backgroundColor: '#FFF',
        marginTop: 13,
        width: 250,
        height: 40,
        borderRadius: 5,
        padding: 5,
    },
    buttonForm: {
        backgroundColor: '#00229A',
        width: 250,
        height: 50,
        borderRadius: 5,
        marginTop: 13,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});
