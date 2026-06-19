const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());


const pool = new Pool({
    user: 'Pietro',
    host: 'localhost',
    database: 'migrate_db',
    password: '123456',
    port: 5432,
});

async function criarTabela() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS produtos (
                id SERIAL PRIMARY KEY,
                nome TEXT NOT NULL,
                categoria TEXT NOT NULL,
                preco NUMERIC NOT NULL,
                estoque INTEGER NOT NULL
            );
        `);
        console.log("Tabela 'produtos' verificada/criada com sucesso!");
    } catch (erro) {
        console.error("Erro ao criar a tabela:", erro);
    }
}
criarTabela();

app.post('/produtos', async (req, res) => {
    const { nome, categoria, preco, estoque } = req.body;

    if (!nome) {
        return res.status(400).json({ erro: "O nome do produto é obrigatório." });
    }
    if (!categoria) {
        return res.status(400).json({ erro: "A categoria do produto é obrigatória." });
    }
    if (preco <= 0) {
        return res.status(400).json({ erro: "O preço do produto deve ser maior que zero." });
    }
    if (estoque < 0) {
        return res.status(400).json({ erro: "O estoque do produto não pode ser negativo." });
    }

    try {
        const resultado = await pool.query(
            'INSERT INTO produtos (nome, categoria, preco, estoque) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, categoria, preco, estoque]
        );
        return res.status(201).json(resultado.rows[0]);
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro ao salvar o produto no banco de dados." });
    }
});


app.get('/produtos', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM produtos');
        return res.status(200).json(resultado.rows);
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro ao buscar produtos no banco de dados." });
    }
});


app.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('DELETE FROM produtos WHERE id = $1', [id]);
        
        

        return res.status(200).json({ mensagem: "Produto excluído com sucesso." });
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro ao excluir o produto no banco de dados." });
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando com sucesso na porta 3000!");
});
