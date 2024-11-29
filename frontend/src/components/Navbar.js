import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cart from "./cart"; // Asegúrate de que la ruta sea correcta

function NavigationBar() {
  const [cartItems, setCartItems] = useState([]);

  // Lógica para eliminar un producto del carrito
  const removeItemFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id_product !== productId));
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Productos buenos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/create-product">
              Crear Producto
            </Nav.Link>
            <Nav.Link as={Link} to="/list-product">
              Listado Producto
            </Nav.Link>
            <Nav.Link href="#pricing">Precios</Nav.Link>
          </Nav>
          {/* Carrito */}
          <Cart cartItems={cartItems} onRemoveItem={removeItemFromCart} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
