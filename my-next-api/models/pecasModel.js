// models/pecasModel.js
import { connectToDatabase } from '../config/dbConfig';

class PecasModel {
    async cadastrarPeca(codigo, descricao, modelosCompativeis) {
        const pool = await connectToDatabase();
        try {
            const query = `
        INSERT INTO PecasCarro (Codigo, Descricao, ModelosCompativeis)
        VALUES (@codigo, @descricao, @modelosCompativeis);
      `;
            const result = await pool.request()
                .input('codigo', codigo)
                .input('descricao', descricao)
                .input('modelosCompativeis', modelosCompativeis)
                .query(query);
            return result.rowsAffected;
        } catch (error) {
            console.error('Erro ao cadastrar peça:', error);
            throw new Error('Erro ao cadastrar peça.');
        }
    }

    async listarPecas() {
        const pool = await connectToDatabase();
        try {
            const result = await pool.request().query('SELECT * FROM PecasCarro;');
            return result.recordset;
        } catch (error) {
            console.error('Erro ao listar peças:', error);
            throw new Error('Erro ao listar peças.');
        }
    }

    async atualizarPeca(id, codigo, descricao, modelosCompativeis) {
        const pool = await connectToDatabase();
        try {
            const query = `
        UPDATE PecasCarro
        SET 
          Codigo = COALESCE(@codigo, Codigo),
          Descricao = COALESCE(@descricao, Descricao),
          ModelosCompativeis = COALESCE(@modelosCompativeis, ModelosCompativeis)
        WHERE Id = @id;
      `;
            await pool.request()
                .input('id', id)
                .input('codigo', codigo)
                .input('descricao', descricao)
                .input('modelosCompativeis', modelosCompativeis)
                .query(query);
        } catch (error) {
            console.error('Erro ao atualizar peça:', error);
            throw new Error('Erro ao atualizar peça.');
        }
    }

    async removerPeca(id) {
        const pool = await connectToDatabase();
        try {
            const query = 'DELETE FROM PecasCarro WHERE Id = @id;';
            await pool.request()
                .input('id', id)
                .query(query);
        } catch (error) {
            console.error('Erro ao remover peça:', error);
            throw new Error('Erro ao remover peça.');
        }
    }

    async buscarPecaPorCodigo(codigo) {
        const pool = await connectToDatabase();
        try {
            const query = 'SELECT * FROM PecasCarro WHERE Codigo = @codigo;';
            const result = await pool.request()
                .input('codigo', codigo)
                .query(query);
            return result.recordset[0]; // Retorna a peça encontrada
        } catch (error) {
            console.error('Erro ao buscar peça:', error);
            throw new Error('Erro ao buscar peça.');
        }
    }
}

export default new PecasModel();
