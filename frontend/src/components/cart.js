import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir al formulario
import { Button, Modal, ListGroup, Badge } from "react-bootstrap";
import { CartContext } from "./CartContext"; // Importar el CartContext

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate(); // Hook para navegar entre páginas

  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price_product * item.quantity, 0);

  const handleFinalizePurchase = () => {
    // Navegar al formulario, pasando los productos como estado
    navigate("/formulario", { state: { cartItems, totalPrice } });
  };

  return (
    <>
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
                      onClick={() => removeFromCart(item.id_product)}
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
          <Button variant="success" onClick={handleFinalizePurchase}>
            Finalizar Compra
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;
