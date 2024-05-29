const express = require('express');
const bodyParser = require('body-parser');
const { identifyContact } = require('./controllers');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/identify', identifyContact);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
