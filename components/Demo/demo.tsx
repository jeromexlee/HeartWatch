import Link from 'next/link';
import { Button, Group } from '@mantine/core';

export function Demo() {
  return (
    <Group justify="center" mt="xl">
        <Button component={Link} href="/hello">
        Next link button
        </Button>
    </Group>
  );
}