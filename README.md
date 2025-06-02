<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Project setup

 Uma API REST para gerenciamento de catálogo de produtos, construída com NestJS e PostgreSQL.

  O que é e Para que Serve

  Esta API foi desenvolvida para gerenciar produtos de e-commerce, permitindo que administradores:

  - Cadastrem novos produtos com validação automática
  - Consultem o catálogo completo
  - Atualizem informações de produtos existentes

  Regras de Negócio

  - ✅ Nomes únicos: Impede produtos duplicados
  - ✅ Preços válidos: Apenas valores positivos
  - ✅ Auditoria: Registra criação e modificação automaticamente

  Como Executar

  Pré-requisitos

  - Node.js 18+
  - PostgreSQL 14+

  Configuração Rápida

  # 1. Instalar dependências
  npm install

  # 2. Configurar banco PostgreSQL
  # Criar banco: products_api
  # Criar usuário: api_user / senha: api123456

  # 3. Criar arquivo .env
  DB_HOST=localhost
  DB_PORT=5432
  DB_USERNAME=api_user
  DB_PASSWORD=api123456
  DB_DATABASE=products_api
  NODE_ENV=development
  PORT=3000

  # 4. Iniciar aplicação
  npm run start:dev

  Endpoints Disponíveis

  POST /products - Criar produto

  # Requisição
  curl -X POST http://localhost:3000/products \
    -H "Content-Type: application/json" \
    -d '{"name": "iPhone 15", "price": 5000.00}'

  # Resposta (201)
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "iPhone 15",
    "price": 5000.00,
    "created_at": "2025-01-15T10:30:00.000Z",
    "updated_at": "2025-01-15T10:30:00.000Z"
  }

  GET /products - Listar todos os produtos

  # Requisição
  curl http://localhost:3000/products

  # Resposta (200)
  [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "iPhone 15",
      "price": 5000.00,
      "created_at": "2025-01-15T10:30:00.000Z",
      "updated_at": "2025-01-15T10:30:00.000Z"
    }
  ]

  PUT /products/:id - Atualizar produto

  # Requisição
  curl -X PUT http://localhost:3000/products/550e8400-e29b-41d4-a716-446655440000 \
    -H "Content-Type: application/json" \
    -d '{"name": "iPhone 15 Pro", "price": 5500.00}'

  # Resposta (200)
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "iPhone 15 Pro",
    "price": 5500.00,
    "created_at": "2025-01-15T10:30:00.000Z",
    "updated_at": "2025-01-15T10:35:00.000Z"
  }

  Principais Erros

  Nome Duplicado (409)

  {
    "statusCode": 409,
    "message": "Product with name 'iPhone 15' already exists",
    "error": "ConflictException"
  }

  Dados Inválidos (400)

  {
    "statusCode": 400,
    "message": ["Product name is required", "Product price cannot be negative"],
    "error": "Bad Request"
  }

  UUID Inválido (400)

  {
    "statusCode": 400,
    "message": "Invalid UUID format for id",
    "error": "AppException"
  }

  Teste Rápido

  # 1. Criar produto
  curl -X POST http://localhost:3000/products \
    -H "Content-Type: application/json" \
    -d '{"name": "MacBook Pro", "price": 8000.00}'

  # 2. Listar produtos
  curl http://localhost:3000/products

  # 3. Atualizar preço (usar UUID retornado)
  curl -X PUT http://localhost:3000/products/SEU_UUID_AQUI \
    -H "Content-Type: application/json" \
    -d '{"price": 7500.00}'

  Scripts

  npm run start:dev    # Desenvolvimento
  npm run build        # Compilar
  npm run start:prod   # Produção

  ---
  API rodando em: http://localhost:3000