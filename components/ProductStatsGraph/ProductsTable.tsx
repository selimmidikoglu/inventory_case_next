import { useState } from 'react';
import Link from 'next/link';
import { IconArrowUpRight, IconDeviceAnalytics } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import cx from 'clsx';
import {
  Anchor,
  Button,
  Group,
  MultiSelect,
  Paper,
  Progress,
  rem,
  ScrollArea,
  Select,
  Skeleton,
  Table,
  Text,
} from '@mantine/core';
import {
  getCategoryNamesWithId,
  getProductsWithSpecificCategory,
  getTransactionWithProducts,
} from '../../app/util';
import { Product, TransactionWithProduct } from '../types/main';
import classes from './ProductStatsGraph.module.css';

export function ProductsTable() {
  const [scrolled, setScrolled] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const { data: categoryNames, isLoading: categoryNamesLoading } = useQuery({
    queryFn: () => getCategoryNamesWithId(),
    queryKey: ['CATEGORY_NAMES_WITH_ID'],
  });
  const { data: products, isLoading: productsLoading } = useQuery({
    queryFn: () => getProductsWithSpecificCategory(String(categoryId)),
    queryKey: ['PRODUCTS_WITH_SPECIFIC_CATEGORY', categoryId],
  });
  if (!categoryNames || !products) {
    return <Skeleton height={300} radius="md" animate={true} />;
  }
  const categoryOnlyName = categoryNames.map(
    (category: { name: string; id: number }) => category.name
  );
  const chooseCategory = (category: string | null) => {
    setCategoryName(category!);
    console.log(category);
    if (!category) {
      setCategoryId('');
      return;
    }
    categoryNames.find((el: { name: string; id: number }) => {
      if (el.name === category) {
        setCategoryId(String(el.id));
        // setCategoryId('String(el.id)');
      }
    });
  };
  const rows = products.map((row: Product) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>
        {categoryNames.find((el: { name: string; id: number }) => el.id === row.categoryId)?.name ||
          'Unknown Category'}
      </Table.Td>{' '}
      <Table.Td>{`$${row.price}`}</Table.Td>
      <Table.Td>{row.quantity_in_stock}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder p="md" radius="md" h="100%">
      <Group align="center" justify="space-between">
        <Group align="flex-start" justify="flex-start">
          <Text fz="xl" fw={700}>
            Product List
          </Text>
          <Select
            clearable
            value={categoryName}
            onChange={chooseCategory}
            //   label="Filter by Category"
            placeholder="Pick Category"
            data={categoryOnlyName}
            comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
          />
        </Group>
        <Link
          href={{
            pathname: '/product',
          }}
        >
          <Button variant="light" color="green" radius="md">
            Add Product
          </Button>
        </Link>
      </Group>

      <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table miw={700}>
          <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Stock</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}
