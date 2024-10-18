import { NextResponse } from 'next/server'
import prismaClient from '../../../util/prismaClient';


export async function GET(request: Request) {
    try {
        const transactionsWithProductName = await prismaClient.inventoryTransactions.findMany({
            include: {
                product: true
            },
            orderBy: {
                date: 'desc'
            }

        });
        return NextResponse.json(transactionsWithProductName)
    } catch (error) {
        console.log(error)
        throw error;
    }
}