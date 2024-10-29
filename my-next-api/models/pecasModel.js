// models/pecasModel.js
import sql from 'mssql';
import { connectToDatabase } from '../config/dbConfig';

class PecasModel {
    async cadastrarPeca(codigo, descricao, modelosCompativeis) {
        const pool = await connectToDatabase();
        try {
            // Validação do código
            if (typeof codigo !== 'number') {
                throw new Error('Código deve ser um número.');
            }

            const query = `
                INSERT INTO PecasCarro (Codigo, Descricao, ModelosCompativeis)
                VALUES (@codigo, @descricao, @modelosCompativeis);
            `;
            const result = await pool.request()
                .input('codigo', sql.Int, codigo)
                .input('descricao', sql.NVarChar(255), descricao)
                .input('modelosCompativeis', sql.NVarChar(255), modelosCompativeis)
                .query(query);
            return result.rowsAffected;
        } catch (error) {
            console.error('Erro ao cadastrar peça:', error);
            throw new Error('Erro ao cadastrar peça: ' + error.message);
        }
    }

    async listarPecas() {
        const pool = await connectToDatabase();
        try {
            const result = await pool.request().query('SELECT * FROM PecasCarro;');
            return result.recordset;
        } catch (error) {
            console.error('Erro ao listar peças:', error);
            throw new Error('Erro ao listar peças: ' + error.message);
        }
    }

    async buscarPecaPorCodigo(codigo) {
        const pool = await connectToDatabase();
        try {
            const query = 'SELECT * FROM PecasCarro WHERE Codigo = @codigo;';
            const result = await pool.request()
                .input('codigo', sql.Int, codigo)
                .query(query);
            return result.recordset[0];
        } catch (error) {
            console.error('Erro ao buscar peça:', error);
            throw new Error('Erro ao buscar peça: ' + error.message);
        }
    }

    async buscarPecaPorDescricao(descricao) {
        const pool = await connectToDatabase();
        try {
            const query = 'SELECT * FROM PecasCarro WHERE Descricao LIKE @descricao;';
            const result = await pool.request()
                .input('descricao', sql.VarChar, `%${descricao}%`)
                .query(query);
            return result.recordset;
        } catch (error) {
            console.error('Erro ao buscar peça por descrição:', error);
            throw new Error('Erro ao buscar peça: ' + error.message);
        }
    }

    async buscarPecaPorModelos(modelos) {
        const pool = await connectToDatabase();
        try {
            const query = 'SELECT * FROM PecasCarro WHERE ModelosCompativeis LIKE @modelos;';
            const result = await pool.request()
                .input('modelos', sql.VarChar, `%${modelos}%`)
                .query(query);
            return result.recordset;
        } catch (error) {
            console.error('Erro ao buscar peça por modelos:', error);
            throw new Error('Erro ao buscar peça: ' + error.message);
        }
    }


    async atualizarPeca(codigo, descricao, modelosCompativeis) {
        const pool = await connectToDatabase();
        try {
            // Validação dos parâmetros
            console.log('Valores recebidos:', { codigo, descricao, modelosCompativeis });

            if (!descricao || typeof descricao !== 'string' || descricao.trim() === '') {
                throw new Error('Descrição inválida. Deve ser uma string não vazia.');
            }

            if (!modelosCompativeis || typeof modelosCompativeis !== 'string' || modelosCompativeis.trim() === '') {
                throw new Error('Modelos Compatíveis inválidos. Deve ser uma string não vazia.');
            }

            const query = `
                UPDATE PecasCarro
                SET 
                    Descricao = @descricao,
                    ModelosCompativeis = @modelosCompativeis
                WHERE Codigo = @codigo;
            `;

            const result = await pool.request()
                .input('codigo', sql.Int, codigo)
                .input('descricao', sql.NVarChar(255), descricao.trim())
                .input('modelosCompativeis', sql.NVarChar(255), modelosCompativeis.trim())
                .query(query);

            if (result.rowsAffected[0] === 0) {
                throw new Error('Nenhuma peça encontrada com o código fornecido.');
            }
        } catch (error) {
            console.error('Erro ao atualizar peça:', error);
            throw new Error('Erro ao atualizar peça.');
        }
    }


    async removerPeca(codigo) {
        const pool = await connectToDatabase();
        try {
            const query = 'DELETE FROM PecasCarro WHERE Codigo = @codigo;';
            const resultado = await pool.request()
                .input('codigo', sql.Int, codigo)
                .query(query);

            return { affectedRows: resultado.rowsAffected[0] };
        } catch (error) {
            console.error('Erro ao remover peça:', error);
            throw new Error('Erro ao remover peça: ' + error.message);
        }
    }



}

export default new PecasModel();
