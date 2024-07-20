'use client';

import { Welcome } from '../Welcome/Welcome';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { Demo } from '@/components/Demo/demo';
import { AppShell, Burger, Group, Skeleton  } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NumberInput } from '@mantine/core';
import { useState } from 'react';


export function MainPage() {
  const [opened, { toggle }] = useDisclosure();
  const [ageValue, setAgeValue] = useState<string | number>('');
  const [weightValue, setWeightValue] = useState<string | number>('');
  const [heightValue, setHeightValue] = useState<string | number>('');

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <h1>Heart Watch</h1>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NumberInput label="Age" placeholder="Please enter your age" hideControls value={ageValue} onChange={setAgeValue}/>
        <NumberInput label="Weight" placeholder="Please enter your weight" hideControls value={weightValue} onChange={setWeightValue}/>
        <NumberInput label="Height" placeholder="Please enter your height" hideControls value={heightValue} onChange={setHeightValue}/>
      </AppShell.Navbar>

      <AppShell.Main>
        <Welcome />
        <ColorSchemeToggle />
        <Demo />
      </AppShell.Main>
    </AppShell>
  );
}
