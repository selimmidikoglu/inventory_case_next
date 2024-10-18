import { NextResponse } from 'next/server'
import prismaClient from '../../../util/prismaClient';

export async function GET(request: Request) {
    try {
        const inventoryTransactionsTypes = await prismaClient.inventoryTransactions.findMany({
            distinct: ['transactionType'],
            select: {
                transactionType: true,
            },
        });
        const typeArray = inventoryTransactionsTypes.map(transaction => transaction.transactionType);
        return NextResponse.json(typeArray)
    } catch (error) {
        console.log(error)
        throw error;
    }
}