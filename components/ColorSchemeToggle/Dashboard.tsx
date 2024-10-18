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
import { getPercentageCategory, getProducts, getTransactionWithProducts } from '../../app/util';
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
  const { data: transactionWithProduct } = useQuery({
    queryFn: () => getTransactionWithProducts(),
    queryKey: ['TRANSACTIONS_WITH_PRODUCTS'],
  });
  const { data: percentageData, isLoading: percentageDataIsLoading } = useQuery({
    queryKey: ['percentageData'],
    queryFn: () => getPercentageCategory(),
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
        {!productCardInfos && (
          <Grid gutter="lg" className="mb-10">
            {Array(3)
              .fill(0)
              .map((info) => (
                <Grid.Col span={{ base: 12, xs: 4 }}>
                  <Skeleton height={144} radius="md" animate={true} />
                </Grid.Col>
              ))}
          </Grid>
        )}
        {products && (
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
            {!percentageData ? (
              <Skeleton height={386} radius="md" animate={true} />
            ) : (
              <ProductStatsGraph data={percentageData} />
            )}
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6 }}>
            {!transactionWithProduct ? (
              <Skeleton height={386} radius="md" animate={true} />
            ) : (
              <TransactionsTable data={transactionWithProduct} />
            )}
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
