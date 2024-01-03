# CashQuest API

A CashQuest API é a infraestrutura por trás de um aplicativo mobile de organização financeira gamificada. Foi desenvolvido como parte do trabalho de conclusão do Curo de Desenvolvimento de sistemas.

## Pré-requisitos

Certifique-se de ter o seguinte instalado antes de começar:

- [Node.js](https://nodejs.org/): O ambiente de execução JavaScript.
- [Yarn](https://yarnpkg.com/): Gerenciador de pacotes para instalar e gerenciar dependências.
- [TypeScript](https://www.typescriptlang.org/): Superset do JavaScript que adiciona tipagem estática.
- [MongoDB](https://www.mongodb.com/): Banco de dados NoSQL utilizado pelo projeto.

## Configuração do Ambiente de Desenvolvimento

1. Clone o repositório:

```bash
git clone link-do-repositório
```

2. Instale as dependências:
`yarn install`

3. Configure as variáveis de ambiente (se necessário):
Crie um arquivo chamado `.env` na raiz do seu projeto e configure as variáveis de ambiente necessárias. Um exemplo de arquivo `.env` pode ser o seguinte:

```
# Porta para o servidor Express
PORT=8000

# URL de conexão com o MongoDB
MONGODB_URL=seu-link-de-acesso-ao-mongo-db

# Chave secreta para assinatura de JWT
SECRET=sua-chave-secreta
```

4. Inicie o servidor de desenvolvimento:
- `yarn start:dev`

## Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes scripts:

- `yarn start:dev`: Inicia o servidor em modo de desenvolvimento utilizando o Nodemon.
- `yarn start`: Inicia o servidor em modo de produção.
- `yarn build`: Compila o projeto usando o TypeScript Compiler (`tsc`).

Certifique-se de executar `yarn install` antes de usar esses scripts para garantir que todas as dependências sejam instaladas corretamente.

Lembre-se de ajustar os scripts conforme necessário para atender às suas necessidades específicas de desenvolvimento e produção.

## Estrutura do Projeto

src/

|-- controllers/

|-- data/

|-- database/

|-- middlewares/

|-- models/

|-- repositorys/

|-- routes/

|-- index.ts

## Tecnologias Utilizadas

O projeto faz uso das seguintes tecnologias e ferramentas:

- [Node.js](https://nodejs.org/): Ambiente de execução JavaScript do lado do servidor.
- [Express.js](https://expressjs.com/): Framework web para Node.js, utilizado para criar APIs RESTful.
- [TypeScript](https://www.typescriptlang.org/): Superset do JavaScript que adiciona tipagem estática ao código.
- [MongoDB](https://www.mongodb.com/): Banco de dados NoSQL utilizado para armazenar dados de forma eficiente.
- [bcrypt](https://www.npmjs.com/package/bcrypt): Biblioteca para hash de senhas, utilizado para armazenar senhas de forma segura.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Implementação de JSON Web Tokens (JWT) para autenticação.
- [Validator](https://www.npmjs.com/package/validator): Biblioteca para validação de dados no lado do servidor.
- [dotenv](https://www.npmjs.com/package/dotenv): Carrega variáveis de ambiente a partir de um arquivo para facilitar a configuração.
- [Nodemon](https://www.npmjs.com/package/nodemon): Utilitário que monitora alterações nos arquivos e reinicia automaticamente o servidor durante o desenvolvimento.
- [ESLint](https://eslint.org/): Ferramenta de linting para identificar e corrigir problemas no código.
- [Prettier](https://prettier.io/): Formatador de código que mantém a consistência no estilo do código.
- [Date-fns](https://date-fns.org/): Biblioteca para manipulação de datas em JavaScript.

## Autores

- [Willian Costa](https://github.com/costaowillian) - Desenvolvedor principal e criador do projeto.
