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
export async function PUT(request: Request) {
    const body = await request.json();
    console.log(body)
    try {
        const product = await prismaClient.products.findFirst({
            where: {
                id: body.productId
            }
        })
        if (!product) {
            throw new Error('Product not found')
        }
        const newQuantity = product.quantity_in_stock + body.quantity
        console.log(product.quantity_in_stock, newQuantity)
        const updatedProduct = await prismaClient.products.update({
            data: {
                quantity_in_stock: newQuantity
            },
            where: {
                id: body.productId
            }
        })
        const transaction = await prismaClient.inventoryTransactions.create({
            data: body
        });
        return NextResponse.json(transaction)
    } catch (error) {
        console.log(error)
        throw error;
    }
}