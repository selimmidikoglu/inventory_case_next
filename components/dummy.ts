export const dummy = () => {
    return {
        "Categories": [
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
        ],
        "Suppliers": [
            {
                "id": 1,
                "name": "Global Tech Supplies",
                "contactPerson": "John Doe",
                "phone": "555-1234",
                "email": "johndoe@globaltech.com",
                "address": "123 Tech Avenue, Silicon City",
                "website": "https://www.globaltechsupplies.com"
            },
            {
                "id": 2,
                "name": "Book Haven Distributors",
                "contactPerson": "Jane Smith",
                "phone": "555-5678",
                "email": "janesmith@bookhaven.com",
                "address": "456 Literature Lane, Booktown",
                "website": "https://www.bookhavendistributors.com"
            },
            {
                "id": 3,
                "name": "Fashion Hub",
                "contactPerson": "Mike Johnson",
                "phone": "555-8765",
                "email": "mikejohnson@fashionhub.com",
                "address": "789 Style Street, Fashion City",
                "website": "https://www.fashionhub.com"
            }
        ],
        "Products": [
            {
                "id": 1,
                "name": "Smartphone X200",
                "categoryId": 1,
                "supplierId": 1,
                "price": "699.99",
                "quantity_in_stock": 150,
                "restock_date": "2024-12-01T00:00:00Z",
                "description": "A high-end smartphone with cutting-edge features.",
                "sku": "ELEC-SMX200"
            },
            {
                "id": 2,
                "name": "Wireless Headphones",
                "categoryId": 1,
                "supplierId": 1,
                "price": "199.99",
                "quantity_in_stock": 200,
                "restock_date": "2024-11-15T00:00:00Z",
                "description": "Noise-cancelling over-ear headphones.",
                "sku": "ELEC-WH001"
            },
            {
                "id": 3,
                "name": "Modern JavaScript Book",
                "categoryId": 2,
                "supplierId": 2,
                "price": "39.99",
                "quantity_in_stock": 300,
                "restock_date": null,
                "description": "An in-depth guide to modern JavaScript.",
                "sku": "BOOK-JS2024"
            },
            {
                "id": 4,
                "name": "Classic Literature Set",
                "categoryId": 2,
                "supplierId": 2,
                "price": "99.99",
                "quantity_in_stock": 50,
                "restock_date": "2024-11-20T00:00:00Z",
                "description": "A collection of classic literary works.",
                "sku": "BOOK-CLSSET"
            },
            {
                "id": 5,
                "name": "Men's Leather Jacket",
                "categoryId": 3,
                "supplierId": 3,
                "price": "249.99",
                "quantity_in_stock": 75,
                "restock_date": "2024-12-05T00:00:00Z",
                "description": "Premium quality leather jacket for men.",
                "sku": "CLOT-MLJKT"
            },
            {
                "id": 6,
                "name": "Women's Designer Handbag",
                "categoryId": 3,
                "supplierId": 3,
                "price": "349.99",
                "quantity_in_stock": 40,
                "restock_date": "2024-11-25T00:00:00Z",
                "description": "Elegant handbag crafted with fine materials.",
                "sku": "CLOT-WDHBG"
            }
        ],
        "InventoryTransactions": [
            {
                "id": 1,
                "productId": 1,
                "transactionType": "restock",
                "quantity": 150,
                "date": "2024-10-01T09:00:00Z",
                "remarks": "Initial stock received from supplier."
            },
            {
                "id": 2,
                "productId": 2,
                "transactionType": "restock",
                "quantity": 200,
                "date": "2024-10-02T10:30:00Z",
                "remarks": "Initial stock received from supplier."
            },
            {
                "id": 3,
                "productId": 3,
                "transactionType": "restock",
                "quantity": 300,
                "date": "2024-10-03T11:15:00Z",
                "remarks": "Initial stock received from supplier."
            },
            {
                "id": 4,
                "productId": 4,
                "transactionType": "restock",
                "quantity": 50,
                "date": "2024-10-04T12:45:00Z",
                "remarks": "Initial stock received from supplier."
            },
            {
                "id": 5,
                "productId": 5,
                "transactionType": "restock",
                "quantity": 75,
                "date": "2024-10-05T13:30:00Z",
                "remarks": "Initial stock received from supplier."
            },
            {
                "id": 6,
                "productId": 6,
                "transactionType": "restock",
                "quantity": 40,
                "date": "2024-10-06T14:00:00Z",
                "remarks": "Initial stock received from supplier."
            },
            {
                "id": 7,
                "productId": 1,
                "transactionType": "sale",
                "quantity": -20,
                "date": "2024-10-10T15:20:00Z",
                "remarks": "Sold 20 units online."
            },
            {
                "id": 8,
                "productId": 3,
                "transactionType": "sale",
                "quantity": -50,
                "date": "2024-10-11T16:00:00Z",
                "remarks": "Sold 50 units in-store."
            },
            {
                "id": 9,
                "productId": 5,
                "transactionType": "sale",
                "quantity": -10,
                "date": "2024-10-12T17:15:00Z",
                "remarks": "Sold 10 units wholesale."
            },
            {
                "id": 10,
                "productId": 2,
                "transactionType": "adjustment",
                "quantity": -5,
                "date": "2024-10-13T18:45:00Z",
                "remarks": "Damaged items removed from stock."
            }
        ]
    }

};