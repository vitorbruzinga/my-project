const sql = require('mssql');

const config = {
    user: 'sa',
    password: '12345678',
    server: 'DESKTOP-QBPCFSG',
    database: 'ProjetoReact',
    options: {
        encrypt: false, // Se estiver usando Azure
        enableArithAbort: true
    }
};

async function connectToDatabase() {
    try {
        const pool = await sql.connect(config);
        console.log('Conexão com o banco de dados bem-sucedida');
        return pool;
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    }
}

// Mude de module.exports para exportar
export { connectToDatabase, sql };
