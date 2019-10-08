const axios = require('axios'); //yarn add axios (pacote para requisicoes em APIs externas) - instalado para fazer requisicao na api do github
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res){
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
              { _id: { $ne: user } },
              { _id: { $nin: loggedDev.likes } },  
              { _id: { $nin: loggedDev.dislikes } },
            ],
        })

        return res.json(users);
    },

    async store(req, res) {
        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username });

        if (userExists){
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);
        //axios.get é assincrono, ele demora a executar, logo preciso falar pro node aguardar a linha 7 executar (com await, aí coloca async antes do metodo store)

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
           name,
           user: username,
           bio,
           avatar 
        });

        return res.json(dev); //axios retorna o resultado da requisicao em response.data
    }
}