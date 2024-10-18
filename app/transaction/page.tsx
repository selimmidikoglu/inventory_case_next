'use client';

import { use, useState } from 'react';
import { IconCheck } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import '@mantine/dates/styles.css';

import { useRouter } from 'next/navigation';
import {
  Button,
  Container,
  Grid,
  Group,
  Loader,
  LoadingOverlay,
  Modal,
  NumberInput,
  Paper,
  Select,
  Skeleton,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import BaseErrorModal from '../../components/BaseErrorModal/BaseErrorModal';
import { Product } from '../../components/types/main';
import { addTransaction, getProducts, getTransactionTypes } from '../util';

type FormData = {
  product: string;
  transactionType: string;
  quantity: string;
  date: Date;
  remarks: string;
};

export default function Transaction() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [isError, setError] = useState(false);

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      product: '',
      transactionType: '',
      quantity: '',
      date: new Date(),
      remarks: '',
    },
    validate: {
      remarks: (value) =>
        !value
          ? 'Required field'
          : value.length < 10
            ? 'Remark at least must be 10 characters long'
            : null,
      quantity: (value) => (!value ? 'Required field' : null),
      transactionType: (value) => (!value ? 'Required field' : null),
      product: (value) => (!value ? 'Required field' : null),
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (body: any) => addTransaction(body),
  });

  const submit = async (values: FormData) => {
    const { product, transactionType, quantity, date, remarks } = values;

    const body = {
      productId: products.find((el: Product) => el.name === product)?.id,
      quantity: Number(quantity),
      date: new Date(date).toISOString(),
      remarks: remarks,
      transactionType: transactionType,
    };
    mutate(body, {
      onError: () => {
        setError(true);
      },
      onSuccess: () => {
        form.reset();
        open();
      },
    });
  };

  const { data: transactionTypes, isLoading: transactionTypesLoading } = useQuery({
    queryFn: () => getTransactionTypes(),
    queryKey: ['TRANSACTION_TYPES'],
  });

  const { data: products, isLoading: productsLoading } = useQuery({
    queryFn: () => getProducts(),
    queryKey: ['FETCH_PRODUCTS'],
  });

  if (transactionTypesLoading || productsLoading) {
    return (
      <Container>
        <LoadingOverlay
          visible={isPending}
          loaderProps={{ children: <Loader size={50} color="dark" /> }}
        />
        <Title ta="left" mt={20}>
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            Add Inventory Transaction
          </Text>
        </Title>
        <Paper p="md" radius="md" h="100%">
          <Grid gutter="lg" className="mb-10">
            <Skeleton height={292.77} radius="md" animate={true} />
          </Grid>
        </Paper>
      </Container>
    );
  }

  const productNames = products.map((product: Product) => product.name);
  //   const supplierOnlyName = suppliers.map((supplier: { name: string; id: number }) => supplier.name);

  const closeErrorModal = () => {
    setError(false);
    form.reset();
  };
  const handleGoToDashboard = () => {
    queryClient.invalidateQueries({ queryKey: ['PRODUCTS_WITH_SPECIFIC_CATEGORY'] });
    router.push('/');
  };

  return (
    <Container>
      <LoadingOverlay
        visible={isPending}
        loaderProps={{ children: <Loader size={50} color="dark" /> }}
      />
      {isError && <BaseErrorModal openError={true} closeError={closeErrorModal} />}
      <Modal radius={20} opened={opened} onClose={close} withCloseButton={false}>
        <Group align="center" justify="center">
          <IconCheck size={40} stroke={2} color="green" />
          <Text
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
            ta="left"
            size="lg"
          >
            Inventory Transaction Added
          </Text>
        </Group>
        <Group mt={50} align="center" justify="flex-end">
          <Button
            onClick={() => {
              form.reset();
              close();
            }}
            radius={10}
            variant="gradient"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            Add More
          </Button>

          <Button
            radius={10}
            onClick={handleGoToDashboard}
            variant="gradient"
            gradient={{ from: 'blue', to: 'yellow' }}
          >
            Go Dashboard
          </Button>
        </Group>
      </Modal>
      <form onSubmit={form.onSubmit((values) => submit(values))}>
        <Title ta="left" mt={20}>
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            Add Inventory Transaction
          </Text>
        </Title>

        <Paper withBorder p="md" radius="md" h="100%">
          <Grid gutter="lg" className="mb-10">
            <Grid.Col span={{ xs: 6 }}>
              <Select
                clearable
                placeholder="Product"
                searchable
                data={productNames}
                mt="md"
                label="Product"
                key={form.key('product')}
                {...form.getInputProps('product')}
              />
            </Grid.Col>
            <Grid.Col span={{ xs: 6 }}>
              <Select
                clearable
                placeholder="Type"
                data={transactionTypes}
                mt="md"
                label="Transaction Type"
                key={form.key('transactionType')}
                {...form.getInputProps('transactionType')}
              />
            </Grid.Col>

            <Grid.Col span={{ xs: 6 }}>
              <NumberInput
                rightSection={<></>}
                rightSectionPointerEvents="none"
                mt="md"
                label="Quantity"
                placeholder="Quantity"
                key={form.key('quantity')}
                {...form.getInputProps('quantity')}
                allowNegative={true}
              />
            </Grid.Col>

            <Grid.Col span={{ xs: 6 }}>
              <Textarea
                // styles={{ input: { textTransform: 'uppercase' } }}
                label="Remarks"
                placeholder="Remarks"
                key={form.key('remarks')}
                {...form.getInputProps('remarks')}
              />
            </Grid.Col>
            <Grid.Col span={{ xs: 6 }}>
              <DateTimePicker
                valueFormat="DD MMM YYYY hh:mm A"
                label="Pick date and time"
                placeholder="Pick date and time"
                minDate={new Date()}
                key={form.key('date')}
                {...form.getInputProps('date')}
              />
            </Grid.Col>
            {/*
            <Grid.Col span={{ xs: 6 }}>
              <Select
                clearable
                placeholder="Pick Category"
                data={categoryOnlyName}
                mt="md"
                label="Category"
                key={form.key('category')}
                {...form.getInputProps('category')}
              />
            </Grid.Col>
            <Grid.Col span={{ xs: 6 }}>
              <Select
                clearable
                placeholder="Pick Supplier"
                data={supplierOnlyName}
                mt="md"
                label="Supplier"
                key={form.key('supplier')}
                {...form.getInputProps('supplier')}
              />
            </Grid.Col>
            
            <Grid.Col span={{ xs: 6 }}>
              <NumberInput
                allowNegative={false}
                key={form.key('price')}
                label="Price"
                placeholder="$0.00"
                mt="md"
                prefix="$"
                decimalSeparator=","
                thousandSeparator="."
                rightSection={<IconBellDollar size={16} />}
                rightSectionPointerEvents="none"
                {...form.getInputProps('price')}
              />
            </Grid.Col>
            <Grid.Col span={{ xs: 3 }}>
              <TextInput
                label="SKU"
                styles={{ input: { textTransform: 'uppercase' } }}
                placeholder="SKU"
                key={form.key('sku')}
                {...form.getInputProps('sku')}
              />
            </Grid.Col> */}
          </Grid>
        </Paper>
        <Group justify="flex-end" mt="md">
          <Button type="submit" variant="gradient" gradient={{ from: 'pink', to: 'yellow' }}>
            Add
          </Button>
        </Group>
      </form>
    </Container>
  );
}
