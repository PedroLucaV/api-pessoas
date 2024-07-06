import { Router } from "express";
import { insert, update, select, selectById, deletar } from './Controler/pessoa.js';

const router = Router();

router.get('/', (req, res) => {
    res.end("Primeiro end point, não há nada aqui!"); // First end point, only a return of a phrase
});

router.post('/pessoa', async (req, res) => { // Endpoint to create a new people on table in SQLite
    const { nome, idade } = req.body;
    if (!nome || !idade) { // Validate if has name and age
        res.json({
            "statusCode": 400,
            "message": "Está faltando dados para a criação do usuário"
        });
        return;
    }

    const cadastradas = await select();

    // Check if the user exist in Database
    if (cadastradas.find(pessoa => pessoa.nome == nome && pessoa.idade == idade)) {
        res.json({
            "statusCode": 401,
            "message": "Não é possivel criar uma pessoa que já existe na base dados!" // Return in json
        });
        return;
    }
    
    // Constroi um objeto
    const pessoas = {
        nome: nome,
        idade: idade
    };

    insert(pessoas); // Use the body data from the api and insert in db
    res.json({
        "statusCode": 201,
        "message": "Usuario criado com sucesso!" // Return in json
    });
});

router.put('/pessoa/:id', async (req, res) => { // Endpoint to edit some people by id
    const { id } = req.params; // Obtenha o ID dos parâmetros da URL
    const pessoas = await select();
    const validaPessoa = pessoas.some(pessoa => pessoa.id == id);
    if(!validaPessoa){
        res.end("Não há pessoas com este id")
    }else{
        const { nome, idade } = req.body;

        if (!nome || !idade) { // Verifique se Nome e a idade estão presentes
            res.json({
                "statusCode": 400,
                "message": "Você precisa informar o Nome e a idade"
            });
            return;
        }

        const pessoa = {
            nome: nome,
            idade: idade
        };

        update(pessoa, id); // Atualize a pessoa no banco de dados
        res.json({
            "statusCode": 200,
            "message": "Usuário atualizado com sucesso!" // Retorno em JSON
        });
    }
});

router.get('/pessoas', async (req, res) => { // Pull all people from the db
    let pessoas = await select(); // In an async function, await the select function from pessoa.js works to use
    res.json(pessoas); // Return in json
});

router.get('/pessoa/:id', async (req, res) => { // Pull some specific people by id
    const { id } = req.params;
    let pessoas = await selectById(id); // In an async function, await the select function from pessoa.js works to use
    if(pessoas.length == 0){
        res.end("Não foi encontrada pessoas com este ID") 
    }else{
        res.json(pessoas);
    }
});

router.delete('/pessoa/:id', async (req, res) => { // Delete some people by id
    const { id } = req.params;
    const pessoas = await select();
    const validaPessoa = pessoas.some(pessoa => pessoa.id == id);
    if(!validaPessoa){
        res.end("Não há pessoas com este id")
    }else{
        deletar(id);
        res.end("Pessoa deletada com sucesso!");
    }
});

export default router;