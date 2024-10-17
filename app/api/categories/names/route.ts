import { NextResponse } from 'next/server'
import prismaClient from '../../../util/prismaClient';


export async function GET(request: Request) {
    try {
        const categories = await prismaClient.categories.findMany({
            select: {
                name: true,
                id: true
            }
        });
        return NextResponse.json(categories)
    } catch (error) {
        throw error;
    }
}