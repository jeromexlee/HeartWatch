'use client';

import { Welcome } from '../Welcome/Welcome';
import { AppShell, Group  } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { HeartBeatChart } from '../HeartBeatChart/HeartBeatChart';
import { SideBardContent } from '../SideBarContent/SideBarContent';
import {IconHeart } from '@tabler/icons-react';
import { Text } from '@mantine/core';


export function MainPage() {
  const [opened] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group>
        <IconHeart size={30} color='red' ></IconHeart>
        <Text inherit variant="gradient" component="span" gradient={{ from: 'blue', to: 'red'}} size='xl' fw={1000}>Heart Watch</Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <SideBardContent />
      </AppShell.Navbar>

      <AppShell.Main>
        <Welcome />
        <HeartBeatChart />
      </AppShell.Main>
    </AppShell>
  );
}
