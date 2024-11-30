import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Para recibir los productos del carrito
import { Form, Button } from "react-bootstrap";

const PurchaseForm = () => {
  const { state } = useLocation();
  const { cartItems, totalPrice } = state || {}; // Productos y total enviados desde el carrito
  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const purchaseData = {
        customer: {
            name: formData.name,
            idNumber: formData.idNumber,
            address: formData.address,
        },
        cartItems: cartItems.map(item => ({
            name: item.name_product,
            quantity: item.quantity,
        })), // Incluimos el nombre y cantidad de cada artículo
        totalPrice,
    };

    try {
        const response = await fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(purchaseData),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        console.log("Orden registrada:", data);

        alert("¡Compra realizada con éxito!");
        window.location.href = "/list-product";
    } catch (error) {
        console.error("Error al conectar con el backend:", error);
        alert("Hubo un problema al realizar la compra. Inténtalo de nuevo.");
    }
};
 return (
    <div className="container mt-5">
      <h2>Finalizar Compra</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Cédula</Form.Label>
          <Form.Control
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Confirmar Compra
        </Button>
      </Form>
    </div>
  );
};

export default PurchaseForm;
