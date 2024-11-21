import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Productos buenos</Navbar.Brand>
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
            </Nav.Link>            <Nav.Link href="#pricing">Precios</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
