import axios from 'axios';
import { parseCookies } from "nookies";

const { 'opdauth.token': token } = parseCookies();

const url = process.env.NODE_ENV == "production"
    ? process.env.url
    : "http://localhost:3333";

export const api = axios.create({
    baseURL: url,
});

if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}