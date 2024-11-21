import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Asegúrate de importar Routes y Route
import './App.css';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import CreateProduct from './components/CreateProduct';
import ProductList from './components/ProductList';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
    return (
        <Router> {/* Usar BrowserRouter */}
            <div className="App">
                <NavigationBar />
                <div className="content">
                <Routes> {/* Usar Routes en lugar de Switch */}
                    <Route path="/" element={ <header className="App-header">
                        <h1>Bienvenido a Productos Buenos S.A</h1>
                    </header>} />
                    <Route path="/create-product" element={<CreateProduct />} />
                    <Route path="/list-product" element={<ProductList />} />
                </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
