// Declare Dependencies
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

//Declare Variables
const { NEXTAUTH_SECRET } = process.env

export const middleware = async (req) => {
    try {
        // Skip Non Page Requests
        if (
            req.url.includes(`/js`) ||
            req.url.includes(`.svg`) ||
            req.url.includes(`/api`) ||
            req.url.includes(`/login`) ||
            req.url.includes(`/icons`) ||
            req.url.includes(`/assets`) ||
            req.url.includes(`/manifest`) ||
            req.url.includes(`/.well-known`)
        ) return NextResponse.next()

        const token = await getToken({ req, secret: NEXTAUTH_SECRET });
        if (!token) return NextResponse.redirect(new URL(`/login`, req.url))

        const { user: { role_id } } = token
        if (role_id == 1) return NextResponse.next() // User is Admin

        return NextResponse.redirect(new URL('/login', req.url))
    } catch (ex) {
        return NextResponse.rewrite(new URL('/500', req.url))
    }
}