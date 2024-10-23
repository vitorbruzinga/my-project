// pages/api/usuarios.js
import UsuarioModel from '../../models/usuariosModel';

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { nome, dataNascimento, email, senha } = req.body;
            try {
                await UsuarioModel.cadastrarUsuario(nome, dataNascimento, email, senha);
                res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        case 'GET':
            const { email: emailConsulta } = req.query;
            try {
                const usuario = await UsuarioModel.buscarUsuarioPorEmail(emailConsulta);
                if (usuario) {
                    res.status(200).json(usuario);
                } else {
                    res.status(404).json({ message: 'Usuário não encontrado.' });
                }
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        case 'PUT':
            const { id, novaSenha } = req.body; // Espera id e novaSenha no corpo da requisição
            try {
                await UsuarioModel.atualizarSenha(id, novaSenha);
                res.status(200).json({ message: 'Senha atualizada com sucesso!' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        case 'DELETE':
            const { id: idUsuario } = req.query; // Espera o id do usuário na query
            try {
                const usuario = await UsuarioModel.deletarUsuario(idUsuario);
                if (usuario.affectedRows === 0) {
                    return res.status(404).json({ message: 'Usuário não encontrado.' });
                }
                res.status(200).json({ message: 'Usuário deletado com sucesso!' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
            res.status(405).end(`Método ${req.method} não permitido`);
    }
}
