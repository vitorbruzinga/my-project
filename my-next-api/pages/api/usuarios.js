// pages/api/usuarios.js
import UsuariosModel from '../../models/usuariosModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    const { acao } = req.body;

    switch (req.method) {
        case 'POST':
            try {
                switch (acao) {
                    case 'cadastrar':
                        const { nome, dataNascimento, email, senha } = req.body;
                        try {
                            const hashedPassword = await bcrypt.hash(senha, 10); // Salva a senha como hash
                            const resultado = await UsuariosModel.cadastrarUsuario(nome, dataNascimento, email, hashedPassword);
                            res.status(201).json({ message: 'Usuário cadastrado com sucesso!', resultado });
                        } catch (error) {
                            res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
                        }
                        break;

                    case 'login':
                        const { email: emailLogin, senha: senhaLogin } = req.body;
                        try {
                            const usuario = await UsuariosModel.buscarUsuarioPorEmail(emailLogin);
                            console.log("Usuário encontrado:", usuario);
                            // Verifique se o usuário foi encontrado
                            if (!usuario) {
                                return res.status(401).json({ error: 'Credenciais inválidas.' });
                            }
                            // Comparando a senha fornecida com a senha hashada
                            const senhaCorreta = await bcrypt.compare(senhaLogin, usuario.Senha);
                            if (!senhaCorreta) {
                                return res.status(401).json({ error: 'Credenciais inválidas.' });
                            }
                            // Gerando o token JWT
                            const token = jwt.sign({ id: usuario.Id }, 'seu-segredo', { expiresIn: '1h' });
                            res.status(200).json({ message: 'Login bem-sucedido', token });
                        } catch (error) {
                            console.error("Erro ao realizar login:", error);
                            res.status(500).json({ error: 'Erro ao realizar login. Por favor, verifique os dados e tente novamente.' });
                        }
                        break;

                    default:
                        res.status(400).json({ error: 'Ação não reconhecida. Use "cadastrar" ou "login".' });
                        break;
                }
            } catch (error) {
                res.status(500).json({ error: 'Erro ao processar a requisição.' });
            }
            break;

        case 'GET':
            const { email: emailConsulta } = req.query;
            try {
                const usuario = await UsuariosModel.buscarUsuarioPorEmail(emailConsulta);
                if (usuario) {
                    res.status(200).json(usuario);
                } else {
                    res.status(404).json({ message: 'Usuário não encontrado.' });
                }
            } catch (error) {
                res.status(500).json({ error: 'Erro ao buscar usuário.' });
            }
            break;

        case 'PUT':
            const { id, novaSenha } = req.body;
            try {
                const hashedPassword = await bcrypt.hash(novaSenha, 10);
                await UsuariosModel.atualizarSenha(id, hashedPassword);
                res.status(200).json({ message: 'Senha atualizada com sucesso!' });
            } catch (error) {
                res.status(500).json({ error: 'Erro ao atualizar senha.' });
            }
            break;

        case 'DELETE':
            const { id: idUsuario } = req.query;
            try {
                const resultado = await UsuariosModel.deletarUsuario(idUsuario);
                if (resultado.affectedRows === 0) {
                    return res.status(404).json({ message: 'Usuário não encontrado.' });
                }
                res.status(200).json({ message: 'Usuário deletado com sucesso!' });
            } catch (error) {
                res.status(500).json({ error: 'Erro ao deletar usuário.' });
            }
            break;

        default:
            res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
            res.status(405).end(`Método ${req.method} não permitido`);
    }
}
