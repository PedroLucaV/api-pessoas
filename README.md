# API People

## Introduction
Welcome to the **Express and SQLite People Management API**! This basic study project showcases how to build a simple CRUD API using Express and SQLite, perfect for learning and experimentation.

## Base URL
```
http://localhost:8080/
```

## Endpoints

### GET /
#### Description
This endpoint returns a simple welcome message indicating that the endpoint is empty.
- **Response**: 200 OK
  ```json
  "Primeiro end point, não há nada aqui!"
  ```

### GET /pessoas
#### Description
Retrieve a list of all people stored in the database.
- **Response**: 200 OK
  ```json
  [
    {
      "id": "number",
      "nome": "string",
      "idade": "number"
    },
    ...
  ]
  ```

### POST /pessoa
#### Description
Create a new person in the database.
- **Request**: JSON body with `nome` (string) and `idade` (number)
  ```json
  {
    "nome": "string",
    "idade": "number"
  }
  ```
- **Responses**:
  - **Success**: 201 Created
    ```json
    {
      "statusCode": 201,
      "message": "Usuário criado com sucesso!"
    }
    ```
  - **Missing Data**: 400 Bad Request
    ```json
    {
      "statusCode": 400,
      "message": "Está faltando dados para a criação do usuário"
    }
    ```
  - **User Already Exists**: 401 Unauthorized
    ```json
    {
      "statusCode": 401,
      "message": "Não é possível criar uma pessoa que já existe na base de dados!"
    }
    ```

### PUT /pessoa/:id
#### Description
Update an existing person’s information by ID.
- **Request**: URL parameter `id`, JSON body with `nome` (string) and `idade` (number)
  ```json
  {
    "nome": "string",
    "idade": "number"
  }
  ```
- **Responses**:
  - **Success**: 200 OK
    ```json
    {
      "statusCode": 200,
      "message": "Usuário atualizado com sucesso!"
    }
    ```
  - **Missing Data**: 400 Bad Request
    ```json
    {
      "statusCode": 400,
      "message": "Você precisa informar o Nome e a idade"
    }
    ```
  - **User Not Found**: 404 Not Found
    ```json
    "Não há pessoas com este id"
    ```

### DELETE /pessoa/:id
#### Description
Delete a specific person by ID.
- **Request**: URL parameter `id`
- **Responses**:
  - **Success**: 200 OK
    ```json
    "Pessoa deletada com sucesso!"
    ```
  - **User Not Found**: 404 Not Found
    ```json
    "Não há pessoas com este id"
    ```

### GET /pessoa/:id
#### Description
Retrieve information about a specific person by ID.
- **Request**: URL parameter `id`
- **Responses**:
  - **Success**: 200 OK
    ```json
    {
      "id": "number",
      "nome": "string",
      "idade": "number"
    }
    ```
  - **User Not Found**: 404 Not Found
    ```json
    "Não foi encontrada pessoas com este ID"
    ```
