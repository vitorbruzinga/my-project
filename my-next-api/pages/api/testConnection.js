import { connectToDatabase } from '../../config/dbConfig';

export default async function handler(req, res) {
    try {
        const pool = await connectToDatabase();
        if (pool) {
            res.status(200).json({ message: 'Conexão com o banco de dados bem-sucedida' });
        } else {
            res.status(500).json({ message: 'Falha ao conectar ao banco de dados' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao conectar ao banco de dados', error });
    }
}
