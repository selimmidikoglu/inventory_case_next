export const getData = async ({ type }: { type: "products" | "categories" }) => {
  const res = await fetch('http://localhost:3000/api/' + type);
  const data = await res.json();
  return data;
};

export const setInitialData = async () => {
  const res = await fetch('http://localhost:3000/api/create');
  const data = await res.json();
  return data;
}

export const getProducts = async () => {
  const res = await fetch('http://localhost:3000/api/products');
  const data = await res.json();
  return data;
};
export const addProduct = async (body: any) => {
  const res = await fetch('http://localhost:3000/api/products', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error('Failed to add product'); // Handle errors
  }
  const data = await res.json();
  return data;
};
export const getProductsWithSpecificCategory = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/products/category/${id}`);
  const data = await res.json();
  return data;
};
export const getSuppliers = async () => {
  const res = await fetch('http://localhost:3000/api/suppliers');
  const data = await res.json();
  return data;
};
export const getCategories = async () => {
  const res = await fetch('http://localhost:3000/api/categories');
  const data = await res.json();
  return data;
};
export const getCategoryNamesWithId = async () => {
  const res = await fetch('http://localhost:3000/api/categories/names');
  const data = await res.json();
  return data;
};
export const getTransactions = async () => {
  const res = await fetch('http://localhost:3000/api/transactions');
  const data = await res.json();
  return data;
};
export const getPercentageCategory = async () => {
  const res = await fetch('http://localhost:3000/api/categories/percentage');
  const data = await res.json();
  return data;
};
export const getTransactionWithProducts = async () => {
  const res = await fetch('http://localhost:3000/api/transactions/products');
  const data = await res.json();
  return data;
};
