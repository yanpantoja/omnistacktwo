const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); //permite que minha aplicação seja acessada por qualquer endereço, sem ele o react será bloqueado ao tentar comunicar com o backend

const routes = require('./routes');

const server = express();

mongoose.connect('mongodb+srv://omni:omni@cluster0-x7f0l.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);
