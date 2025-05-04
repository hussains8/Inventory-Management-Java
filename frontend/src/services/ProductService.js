import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        console.log(`${API_URL}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const deleteProduct = async (productId) => {
    try {
        await axios.delete(`${API_URL}/${productId}`);
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        return false;
    }
};

export const updateProduct = async (product) => {
    try {
        const response = await axios.put(`${API_URL}/${product.id}`, product);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        return null;
    }
};

export const addProduct = async (product) => {
    try {
        const response = await axios.post(`${API_URL}/add`, product);
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error);
        return null;
    }
};

