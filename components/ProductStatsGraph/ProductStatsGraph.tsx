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
  count: string;
  part: number;
  color: string;
}
// const newData = dummy().Categories.map((category) => ({
//   label: category.name,
//   count: String(category.id),
//   part: 20,
//   color: '#47d6ab',
// }));

type Props = {
  categories: Category[];
};
const ProductStatsGraph = (props: Props) => {
  const { categories } = props;

  const {
    data: percentageData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['percentageData'],
    queryFn: () => getPercentageCategory(),
  });
  if (isLoading) {
    return <Skeleton height={300} radius="md" animate={false} />; // or a spinner component
  }

  // Show an error state if the query failed
  if (error) {
    return <div>Error loading data</div>;
  }

  // Map the data when it's available
  const newData =
    percentageData?.map((el: Percentage, index: number) => ({
      ...el,
      color: graphColors[index],
    })) || []; // Fallback to empty array if data is undefined

  // Generate progress segments
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
            {/* <span>18%</span> */}
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
