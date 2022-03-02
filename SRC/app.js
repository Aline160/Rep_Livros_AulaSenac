const ejs = require('ejs');

const express=require('express');
const app = express();

const livros = require('./routes/LivroRoutes')
const index = require('./routes/index')
const connect=require('./database');
const livrosMongo = require('./model/LivroModel');

connect(); 

//app.use(bodyParser.json()); Podemos usar a propria função de parser de json do express, sem a necessidade de instalar o body parser 
app.use(express.json());

app.set('view engine', 'ejs');




app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
      )
      next()
    })


app.use("/", index)
app.use('/livros',livros);

app.get('/Home',(req,res)=>{
  res.status(200).sendFile('./paginas/index.html',{root:__dirname})
})

app.get('/contato',(req,res)=>{
  res.status(200).sendFile('./paginas/contato.html',{root:__dirname})
})

app.get('*',(req,res)=>{
    res.status(404).sendFile('../erro.html',{root:__dirname})
})


module.exports = app