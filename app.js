const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

const {PORT, RUN_MODE} = process.env;

app.use(express.static(path.join(__dirname, 'client', 'public')));

if (RUN_MODE !== 'dev') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});