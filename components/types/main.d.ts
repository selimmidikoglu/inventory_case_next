export interface Product {
  id: number;
  name: string;
  categoryId: number;
  supplierId: number;
  price: string;
  quantity_in_stock: number;
  restock_date: null | string;
  description: string;
  sku: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  website: string;
}

export interface Transaction {
  id: number;
  productId: number;
  transactionType: string;
  quantity: number;
  date: string;
  remarks: string;
}
export interface TransactionWithProduct {
  id: number;
  productId: number;
  transactionType: string;
  quantity: number;
  date: string;
  remarks: string;
  product: Product;
}