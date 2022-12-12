//Declare Dependencies
import axios from 'axios';
import { getToken } from "next-auth/jwt";
const { API_HOST, NEXTAUTH_SECRET } = process.env;

export default async (req, res) => {
    try {
        const token = await getToken({ req, secret: NEXTAUTH_SECRET });
        if (req.method !== 'POST' || !token) throw { message: 'Not Allowed' }

        const { role_id, email, password } = req.body;
        const config = { headers: { Authorization: `Bearer ${token.accessToken}` } };
        await axios.post(`${API_HOST}/add-user`, { role_id, email, password }, config)

        res.send({ success: true });
    } catch (ex) {
        console.error(`users insert`, { error: ex.message })
        res.status(500).send(ex);
    }
}