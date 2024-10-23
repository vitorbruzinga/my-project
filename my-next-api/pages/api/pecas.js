// pages/api/pecas.js
import PecasModel from '../../models/pecasModel';

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { codigo, descricao, modelosCompativeis } = req.body;
            try {
                await PecasModel.cadastrarPeca(codigo, descricao, modelosCompativeis);
                res.status(201).json({ message: 'Peça cadastrada com sucesso!' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        case 'GET':
            try {
                const pecas = await PecasModel.listarPecas();
                res.status(200).json(pecas);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['POST', 'GET']);
            res.status(405).end(`Método ${req.method} não permitido`);
    }
}
