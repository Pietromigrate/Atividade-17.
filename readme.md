# Desafio: Cadastro de Produtos Fullstack

Este projeto é um sistema completo para cadastrar e apagar produtos. Ele usa HTML/CSS/JS na tela, Node.js no servidor e PostgreSQL no banco de dados.

##  Como Rodar o Projeto

Siga estes passos na ordem certa:

### 1. Ligar o Banco de Dados (Docker)
1. Abra o programa *Docker Desktop* no seu computador.
2. Abra o terminal na *raiz do projeto* (pasta principal) e digite:
```bash
docker-compose up -d
```

### 2. Ligar o Servidor (Backend)
1. No terminal, entre na pasta do backend:
```bash
cd backend
```
2. Instale os pacotes necessários:
```bash
npm install
```
3. Inicie o servidor:
```bash
node server17.js
```
*(Você verá a mensagem que o servidor está rodando na porta 3000).*

### 3. Abrir o Site (Frontend)
1. Vá até a pasta `frontend`.
2. Aperte F5 dentro da pasta index.html.

---

##  O que o projeto faz:
- Cadastra produtos (Nome, Categoria, Preço e Estoque).
- Mostra todos os produtos em uma tabela na hora.
- Tem um botão "X" que apaga o produto da tabela e do banco de dados.
- Não aceita cadastrar produtos com preço menor que zero ou estoque negativo.
