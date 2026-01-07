# Client Register API

[![CI](https://github.com/EdSantiag0/client-register-api/actions/workflows/tests.yml/badge.svg)](https://github.com/EdSantiag0/client-register-api/actions/workflows/tests.yml)

![Demonstração da API](https://github.com/EdSantiag0/client-register-api/blob/main/assets/demo.png)

## Descrição

O **Client Register API** é uma aplicação backend desenvolvida com Fastify, Zod, Prisma e MongoDB para gerenciar o cadastro de clientes. A API permite realizar operações CRUD (Create, Read, Update, Delete) de forma eficiente e segura, sendo testada usando o Insomnia.

## Funcionalidades

- **POST `/customer`**: Adiciona um novo cliente.
- **GET `/customer`**: Retorna todos os clientes cadastrados.
- **GET `/customer/:id`**: Retorna um cliente específico pelo ID.
- **PUT `/customer/:id`**: Atualiza as informações de um cliente.
- **DELETE `/customer/:id`**: Remove um cliente pelo ID.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Fastify**: Framework para aplicações web.
- **Prisma (v7)**: ORM para interação com o banco de dados.
- **MongoDB**: Banco de dados NoSQL.
- **Zod**: Para validação de dados.

### Qualidade e Confiabilidade

- **Jest**: Para Testes unitários
- **GitHub Actions**: Pipeline de CI
- **GitHub Secrets**: Variáveis de ambiente.
- **Insomnia**: Ferramenta para testar os endpoints da API.

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
4. Configure o banco de dados no arquivo `.env` (exemplo):
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

### Criar Cliente

**POST** `/customer`

**Body (JSON):**

```json
{
  "name": "João Silva",
  "email": "joao.silva@example.com"
}
```

---

### Listar Todos os Clientes

**GET** `/customer`

---

### Buscar Cliente por ID

**GET** `/customer/:id`

---

### Atualizar Cliente

**PUT** `/customer/:id`

**Body (JSON):**

```json
{
  "name": "João da Silva",
  "email": "joao.dasilva@example.com"
}
```

---

### Remover Cliente

**DELETE** `/customer/:id`

---

## Testes

Para rodar os testes unitários:

```bash
npm test

```

## Deploy

- Backend hospedado no **Render**
- Frontend consumindo a API via **Vercel**

## Autor

Desenvolvido por [Ed Santiago.](https://github.com/EdSantiag0)
