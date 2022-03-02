//const express = require('express');
//const app = express();

const app = require('./SRC/app')
const port = process.env.PORT;



app.listen(port, () => {
    console.log(`Listening on port s!`)
});