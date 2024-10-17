import { NextResponse } from 'next/server'
import prismaClient from '../../../../util/prismaClient';


export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const products = await prismaClient.products.findMany({
            where: {
                categoryId: Number(id)
            }
        });
        return NextResponse.json(products)
    } catch (error) {
        throw error;
    }
}