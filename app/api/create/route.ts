import { NextRequest, NextResponse } from 'next/server';
import prismaClient from '../../util/prismaClient';
import { dummy } from '../../../components/dummy';


export async function GET(request: NextRequest) {
    try {


        await prismaClient.products.deleteMany();
        await prismaClient.categories.deleteMany();
        await prismaClient.inventoryTransactions.deleteMany();
        await prismaClient.suppliers.deleteMany();

        const categories = await prismaClient.categories.createMany({
            data: dummy().Categories
        })
        const suppliers = await prismaClient.suppliers.createMany({
            data: dummy().Suppliers
        })
        const products = await prismaClient.products.createMany({
            data: dummy().Products
        })
        const inventoryTransactions = await prismaClient.inventoryTransactions.createMany({
            data: dummy().InventoryTransactions
        })
        return NextResponse.json("Database initiated with dummy data.");
    }
    catch (error) {
        console.log(error)
        return NextResponse.json("There is a problem with database client starting");
    }

}