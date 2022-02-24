const express=require('express');
const route = express.Router();
const controller = require('../controller/LivroController');

route.get('/',controller.getAll);
route.get('/livros',controller.getAll);
route.get('/livros/:id',controller.getLivroByID);
route.get('/livros/:titulo', controller.getByTitulo);
route.post('/',controller.postLivros);
route.delete("/:id", controller.deleteLivros);
route.delete("/", controller.deleteLivroAntigo);
route.put("/:id", controller.putLivros);
route.patch("/:id", controller.patchLivros);

module.exports= route