import { NextRequest, NextResponse } from 'next/server';

type Cat = {
    id: number
    name: string
    description: string
}
const categories: Cat[] = [
    {
        "id": 1,
        "name": "Electronics",
        "description": "Devices and gadgets"
    },
    {
        "id": 2,
        "name": "Books",
        "description": "Printed and digital books"
    },
    {
        "id": 3,
        "name": "Clothing",
        "description": "Apparel and accessories"
    }
]
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params; // Access the dynamic userId from the params object
    const category = categories.find((category: Cat) => category?.id == Number(id));
    if (!category) {
        return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    // Use userId to fetch data, perform actions, etc.
    return NextResponse.json(category);
}