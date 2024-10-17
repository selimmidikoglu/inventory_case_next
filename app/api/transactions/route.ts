import { NextResponse } from 'next/server'
import prismaClient from '../../util/prismaClient'

export async function GET(request: Request) {
    try {
        const inventoryTransactions = await prismaClient.inventoryTransactions.findMany();
        return NextResponse.json(inventoryTransactions)
    } catch (error) {
        console.log(error)
        throw error;
    }
}