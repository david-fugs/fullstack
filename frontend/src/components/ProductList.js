import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Button, Modal, Form , Card, Col, Row } from "react-bootstrap";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false); // Estado para mostrar el modal de edición
  const [selectedProduct, setSelectedProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
  });

  // Obtener productos de la base de datos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data); // Guardamos los productos en el estado
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

  // Maneja los cambios en los campos del formulario del modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Función para guardar los cambios de edición en la base de datos
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Intentando editar el producto con ID:", selectedProduct.id);
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
      const updatedProducts = await axios.get(
        "http://localhost:5000/api/products"
      );
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
  const agregarCarrito = async (productId) => {
    try {
      await axios.post(`http://localhost:5000/api/cart`, {
        id_product: productId,
        quantity: 1,
      });
      alert("Producto agregado al carrito correctamente");
    }
    catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      alert("Hubo un error al agregar el producto al carrito");
    }
  }

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
              <Card>
                <Card.Img
                  variant="top"
                  src={product.url_image || "https://via.placeholder.com/150"}
                  alt={`Imagen de ${product.name_product}`}
                  style={{ height: "250px" }}
                />
                <Card.Body>
                  <Card.Title>{product.name_product}</Card.Title>
                  <Card.Text>
                    {product.description_product.length > 100
                      ? `${product.description_product.substring(0, 100)}...`
                      : product.description_product}
                  </Card.Text>
                  <Card.Text>
                    <strong>Precio:</strong> ${product.price_product}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                  <Button
                      variant="success"
                      onClick={() => agregarCarrito(product.id_product)}
                    >
                      Agregar Carrito
                    </Button>
                    <Button
                      variant="success"
                      style={{ marginRight: "6px",marginLeft: "6px" }}
                      onClick={() => handleEditClick(product)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteProduct(product.id_product)}
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

      {/* Modal para editar el producto */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formProductName">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del producto"
                name="name"
                value={selectedProduct.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription" className="mt-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Descripción del producto"
                name="description"
                value={selectedProduct.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice" className="mt-3">

              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Precio del producto"
                name="price"
                value={selectedProduct.price}
                onChange={handleChange}
              />
              
            </Form.Group>
            <Form.Group controlId="formProductUrl" className="mt-3">
              <Form.Label>Url Imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="url imagen"
                name="url"
                value={selectedProduct.url}
                onChange={handleChange}
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
