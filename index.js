const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const app = express();

// Middleware 1: Registrar os logs de acesso em um arquivo txt no formato (data atual método rota(uri))
app.use((req, res, next) => {
    const log = `${new Date().toISOString()} ${req.method} ${req.originalUrl}\n`;
    fs.appendFile('access_logs.txt', log, (err) => {
        if (err) throw err;
    });
    next();
});

// Middleware 2: Registrar os logs de acesso no console usando a biblioteca morgan
app.use(morgan('dev'));

// Middleware 3: Registrar os logs de acesso em um arquivo usando a biblioteca morgan
const logStream = fs.createWriteStream(path.join(__dirname, 'morgan_logs.txt'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));

app.get("/", (req, res) => {
    res.send("Rota principal");
});

app.get("/nova", (req, res) => {
    res.send("Nova rota");
});

app.get("/contato", (req, res) => {
    res.send("Contato");
});

app.listen(3000, () => {
    console.log("Rodando....");
});
