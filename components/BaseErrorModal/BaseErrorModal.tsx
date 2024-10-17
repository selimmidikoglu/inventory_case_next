import React from 'react';
import { IconX } from '@tabler/icons-react';
import { Button, Group, Modal, Text } from '@mantine/core';

type Props = {
  openError: boolean;
  closeError: () => void;
};

const BaseErrorModal = (props: Props) => {
  const { openError, closeError } = props;
  return (
    <Modal onClose={closeError} opened={openError} withCloseButton={false}>
      <Group align="center" justify="center">
        <IconX size={40} stroke={2} color="red" />
        <Text
          variant="gradient"
          component="span"
          gradient={{ from: 'pink', to: 'yellow' }}
          ta="left"
          size="lg"
        >
          Something went wrong!
        </Text>
      </Group>
      <Group mt={50} align="center" justify="flex-end">
        <Button
          onClick={closeError}
          radius={10}
          variant="gradient"
          gradient={{ from: 'pink', to: 'yellow' }}
        >
          Close
        </Button>
      </Group>
    </Modal>
  );
};

export default BaseErrorModal;
