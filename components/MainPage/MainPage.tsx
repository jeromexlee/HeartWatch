'use client';

import React, { useContext } from 'react';
import { Welcome } from '../Welcome/Welcome';
import { AppShell, Group, Text, Alert as MantineAlert, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HeartBeatChart } from '../HeartBeatChart/HeartBeatChart';
import { SideBardContent } from '../SideBarContent/SideBarContent';
import { IconHeart } from '@tabler/icons-react';
import { HeartBeatContext } from './HeartBeatContext';

export function MainPage() {
  const [opened] = useDisclosure();
  const context = useContext(HeartBeatContext);

  if (!context) {
    return <div>Loading...</div>; // Render loading state if context is not available
  }

  const { alerts, dismissAlert } = context;

  const icon = <IconHeart />;

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
          <IconHeart size={30} color='red' />
          <Text inherit variant="gradient" component="span" gradient={{ from: 'blue', to: 'red' }} size='xl' fw={1000}>Heart Watch</Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <SideBardContent />
      </AppShell.Navbar>

      <AppShell.Main>
        <Welcome />
        <Flex gap="lg" direction="column">
            {alerts && alerts.length > 0 && alerts.map(alert => (
            <MantineAlert key={alert.id} title="Alert" color="red" icon={icon} withCloseButton onClose={() => dismissAlert(alert.id)}> 
                {alert.message}
            </MantineAlert>
            ))}
        </Flex>
        <HeartBeatChart />
      </AppShell.Main>
    </AppShell>
  );
}
