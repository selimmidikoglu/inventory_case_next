import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import cx from 'clsx';
import {
  Anchor,
  Button,
  Group,
  Paper,
  Progress,
  ScrollArea,
  Skeleton,
  Table,
  Text,
} from '@mantine/core';
import { getTransactionWithProducts } from '../../app/util';
import { TransactionWithProduct } from '../types/main';
import classes from './TransactionsTable.module.css';

export function TransactionsTable({ data }: { data: TransactionWithProduct[] }) {
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row: TransactionWithProduct) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.product.name}</Table.Td>
      <Table.Td>{row.transactionType}</Table.Td>
      <Table.Td>{row.quantity}</Table.Td>
      <Table.Td>{row.date}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder p="md" radius="md" h="100%">
      <Group align="center" justify="space-between" mb={'md'}>
        <Text fz="xl" fw={700}>
          Recent Transactions
        </Text>

        <Link href="/transaction">
          <Button variant="light" color="green" radius="md">
            Add Transaction
          </Button>
        </Link>
      </Group>
      <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table miw={700}>
          <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <Table.Tr>
              <Table.Th>Product</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}
