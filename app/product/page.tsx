'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  IconBellDollar,
  IconChartBubble,
  IconCheck,
  IconEyeDollar,
  IconX,
} from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
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
import { useForm } from '@mantine/form';
import { randomId, useDisclosure } from '@mantine/hooks';
import BaseErrorModal from '../../components/BaseErrorModal/BaseErrorModal';
import { Supplier } from '../../components/types/main';
import { addProduct, getCategoryNamesWithId, getSuppliers } from '../util';
import { generateProductSkuPart } from '../util/helpers/skuHelper';

type FormData = {
  productName: string;
  description: string;
  quantity: string;
  category: string;
  supplier: string;
  price: string;
  sku: string;
};

export default function Product() {
  const [opened, { open, close }] = useDisclosure(false);
  const [isError, setError] = useState(false);

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      productName: '',
      description: '',
      quantity: '',
      category: '',
      supplier: '',
      price: '',
      sku: '',
    },
    validate: {
      productName: (value) =>
        !value
          ? 'Required field'
          : value.length < 2
            ? 'Product name at least must be 2 characters long'
            : null,
      description: (value) =>
        !value
          ? 'Required field'
          : value.length < 20
            ? 'Description at least must be 20 characters long'
            : null,
      quantity: (value) =>
        !value ? 'Required field' : Number(value) > 0 ? null : 'Quantity must be greater than 0',
      category: (value) => (!value ? 'Required field' : null),
      supplier: (value) => (!value ? 'Required field' : null),
      price: (value) =>
        !value ? 'Required field' : Number(value) > 0 ? null : 'Price must be greater than 0',
      sku: (value) => (!value ? 'Required field' : null),
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (body: any) => addProduct(body),
  });

  form.watch('category', ({ previousValue, value, touched, dirty }) => {
    if (value.length > 4 && previousValue !== value) {
      form.setFieldValue('sku', value.slice(0, 4).toUpperCase() + '-');
    }
  });

  const submit = async (values: FormData) => {
    const { description, productName, quantity, category, supplier, price, sku } = values;
    const body = {
      name: productName.toUpperCase(),
      categoryId: categoryNames.find((el: { name: string; id: number }) => el.name === category)
        ?.id,
      supplierId: suppliers.find((el: Supplier) => el.name === supplier)?.id,
      price: String(price),
      quantity_in_stock: quantity,
      sku: sku.toUpperCase(),
      description: description.toUpperCase(),
      // description: 12,
    };
    mutate(body, {
      onError: () => {
        setError(true);
      },
      onSuccess: () => {
        // form.reset();
        open();
      },
    });
  };

  const { data: categoryNames, isLoading: categoryNamesLoading } = useQuery({
    queryFn: () => getCategoryNamesWithId(),
    queryKey: ['CATEGORY_NAMES_WITH_ID'],
  });

  const { data: suppliers, isLoading: suppliersLoading } = useQuery({
    queryFn: () => getSuppliers(),
    queryKey: ['FETCH_SUPPLIERS'],
  });

  if (categoryNamesLoading || suppliersLoading) {
    return <Skeleton height={300} radius="md" animate={true} />;
  }

  const categoryOnlyName = categoryNames.map(
    (category: { name: string; id: number }) => category.name
  );
  const supplierOnlyName = suppliers.map((supplier: { name: string; id: number }) => supplier.name);

  const closeErrorModal = () => {
    setError(false);
    form.reset();
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
            Product Added
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
          <Link href="/" passHref>
            <Button radius={10} variant="gradient" gradient={{ from: 'blue', to: 'yellow' }}>
              Go Dashboard
            </Button>
          </Link>
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
            Add Product
          </Text>
        </Title>

        <Paper withBorder p="md" radius="md" h="100%">
          <Grid gutter="lg" className="mb-10">
            <Grid.Col span={{ xs: 8 }}>
              <TextInput
                styles={{ input: { textTransform: 'uppercase' } }}
                error={form.errors.productName}
                withAsterisk
                label="Product Name"
                placeholder="Product Name"
                key={form.key('productName')}
                {...form.getInputProps('productName')}
              />
            </Grid.Col>
            <br />
            <Grid.Col span={{ xs: 8 }}>
              <Textarea
                styles={{ input: { textTransform: 'uppercase' } }}
                label="Description"
                placeholder="Description"
                key={form.key('description')}
                {...form.getInputProps('description')}
              />
            </Grid.Col>
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
                rightSection={<></>}
                rightSectionPointerEvents="none"
                mt="md"
                label="Quantity"
                placeholder="Quantity"
                key={form.key('quantity')}
                {...form.getInputProps('quantity')}
                allowNegative={false}
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
            </Grid.Col>
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
