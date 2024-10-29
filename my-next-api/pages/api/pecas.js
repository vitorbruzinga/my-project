// pages/api/pecas.js
import PecasModel from '../../models/pecasModel';

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { codigo, descricao, modelosCompativeis } = req.body;

            if (!codigo || isNaN(Number(codigo))) {
                return res.status(400).json({ message: "Código deve ser um número válido e não pode ser nulo." });
            }

            if (!descricao) {
                return res.status(400).json({ message: "Descrição não pode ser nula." });
            }

            const codigoNumber = Number(codigo);

            try {
                await PecasModel.cadastrarPeca(codigoNumber, descricao, modelosCompativeis);
                res.status(201).json({ message: 'Peça cadastrada com sucesso!' });
            } catch (error) {
                console.error('Erro ao cadastrar peça:', error);
                res.status(500).json({ error: error.message });
            }
            break;

        case 'GET':
            const { codigo: codigoConsulta, descricao: descricaoConsulta, modelos: modelosConsulta } = req.query;

            try {
                let peca;
                if (codigoConsulta) {
                    peca = await PecasModel.buscarPecaPorCodigo(codigoConsulta);
                } else if (descricaoConsulta) {
                    peca = await PecasModel.buscarPecaPorDescricao(descricaoConsulta);
                } else if (modelosConsulta) {
                    peca = await PecasModel.buscarPecaPorModelos(modelosConsulta);
                } else {
                    peca = await PecasModel.listarPecas();
                }

                if (peca && peca.length) {
                    res.status(200).json(peca);
                } else {
                    res.status(404).json({ message: 'Peça não encontrada.' });
                }
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        case 'PUT':
            const codigoParaAtt = req.query.codigo;
            const { descricao: novaDescricao, modelosCompativeis: novosModelos } = req.body;
            // Log dos valores recebidos
            console.log('Valores recebidos:', { codigoParaAtt, novaDescricao, novosModelos });

            try {
                await PecasModel.atualizarPeca(codigoParaAtt, novaDescricao, novosModelos);
                res.status(200).json({ message: 'Peça atualizada com sucesso!' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        case 'DELETE':
            const { codigo: codigoParaRemover } = req.body;

            if (!codigoParaRemover) {
                return res.status(400).json({ error: 'Código é necessário para remover a peça.' });
            }

            try {
                const resultado = await PecasModel.removerPeca(codigoParaRemover);
                if (resultado.affectedRows === 0) {
                    return res.status(404).json({ error: 'Peça não encontrada.' });
                }
                res.status(200).json({ message: 'Peça removida com sucesso!' });
            } catch (error) {
                console.error('Erro ao deletar peça:', error);
                res.status(500).json({ error: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
            res.status(405).end(`Método ${req.method} não permitido`);
    }
}
