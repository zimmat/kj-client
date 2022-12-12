//Declare Dependencies
import axios from 'axios';
import { getToken } from "next-auth/jwt";
const { API_HOST, NEXTAUTH_SECRET } = process.env;

export default async (req, res) => {
    try {
        const token = await getToken({ req, secret: NEXTAUTH_SECRET })
        if (req.method !== 'GET' || !token) throw { message: 'Not Allowed' }
        const url = `${API_HOST}/users`
        const { data } = await axios({method:'get', url,  headers: { Authorization: `Bearer ${token.accessToken}` }})
        res.send(data);
    } catch (ex) {
        console.error(`users`, { error: ex.message })
        res.status(500).send(ex);
    }
}