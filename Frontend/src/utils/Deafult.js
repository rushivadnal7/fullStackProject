import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchCards = async () => {
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchCard = async (title) => {
    try {
        const response = await axios.get(`${API_URL}/cards/${title}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createCard = async (cardData) => {
    try {
        const response = await axios.post(`${API_URL}/create`, cardData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
