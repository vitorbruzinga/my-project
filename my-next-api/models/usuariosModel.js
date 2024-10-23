// models/usuariosModel.js
import { connectToDatabase } from '../config/dbConfig';

class UsuarioModel {
    async cadastrarUsuario(nome, dataNascimento, email, senha) {
        const pool = await connectToDatabase();
        try {
            const query = `
            INSERT INTO usuarios (nome, email, senha, DataNascimento)
            VALUES (@nome, @email, @senha, @DataNascimento)
        `;

            const result = await pool.request()
                .input('nome', nome)
                .input('dataNascimento', dataNascimento)
                .input('email', email)
                .input('senha', senha)
                .query(query);
            return result.rowsAffected;
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            throw new Error('Erro ao cadastrar usuário.');
        }
    }

    async buscarUsuarioPorEmail(email) {
        const pool = await connectToDatabase();
        try {
            const query = 'SELECT * FROM usuarios WHERE email = @email;';
            const result = await pool.request()
                .input('email', email)
                .query(query);
            return result.recordset[0]; // Retorna o primeiro usuário encontrado
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            throw new Error('Erro ao buscar usuário.');
        }
    }

    async atualizarSenha(id, novaSenha) {
        const pool = await connectToDatabase();
        try {
            const query = 'UPDATE usuarios SET senha = @novaSenha WHERE id = @id;';
            await pool.request()
                .input('id', id)
                .input('novaSenha', novaSenha)
                .query(query);
        } catch (error) {
            console.error('Erro ao atualizar senha:', error);
            throw new Error('Erro ao atualizar senha.');
        }
    }
}

export default new UsuarioModel();
