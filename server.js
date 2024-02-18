//const express = require('express');
//const app = express();
// process.env.PORT



const app = require('./SRC/app')

const port = 3000


app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
});