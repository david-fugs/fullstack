import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function CreateProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    url: ""
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();

  const handleVolver = () => {
    navigate(-1); // Esto vuelve a la página anterior en el historial
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Realizar una solicitud POST al backend
        const response = await axios.post('http://localhost:5000/api/products', product);
        alert('Producto creado exitosamente');

        setProduct({
            name: '',
            description: '',
            price: '',
            url: ''
        }); 
          // Redirigir a la página principal (ruta '/')
         navigate('/list-product'); 

    } catch (error) {
        console.error('Error al crear el producto:', error);
        alert('Hubo un error al crear el producto');
    }
};

  return (
    <Container>
      <h2 className="form-product-title">Crear Producto</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-product-group" controlId="formProductName">
          <Form.Label>Nombre del Producto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa el nombre del producto"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group
          className="form-product-group"
          controlId="formProductDescription"
        >
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ingresa una descripción del producto"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="form-product-group" controlId="formProductPrice">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingresa el precio"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="form-product-group" controlId="formProductUrl">
          <Form.Label>URL de la imagen</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa URL"
            name="url"
            value={product.url}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="form-submit-button" variant="primary" type="submit">
          Crear Producto
        </Button>
        <Button
          className="form-submit-button"
          variant="secondary"
          onClick={handleVolver}
        >
          Volver
        </Button>
      </Form>
    </Container>
  );
}

export default CreateProduct;
