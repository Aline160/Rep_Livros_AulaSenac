const mongoose = require("mongoose")
// DB_URL é nossa string de conexão
const DB_URL = "mongodb+srv://senac:123@cluster0.ctbgh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" 

function connect(){
  mongoose.connect(
    //process.env.
    DB_URL, {
       useNewUrlParser: true 
      })
  const connection = mongoose.connection
  connection.on('error', () => console.error('Erro ao conectar no mongo'))
  
  connection.once('open', () => console.log('🌝 Conectamos no mongo!'))
}

module.exports = connect
