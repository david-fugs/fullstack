import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Table, Container, Button, Modal, Form, Card, Col, Row } from "react-bootstrap";
import { CartContext } from "./CartContext"; // Importa CartContext

const ProductList = () => {
  const [showProductModal, setShowProductModal] = useState(false);
  const [viewedProduct, setViewedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    url: "",
  });

  // Accede a la función addToCart desde el CartContext
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    fetchProducts();
  }, []);

  // Función para abrir el modal y cargar los datos del producto seleccionado
  const handleEditClick = (product) => {
    setSelectedProduct({
      id: product.id_product,
      name: product.name_product,
      description: product.description_product,
      price: product.price_product,
      url: product.url_image,
    });
    setShowEditModal(true);
  };

  // Función para guardar los cambios de edición en la base de datos
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${selectedProduct.id}`,
        {
          name_product: selectedProduct.name,
          description_product: selectedProduct.description,
          price_product: selectedProduct.price,
          url_image: selectedProduct.url,
        }
      );
      console.log("Respuesta del servidor:", response.data);
      alert("Producto editado correctamente");
      setShowEditModal(false);
      // Recargar productos para reflejar cambios
      const updatedProducts = await axios.get("http://localhost:5000/api/products");
      setProducts(updatedProducts.data);
    } catch (error) {
      console.error("Error al editar el producto:", error);
      alert("Hubo un error al editar el producto");
    }
  };

  // Función para eliminar un producto
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      alert("Producto eliminado correctamente");
      setProducts(
        products.filter((product) => product.id_product !== productId)
      );
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Hubo un error al eliminar el producto");
    }
  };

  // Función para ver el producto
  const handleCardClick = (product) => {
    setViewedProduct(product);
    setShowProductModal(true);
  };

  // Agregar al carrito
  const agregarCarrito = (product) => {
    addToCart(product); // Usamos addToCart del CartContext
    alert("Producto agregado al carrito correctamente");
  };

  return (
    <Container className="mt-4">
      <h2>Listado de Productos</h2>
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col
              key={product.id_product}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-4"
            >
              <Card 
                onClick={() => handleCardClick(product)} 
                style={{ cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  src={product.url_image || "https://via.placeholder.com/150"}
                  alt={`Imagen de ${product.name_product}`}
                  style={{ height: "250px" }}
                />
                <Card.Body>
                  <Card.Title>{product.name_product}</Card.Title>
                  <Card.Text>
                    <strong>Precio:</strong> ${product.price_product}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="success"
                      onClick={(e) => {
                        e.stopPropagation(); // Evita que se abra el modal de ver al hacer clic aquí
                        agregarCarrito(product); // Función para agregar al carrito
                      }}
                    >
                      Agregar Carrito
                    </Button>
                    <Button
                      variant="success"
                      onClick={(e) => {
                        e.stopPropagation(); // Evita que se abra el modal de ver al hacer clic aquí
                        handleEditClick(product); // Función para editar producto
                      }}
                      style={{ marginRight: "6px", marginLeft: "6px" }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={(e) => {
                        e.stopPropagation(); // Evita que se abra el modal de ver al hacer clic aquí
                        deleteProduct(product.id_product); // Función para eliminar producto
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No hay productos disponibles.</p>
          </Col>
        )}
      </Row>

      {/* Modal de Detalles del Producto */}
      <Modal show={showProductModal} onHide={() => setShowProductModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Producto</Modal.Title>
        </Modal.Header>
        {viewedProduct && (
          <Modal.Body>
            <Card>
              <Card.Img
                variant="top"
                src={viewedProduct.url_image || "https://via.placeholder.com/150"}
                alt={`Imagen de ${viewedProduct.name_product}`}
                style={{ width: "200px", height: "250px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{viewedProduct.name_product}</Card.Title>
                <Card.Text>
                  <strong>Descripción:</strong> {viewedProduct.description_product || "Sin descripción"}
                </Card.Text>
                <Card.Text>
                  <strong>Precio:</strong> ${viewedProduct.price_product}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="success" onClick={() => agregarCarrito(viewedProduct)}>
                    Agregar Carrito
                  </Button>
                  <Button variant="danger" onClick={() => deleteProduct(viewedProduct.id_product)}>
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Modal.Body>
        )}
      </Modal>

      {/* Modal de Edición del Producto */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="productName">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                value={selectedProduct.name}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="productDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                value={selectedProduct.description}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={selectedProduct.price}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="productUrl">
              <Form.Label>URL de Imagen</Form.Label>
              <Form.Control
                type="text"
                value={selectedProduct.url}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, url: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Guardar Cambios
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductList;
