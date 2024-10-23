// pages/api/pecas.js
import PecasModel from '../../models/pecasModel';

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { codigo, descricao, modelosCompativeis } = req.body;

            // Validação de entrada
            if (!codigo || isNaN(Number(codigo))) {
                return res.status(400).json({ message: "Código deve ser um número válido e não pode ser nulo." });
            }

            if (!descricao) {
                return res.status(400).json({ message: "Descrição não pode ser nula." });
            }

            const codigoNumber = Number(codigo); // Converte o código para número

            try {
                await PecasModel.cadastrarPeca(codigoNumber, descricao, modelosCompativeis);
                res.status(201).json({ message: 'Peça cadastrada com sucesso!' });
            } catch (error) {
                console.error('Erro ao cadastrar peça:', error);
                res.status(500).json({ error: error.message });
            }
            break;

        case 'GET':
            const { codigo: codigoConsulta } = req.query; // Pega o código da query
            if (codigoConsulta) {
                try {
                    const peca = await PecasModel.buscarPecaPorCodigo(codigoConsulta);
                    if (peca) {
                        res.status(200).json(peca);
                    } else {
                        res.status(404).json({ message: 'Peça não encontrada.' });
                    }
                } catch (error) {
                    res.status(500).json({ error: error.message });
                }
            } else {
                try {
                    const pecas = await PecasModel.listarPecas();
                    res.status(200).json(pecas);
                } catch (error) {
                    res.status(500).json({ error: error.message });
                }
            }
            break;

        case 'PUT':
            // Extrai os valores do corpo da requisição
            const { codigo: novoCodigo, descricao: novaDescricao, modelosCompativeis: novosModelos } = req.body;

            // Log dos valores recebidos
            console.log('Valores recebidos:', { novoCodigo, novaDescricao, novosModelos });

            try {
                // Atualiza a peça com os valores extraídos
                await PecasModel.atualizarPeca(novoCodigo, novaDescricao, novosModelos);
                res.status(200).json({ message: 'Peça atualizada com sucesso!' });
            } catch (error) {
                // Retorna erro em caso de falha
                res.status(500).json({ error: error.message });
            }
            break;


        case 'DELETE':
            const { codigo: codigoParaRemover } = req.body;

            // Verifique se o código está presente
            if (codigoParaRemover === undefined || codigoParaRemover === null) {
                return res.status(400).json({ error: 'Código é necessário para remover a peça.' });
            }

            try {
                await PecasModel.removerPeca(codigoParaRemover); // código já é um número
                res.status(200).json({ message: 'Peça removida com sucesso!' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
            res.status(405).end(`Método ${req.method} não permitido`);

    }

}
