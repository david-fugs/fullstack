import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white text-center ">
      <Container>
        <Row>
          <Col>
            <p>&copy; 2024 Productos buenos. Todos los derechos reservados.</p>
            <div>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white me-3"
              >
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
