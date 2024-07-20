'use client';

import { Welcome } from '../Welcome/Welcome';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { Demo } from '@/components/Demo/demo';
import { AppShell, Burger  } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NumberInput } from '@mantine/core';
import { useState } from 'react';
import { Button, Switch } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { HeartBeatChart } from '../HeartBeatChart/HeartBeatChart';
import { SideBardContent } from '../SideBarContent/SideBarContent';



export function MainPage() {
  const [opened] = useDisclosure();
  const [ageValue, setAgeValue] = useState<string | number>('');
  const [weightValue, setWeightValue] = useState<string | number>('');
  const [heightValue, setHeightValue] = useState<string | number>('');
  const [isLiveData, { toggle }] = useDisclosure();

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
        <Burger
          hiddenFrom="sm"
          size="sm"
        />
        <h1>Heart Watch</h1>
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
