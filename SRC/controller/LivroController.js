const res = require("express/lib/response");
const fs = require("fs");
const{v4:uuid}=require("uuid");
const livrosMongo = require("../model/LivroModel.js");

const livros= require('../model/LivroModel.js')


const getAll = async (req, res) => {
  try {
    const livros = await livrosMongo.find({});
    res.status(200).render('index', {
      livrosList: livros
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


    // método find retorna o primeiro resultado que passar na condição
    // método filter retorna um array de resultados
    // como ID é um identificador único, é mais indicado utilizar FIND


    const getLivroByID = async (req, res) => {
      try {
        const id = req.params.id;
        const livro = await livrosMongo.findById(id);
    
        if (!livro) {
          return res.status(404).send({ message: 'Livro não encontrado' });
        }
    
        res.status(200).send(livro);
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    };
    


    const getByTitulo = async (req, res) => {
      try {
        const titulo = req.params.titulo;
        const livroFiltradoPorTitulo = await livrosMongo.findOne({ titulo: titulo });
    
        if (!livroFiltradoPorTitulo) {
          return res.status(404).send({ message: 'Esse titulo não foi encontrado' });
        }
    
        res.status(200).send(livroFiltradoPorTitulo);
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    };
    


    const postLivros = async (req, res) => {
      try {
        console.log(req.body);
        let livro = new livros(req.body);
        await livro.save();
        res.status(201).send(livro.toJSON());
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    };
    


    const deleteLivros = async (req, res) => {
      const id = req.params.id;
      try {
        const livro = await livros.findOne({ id });
        if (livro) {
          await livros.deleteMany({ id });
          res.status(200).send({ message: 'Livro removido com sucesso', status: 'SUCCESS' });
        } else {
          res.status(200).send({ message: 'Não há livro para ser removido', status: 'EMPTY' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erro ao deletar o livro', status: 'ERROR' });
      }
    };
    


  //Deleta quando concluido = true
  const deleteLivroAntigo = async (req, res) => {
    try {
      await livros.deleteMany({ antigo: true });
      res.status(200).send({ message: 'Livros antigos removidos com sucesso', status: 'SUCCESS' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Erro ao remover livros antigos', status: 'ERROR' });
    }
  };
  


  const putLivros = async (req, res) => {
    const id = req.params.id;
    try {
      // Atualiza o livro com o ID especificado usando os dados do corpo da requisição
      await livros.updateOne({ id }, { $set: req.body });
      res.status(200).send({ message: 'Livro atualizado com sucesso', status: 'SUCCESS' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Erro ao atualizar o livro', status: 'ERROR' });
    }
  };
  


    //Ele vai buscar dentro do objeto tarefaASerModificada atributos em que o nome coincida com os do objeto atualizacao, e vai substituir o valor

    const patchLivros = async (req, res) => {
      const id = req.params.id;
      const atualizacao = req.body;
      console.log(atualizacao);
    
      try {
        // Encontra o livro a ser modificado pelo ID
        const LivroASerModificado = await livros.findOne({ id });
    
        if (!LivroASerModificado) {
          return res.status(404).send({ message: 'Livro não encontrado' });
        }
    
        // Atualiza os atributos do livro com base nos dados de atualização
        Object.keys(atualizacao).forEach((chave) => {
          LivroASerModificado[chave] = atualizacao[chave];
        });
    
        // Salva as alterações no banco de dados
        await LivroASerModificado.save();
    
        console.log("Livro atualizado com sucesso!");
        return res.status(200).send(LivroASerModificado);
      } catch(err) {
        console.error(err);
        return res.status(500).send({ message: 'Erro ao atualizar o livro', status: 'ERROR' });
      }
    };
    



module.exports = {
                    getAll,
                    getLivroByID,
                    getByTitulo,
                    postLivros,
                    deleteLivros,
                    deleteLivroAntigo,
                    putLivros,
                    patchLivros
}


