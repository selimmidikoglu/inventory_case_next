'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Collapse,
  Container,
  Grid,
  Group,
  rem,
  SimpleGrid,
  Skeleton,
  Text,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { getCategories, getProducts, getSuppliers, getTransactions } from '../../app/util';
import { dummy } from '../dummy';
import InfoCard from '../ProductCard/InfoCard';
import { ProductsTable } from '../ProductStatsGraph/ProductsTable';
import ProductStatsGraph from '../ProductStatsGraph/ProductStatsGraph';
import { TransactionsTable } from '../Transaction/TransactionsTable';
import { Product } from '../types/main';

export const Dashboard = () => {
  const { data: products, isError } = useQuery({
    queryFn: () => getProducts(),
    queryKey: ['FETCH_PRODUCTS'],
  });
  const { data: categories } = useQuery({
    queryFn: () => getCategories(),
    queryKey: ['FETCH_CATEGORIES'],
  });
  const { data: transactions } = useQuery({
    queryFn: () => getTransactions(),
    queryKey: ['FETCH_TRANSACTIONS'],
  });
  const { data: suppliers } = useQuery({
    queryFn: () => getSuppliers(),
    queryKey: ['FETCH_SUPPLIERS'],
  });

  let productCardInfos = undefined;

  if (products) {
    productCardInfos = [
      { title: 'Number of Products', info: String(products.length), icon: '📦' },
      {
        title: 'Total Stock',
        info: String(
          products.reduce((acc: number, product: Product) => acc + product.quantity_in_stock, 0)
        ),
        icon: '📦',
      },
      {
        title: 'Total Price',
        info: `$ ${String(
          products.reduce(
            (acc: number, product: Product) =>
              acc + Number(product.price) * product.quantity_in_stock,
            0
          )
        )}`,
        icon: '📦',
      },
    ];
  }
  return (
    <>
      <Container my="lg" fluid={false}>
        <Grid gutter="lg" className="mb-10">
          <Grid.Col span={12}>
            <Title ta="left" mt={20}>
              {/* Inventory Dashboard */}
              <Text
                inherit
                variant="gradient"
                component="span"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                Inventory Dashboard
              </Text>
            </Title>
          </Grid.Col>
        </Grid>
        {products && categories && (
          <Grid gutter="lg" className="mb-10">
            {productCardInfos!.map((info) => (
              <Grid.Col span={{ base: 12, xs: 4 }}>
                <InfoCard title={info.title} info={info.info} icon={info.icon} />
              </Grid.Col>
            ))}
          </Grid>
        )}
        <Grid gutter="lg" className="mb-10">
          <Grid.Col span={{ base: 12, xs: 6 }}>
            <ProductStatsGraph categories={categories} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6 }}>
            <TransactionsTable />
          </Grid.Col>
        </Grid>
        <Grid gutter="lg" className="mb-10">
          <Grid.Col span={{ base: 12, xs: 12 }}>
            <ProductsTable />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};
