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

        default:
            res.setHeader('Allow', ['POST', 'GET']);
            res.status(405).end(`Método ${req.method} não permitido`);
    }
}
