const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.send('¡Hola desde el backend con Express!');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
