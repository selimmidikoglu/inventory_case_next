'use client';

import { useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons-react';
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
  Switch,
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
  const [fluidCollapse, setFluidCollapse] = useState(false);
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
      <Container my="lg" fluid={fluidCollapse}>
        <Grid gutter="lg" className="mb-10">
          <Grid.Col span={12}>
            <Group align="center" justify="space-between">
              <Title ta="left">
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
              <Switch
                checked={fluidCollapse}
                onChange={(event) => setFluidCollapse(!fluidCollapse)}
                color="teal"
                variant="gradient"
                size="md"
                thumbIcon={
                  fluidCollapse ? (
                    <IconCheck
                      style={{ width: rem(12), height: rem(12) }}
                      color={'red'}
                      stroke={3}
                    />
                  ) : (
                    <IconX style={{ width: rem(12), height: rem(12) }} color={'green'} stroke={5} />
                  )
                }
              />
            </Group>
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
