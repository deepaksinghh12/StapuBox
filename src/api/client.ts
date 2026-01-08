import axios from 'axios';
import { API_BASE_URL, API_TOKEN } from '../constants/api';

const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Api-Token': API_TOKEN,
    },
});

// Optional: Add interceptors for logging or error handling
client.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const sendOtp = async (mobile: string) => {
    try {
        const response = await client.post('/sendOtp', { mobile });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const resendOtp = async (mobile: string) => {
    try {
        const response = await client.post(`/resendOtp?mobile=${mobile}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const verifyOtp = async (mobile: string, otp: string) => {
    try {
        const response = await client.post(`/verifyOtp?mobile=${mobile}&otp=${otp}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default client;
