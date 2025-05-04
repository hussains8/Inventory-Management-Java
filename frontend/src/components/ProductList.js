import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct, updateProduct, addProduct } from '../services/ProductService';
import { Grid, Card, CardContent, Typography, Button, Modal, TextField, Box, AppBar, Toolbar } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const data = await fetchProducts();
        setProducts(data);
    };

    const handleDelete = async (productId) => {
        const success = await deleteProduct(productId);
        if (success) {
            setProducts(products.filter(p => p.id !== productId));
        }
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleAddProduct = () => {
        setSelectedProduct({ name: "", quantity: 0, price: 0 }); // Reset fields for new product
        setShowModal(true);
    };

    const handleSaveChanges = async () => {
        if (selectedProduct?.id) {
            const updatedProduct = await updateProduct(selectedProduct);
            if (updatedProduct) {
                setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
            }
        } else {
            const newProduct = await addProduct(selectedProduct);
            if (newProduct) {
                setProducts([...products, newProduct]);
            }
        }
        setShowModal(false);
    };

    return (
        <Box sx={{ padding: 3 }}>
            {/* Navigation Bar */}
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6">Inventory Management System</Typography>
                </Toolbar>
            </AppBar>

            <Typography variant="h4" gutterBottom sx={{ marginTop: 3, textAlign: 'center' }}>
                Product Inventory
            </Typography>

            {/* Add Product Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handleAddProduct} // Uses function that resets fields
                >
                    Add Product
                </Button>
            </Box>

            {/* Product Grid Layout */}
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Card elevation={4} sx={{ padding: 2, borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
                                <Typography variant="body2" sx={{ color: 'gray' }}>Stock: {product.quantity}</Typography>
                                <Typography variant="h6" sx={{ color: 'green', fontWeight: 'bold' }}>
                                    ${product.price}
                                </Typography>
                                <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
                                    <Button variant="outlined" color="warning" onClick={() => handleEdit(product)}>Edit</Button>
                                    <Button variant="outlined" color="error" onClick={() => handleDelete(product.id)}>Delete</Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Modal for Add/Edit Product */}
            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <Box sx={{ padding: 3, backgroundColor: 'white', margin: 'auto', width: '400px', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>
                        {selectedProduct?.id ? "Edit Product" : "Add Product"}
                    </Typography>
                    <TextField label="Product Name" fullWidth margin="normal" value={selectedProduct?.name || ''}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })} />
                    <TextField label="Quantity" fullWidth margin="normal" type="number" value={selectedProduct?.quantity || 0}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, quantity: e.target.value })} />
                    <TextField label="Price ($)" fullWidth margin="normal" type="number" value={selectedProduct?.price || 0}
                        onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })} />
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleSaveChanges}>Save Changes</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default ProductList;
