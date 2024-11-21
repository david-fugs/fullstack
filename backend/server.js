// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Para procesar JSON

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // Cambia esto si tienes un usuario diferente
    password: '',       // Cambia la contraseña si es necesario
    database: 'fullstack'  // El nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para crear un producto
app.post('/api/products', (req, res) => {
    const { name, description, price ,url } = req.body;
    console.log('Datos recibidos:', { name, description, price, url });

    // Consulta SQL para insertar un nuevo producto
    const query = 'INSERT INTO productos (name_product, description_product, price_product, url_image) VALUES (?,?,?,?)';
    db.query(query, [name, description, price , url], (err, result) => {
        if (err) {
            console.error('Error al crear el producto:', err);
            return res.status(500).json({ error: 'Error al crear el producto' });
        }
        console.log(query);
        console.log(url);
        res.status(201).json({ message: 'Producto creado exitosamente', productId: result.insertId });
    });
});
//Ruta para obtener todos los productos
app.get('/api/products', (req, res) => {
    const query = 'SELECT * FROM productos';  // Consulta SQL para obtener todos los productos

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los productos:', err);
            return res.status(500).json({ error: 'Error al obtener los productos' });
        }
        res.status(200).json(results);  // Responde con los resultados (productos) obtenidos
    });
});

// Ruta para eliminar un producto
app.delete('/api/products/:id', (req, res) => {
    const productId = req.params.id;

    // Consulta SQL para eliminar un producto por su ID
    const query = 'DELETE FROM productos WHERE id_product = ?';
    db.query(query, [productId], (err, result) => {
        if (err) {
            console.error('Error al eliminar el producto:', err);
            return res.status(500).json({ error: 'Error al eliminar el producto' });
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    });
});

// Ruta para actualizar un producto
app.put('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const { name_product, description_product, price_product, url_image } = req.body;

    // Consulta SQL para actualizar el producto
    const query = 'UPDATE productos SET name_product = ?, description_product = ?, price_product = ?, url_image = ? WHERE id_product = ?';
    db.query(query, [name_product, description_product, price_product, url_image, productId], (err, result) => {
        if (err) {
            console.error('Error al actualizar el producto:', err);
            return res.status(500).json({ error: 'Error al actualizar el producto' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto actualizado exitosamente' });
    });
});



// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
