'use client';

import { IconBrandCodesandbox } from '@tabler/icons-react';
import { Card, Flex, Group, RingProgress, Text, useMantineTheme } from '@mantine/core';
import classes from './ProductCard.module.css';

type Props = {};

/**
 * A card to display product information.
 *
 * @returns A React component.
 * @example
 * <ProductCard />
 */

const InfoCard = ({ title, info, icon }: { title: string; info: string; icon: string }) => {
  const theme = useMantineTheme();
  const completed = 1887;
  const total = 2334;

  return (
    <Card withBorder p="lg" radius="md" className={classes.card}>
      {/* Title aligned to the left */}
      <Flex
        mih={50}
        // gap="md"
        justify="space-between"
        align="flex-start"
        direction="row"
        wrap="nowrap"
      >
        <Text fz="xl" className={classes.label}>
          {title}
        </Text>
        <IconBrandCodesandbox size={20} stroke={1.5} />
      </Flex>

      <div className="mt-auto">
        <Text className={classes.lead} mt={30}>
          {info}
        </Text>
      </div>
    </Card>
  );
};
export default InfoCard;
