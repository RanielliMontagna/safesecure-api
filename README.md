<div align='center'>
    <img src='public/safe-secure-logo.svg' alt='Safe Secure Logo' width='100' />
    <h1 align='center' style={{margin: 0}}>Safe Secure API</h1>
    <p align='center' style={{margin: 0}}>A api responsável por fazer o controle de equipamentos e alocação de equipamentos.</p>
</div>

## 📖 Sobre

A Safe Secure API é uma api responsável por fazer o controle de equipamentos, fazendo o cadastro e listagem dos equipamentos, além de fazer o controle de alocação dos equipamentos.

## 📚 Funcionalidades

- [x] Login de usuário com autenticação JWT.
- [ ] Cadastro, listagem, atualização e remoção de equipamentos.
- [x] Cadastro, listagem, atualização e remoção de categorias para os equipamentos.
- [x] Cadastro, listagem, atualização e remoção de funcionários.
- [ ] Alocação de equipamentos para funcionários.
- [ ] Sistema de registro de logs de ações realizadas na aplicação.

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/en/) - Ambiente de execução Javascript server-side.
- [Fastify](https://www.fastify.io/) - Framework web para Node.js.
- [Prisma](https://www.prisma.io/) - ORM para Node.js e TypeScript.
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional.
- [Docker](https://www.docker.com/) - Plataforma para desenvolvimento, envio e execução de aplicativos.
- [JWT](https://jwt.io/) - JSON Web Tokens.
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - Biblioteca para criptografia de senhas.

## 📦 Instalação

```bash
# Clone o repositório
$ git clone

# Acesse a pasta do projeto
$ cd safesecure-api

# Instale as dependências
$ npm install

# Crie o arquivo .env
$ cp .env.example .env

# Rode o docker-compose para subir o banco de dados
$ docker-compose up -d

# Execute as migrations
$ npx prisma migrate dev

# Inicie a aplicação em modo de desenvolvimento
$ npm run dev
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
