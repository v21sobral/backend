const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize'); // Corrigido o nome

// Configuração do Sequelize para conectar ao banco de dados MySQL.
const sequelize = new Sequelize('db_aula', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// Definição da tabela do Usuário.
const Usuario = sequelize.define('Usuario', {
    nome: { 
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    email: {  
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true
    },
    telefone: { 
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Sincronização do modelo com o banco de dados.
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

// Rota para criar um novo usuário.

app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar usuários' });
    }
});

app.post('/usuarios', async (req, res) => {
    try {
        const { nome, email, telefone } = req.body;
        const novoUsuario = await Usuario.create({ nome, email, telefone });
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(500).json({ ERRO: 'Este email já existe!' });
    }
});



sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
        console.log('Tabela de Usuários sincronizada com o banco de dados.');
    });
}).catch(err => {
    console.error('Erro ao sincronizar o banco de dados:', err);
});