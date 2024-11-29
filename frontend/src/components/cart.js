import React, { useContext, useState } from "react";
import { Button, Modal, ListGroup, Badge } from "react-bootstrap";
import { CartContext } from "./CartContext"; // Importar el CartContext

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext); // Usar removeFromCart desde el CartContext
  const [showCart, setShowCart] = useState(false);

  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price_product * item.quantity, 0);

  return (
    <>
      {/* Botón del carrito con contador */}
      <Button
        variant="outline-primary"
        className="position-relative"
        onClick={handleShow}
      >
        🛒 Carrito
        {cartItems.length > 0 && (
          <Badge
            bg="danger"
            pill
            className="position-absolute top-0 start-100 translate-middle"
          >
            {cartItems.length}
          </Badge>
        )}
      </Button>

      {/* Modal para mostrar el carrito */}
      <Modal show={showCart} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tu Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.length === 0 ? (
            <p>No tienes productos en el carrito.</p>
          ) : (
            <ListGroup>
              {cartItems.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{item.name_product}</strong>
                    <br />
                    Cantidad: {item.quantity}
                  </div>
                  <div>
                    ${item.price_product.toFixed(2)}
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-3"
                      onClick={() => removeFromCart(item.id_product)} // Usamos removeFromCart directamente
                    >
                      🗑️
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <h5 className="me-auto">Total: ${totalPrice.toFixed(2)}</h5>
          <Button variant="success" onClick={handleClose}>
            Finalizar Compra
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;
