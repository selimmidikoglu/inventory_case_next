import { NextResponse } from 'next/server'
import prismaClient from '../../../util/prismaClient';



export async function GET(request: Request) {
    try {
        // First, fetch the total count of products across all categories
        const totalProducts = await prismaClient.products.count();

        // Then, fetch the total count of products per category
        const productCounts = await prismaClient.products.groupBy({
            by: ['categoryId'],
            _count: {
                id: true, // Count the number of products in each category
            },
        });

        // Step 3: Fetch the category names based on the category IDs
        const categoryIds = productCounts.map((item) => item.categoryId);

        const categories = await prismaClient.categories.findMany({
            where: {
                id: { in: categoryIds },
            },
            select: {
                id: true,
                name: true,
            },
        });

        // Step 4: Map the product counts and categories together to calculate percentages
        const result = productCounts.map((productCount) => {
            const category = categories.find((cat) => cat.id === productCount.categoryId);
            const totalAmount = productCount._count.id;
            const percentage = (totalAmount / totalProducts) * 100;

            return {
                label: category?.name || 'Unknown', // Category name
                count: totalAmount, // Total number of products in this category
                part: Math.round(percentage * 100) / 100, // Rounded percentage
            };
        });

        console.log(result);

        return NextResponse.json(result);
    } catch (error) {
        throw error;
    }

}