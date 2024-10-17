import { NextResponse } from 'next/server'
import prismaClient from '../../../util/prismaClient';

export async function GET(request: Request) {
    try {
        const products = await prismaClient.products.findMany();
        return NextResponse.json(products)
    } catch (error) {
        console.log(error)
        throw error;
    }
}