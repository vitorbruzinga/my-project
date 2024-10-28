// pages/api/usuarios.js
import UsuariosModel from '../../models/usuariosModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    const { acao } = req.body;

    switch (req.method) {
        case 'POST':
            try {
                switch (acao) {
                    case 'cadastrar':
                        const { nome, dataNascimento, email, senha } = req.body;
                        try {
                            const hashedPassword = await bcrypt.hash(senha, 10);
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
                            if (!usuario) {
                                return res.status(401).json({ error: 'Credenciais inválidas.' });
                            }
                            const senhaCorreta = await bcrypt.compare(senhaLogin, usuario.Senha);
                            if (!senhaCorreta) {
                                return res.status(401).json({ error: 'Credenciais inválidas.' });
                            }
                            const token = jwt.sign({ id: usuario.Id }, 'seu-segredo', { expiresIn: '1h' });
                            res.status(200).json({ message: 'Login bem-sucedido', token });
                        } catch (error) {
                            console.error("Erro ao realizar login:", error);
                            res.status(500).json({ error: 'Erro ao realizar login. Por favor, verifique os dados e tente novamente.' });
                        }
                        break;

                    case 'enviar-codigo-recuperacao':
                        const { email: emailRecuperacao } = req.body;
                        try {
                            const usuario = await UsuariosModel.buscarUsuarioPorEmail(emailRecuperacao);
                            if (!usuario) {
                                return res.status(404).json({ error: 'Usuário não encontrado.' });
                            }
                            const codigoRecuperacao = Math.floor(1000 + Math.random() * 9000).toString(); // Código de 4 dígitos

                            // Configuração de email usando nodemailer
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'trabalhoreactnative@gmail.com',
                                    pass: 'xcjx bncb glnp wepp'
                                }
                            });

                            const mailOptions = {
                                from: 'trabalhoreactnative@gmail.com',
                                to: emailRecuperacao,
                                subject: 'Código de Recuperação de Senha',
                                text: `Seu código de recuperação é: ${codigoRecuperacao}`
                            };

                            await transporter.sendMail(mailOptions);
                            await UsuariosModel.definirCodigoRecuperacao(emailRecuperacao, codigoRecuperacao);
                            res.status(200).json({ message: 'Código de recuperação enviado ao email.' });
                        } catch (error) {
                            console.error('Erro ao enviar código de recuperação:', error);
                            res.status(500).json({ error: 'Erro ao enviar código de recuperação.' });
                        }
                        break;

                    case 'validar-codigo-e-resetar-senha':
                        const { email: emailValidacao, codigo, novaSenha } = req.body;
                        try {
                            const usuario = await UsuariosModel.buscarUsuarioPorEmail(emailValidacao);
                            if (!usuario || usuario.codigo_recuperacao !== codigo) {
                                return res.status(400).json({ error: 'Código de recuperação inválido.' });
                            }
                            const hashedPassword = await bcrypt.hash(novaSenha, 10);
                            await UsuariosModel.atualizarSenha(usuario.Id, hashedPassword);
                            await UsuariosModel.definirCodigoRecuperacao(emailValidacao, null); // Remove o código após redefinir a senha
                            res.status(200).json({ message: 'Senha redefinida com sucesso.' });
                        } catch (error) {
                            console.error('Erro ao redefinir senha:', error);
                            res.status(500).json({ error: 'Erro ao redefinir senha.' });
                        }
                        break;

                    default:
                        res.status(400).json({ error: 'Ação não reconhecida.' });
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
