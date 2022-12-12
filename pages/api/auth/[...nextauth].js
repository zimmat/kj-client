//Declare Dependencies
import axios from 'axios'
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

//Declare Variables
const { NEXTAUTH_SECRET, NEXT_PUBLIC_API_HOST } = process.env

const refreshAccessToken = async (token) => {
    try {
        const { data: { refreshedToken } } = await axios.post(`${NEXT_PUBLIC_API_HOST}/auth/refresh`, { refresh_token: token.refreshToken, success_url: token.callbackUrl })
        return {
            ...token,
            accessToken: refreshedToken.token,
            accessTokenExpires: refreshedToken.expires_at,
            refreshToken: refreshedToken.refresh_token
        }
    } catch (ex) {
        console.error(`refreshAccessToken :: token: ${token}::`, ex.message)
        throw ex;
    }
}

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: "admin",
            name: "Admin",
            async authorize(credentials) {
                try {
                    const { email, password } = credentials
                    const url = `${NEXT_PUBLIC_API_HOST}/login`
                    const { data }  = await axios.post(url, { email, password })
                    return data
                } catch (ex) {
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (!!user) {
                token.user = {
                    role_id: user.role_id,
                    user_id: user.id,
                    email: user.email
                }
                if (!!user.redirect_url) {
                    token.login = {
                        subscribeUrl: user.redirect_url
                    }
                }
                token.accessToken = user.token
                token.accessTokenExpires = user.expires_at
                token.refreshToken = user.refresh_token
                return token
            }
    
            if (!!token && Date.now() > token.accessTokenExpires) {
                try {
                    return await refreshAccessToken(token)
                } catch (ex) {
                    return null
                }
            }
            return token
        },
        async session({ session, token }) {
            if (!!token) {
                session.user = token.user
                session.accessToken = token.accessToken
                if (!!token.login) session.login = token.login
                return session
            } else {
                return null
            }
        }
    },
    jwt: {
        secret: NEXTAUTH_SECRET,
        encryption: true,
        maxAge: 5 * 60 * 1000,
    },
    secret: NEXTAUTH_SECRET
});