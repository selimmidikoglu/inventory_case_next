import { IconArrowUpRight, IconDeviceAnalytics } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { Box, Group, Paper, Progress, rem, SimpleGrid, Skeleton, Text } from '@mantine/core';
import { getPercentageCategory } from '../../app/util';
import { graphColors } from '../../app/util/ui/colors';
import { dummy } from '../dummy';
import { Category, Product } from '../types/main';
import classes from './ProductStatsGraph.module.css';

export interface Percentage {
  label: string;
  count: number;
  part: number;
  color: string;
}

interface PercentageObj {
  label: string;
  count: number;
  part: number;
}
type Props = {
  data: PercentageObj[];
};
const ProductStatsGraph = (props: Props) => {
  const { data } = props;

  const newData =
    data?.map((el: PercentageObj, index: number) => ({
      ...el,
      color: graphColors[index],
    })) || [];

  const segments = newData.map((segment: Percentage) => (
    <Progress.Section value={segment.part} color={segment.color} key={segment.color}>
      {segment.part > 10 && <Progress.Label>{segment.part}%</Progress.Label>}
    </Progress.Section>
  ));

  const descriptions = newData.map((stat: Percentage) => (
    <Box key={stat.label} style={{ borderBottomColor: stat.color }} className={classes.stat}>
      <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
        {stat.label}
      </Text>

      <Group justify="space-between" align="flex-end" gap={0}>
        <Text fw={700}>{stat.count}</Text>
        <Text c={stat.color} fw={700} size="sm" className={classes.statCount}>
          {stat.part}%
        </Text>
      </Group>
    </Box>
  ));

  return (
    <Paper withBorder p="md" radius="md" h="100%">
      <Group justify="space-between">
        <Group align="flex-end" gap="xs">
          <Text fz="xl" fw={700}>
            Stock by Category
          </Text>
          <Text c="teal" className={classes.diff} fz="sm" fw={700}>
            <IconArrowUpRight size="1rem" style={{ marginBottom: rem(4) }} stroke={1.5} />
          </Text>
        </Group>
        <IconDeviceAnalytics size="1.4rem" className={classes.icon} stroke={1.5} />
      </Group>

      <Progress.Root size={50} classNames={{ label: classes.progressLabel }} mt={40}>
        {segments}
      </Progress.Root>

      <SimpleGrid pt={'lg'} spacing="xl" cols={{ base: 1, xs: 3 }} mt="xl">
        {descriptions}
      </SimpleGrid>
    </Paper>
  );
};
export default ProductStatsGraph;
