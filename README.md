# Client Register API

## Descrição

O Client Register API é uma aplicação backend desenvolvida com Fastify, Prisma e MongoDB para gerenciar o cadastro de clientes. Esta API permite realizar operações CRUD (Create, Read, Update, Delete) de forma eficiente e segura, sendo testada usando o Insomnia.

## Funcionalidades

- POST /customer: Adiciona um novo cliente.

- GET /customer: Retorna todos os clientes cadastrados.

- GET /customer/:id: Retorna um cliente específico pelo ID.

- PUT /customer: Atualiza as informações de um cliente.

- DELETE /customer/:id: Remove um cliente pelo ID.

## Tecnologias Utilizadas

- Node.js: Ambiente de execução JavaScript.

- Fastify: Framework para aplicações web.

- Prisma: ORM para interação com o banco de dados.

- MongoDB: Banco de dados NoSQL.

- Insomnia: Ferramenta para testar os endpoints da API.

## Instalação

1. Clone o repositório:

```
git clone https://github.com/EdSantiag0/client-register-api.git
```

2. Acesse o diretório do projeto:

```
cd client-register-api
```

3. Instale as dependências:

```
npm install
```

4. Configure o banco de dados no arquivo .env (exemplo):

```
DATABASE_URL="mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"
```

## Uso

1. Inicie o servidor:

```
npm run dev
```

2. Utilize o Insomnia ou outra ferramenta similar para acessar os seguintes endpoints:

## Endpoints

POST /customer

Descrição: Cria um novo cliente.

Body (JSON):

```
{
  "name": "João Silva",
  "email": "joao.silva@example.com"
}
```

GET /customer

Descrição: Retorna todos os clientes cadastrados.

GET /customer/:id

Descrição: Retorna um cliente específico pelo ID.

PUT /customer

Descrição: Atualiza um cliente existente.

Body (JSON):

```
{
  "id": "<id_do_cliente>",
  "name": "João da Silva",
  "email": "joao.dasilva@example.com"
}
```

DELETE /customer/:id

Descrição: Remove um cliente pelo ID.

## Autor

Desenvolvido por [Ed Santiago.](https://github.com/EdSantiag0)
