import { NextResponse } from 'next/server'
import prismaClient from '../../util/prismaClient'

export async function GET(request: Request) {
    try {
        const suppliers = await prismaClient.suppliers.findMany();
        return NextResponse.json(suppliers)
    } catch (error) {
        console.log(error)
        throw error;
    }
}