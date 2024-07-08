import { createTable, insert, update, select, selectById, deletar } from './Controler/pessoa.js'; // import config of SQLite
import express from 'express'; // Import express
import cors from 'cors'; // Import cors
import router from './router.js';

const app = express(); // Apply express to a variable
const PORT = 8080; // Port of server

// Enable all CORS requests
app.use(cors());

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }))// Validate forms and 404 instructions
app.use(express.json()); //Use json from express
app.use(router); //Calling router from routes of API

createTable(); // Create the SQLite table if don't exist

app.listen(PORT, () => {
    console.log(`Server aberto na porta ${PORT}`);
});