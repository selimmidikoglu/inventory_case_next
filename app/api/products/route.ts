import { NextResponse } from 'next/server'
import prismaClient from '../../util/prismaClient'

export async function GET(request: Request) {
    try {
        const products = await prismaClient.products.findMany();
        return NextResponse.json(products)
    } catch (error) {
        console.log(error)
        throw error;
    }
}
export async function PUT(request: Request) {
    const body = await request.json();
    console.log(body)
    try {
        const product = await prismaClient.products.create({
            data: body
        });
        return NextResponse.json(product)
    } catch (error) {
        console.log(error)
        throw error;
    }
}