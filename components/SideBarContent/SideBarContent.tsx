import { useDisclosure } from '@mantine/hooks';
import { NumberInput } from '@mantine/core';
import { useState } from 'react';
import { Button, Switch } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';



export function SideBardContent() {
  const [opened] = useDisclosure();
  const [ageValue, setAgeValue] = useState<string | number>('');
  const [weightValue, setWeightValue] = useState<string | number>('');
  const [heightValue, setHeightValue] = useState<string | number>('');
  const [isLiveData, { toggle }] = useDisclosure();

  return (
    <>
        <NumberInput label="Age" placeholder="Please enter your age" hideControls value={ageValue} onChange={setAgeValue}/>
        <NumberInput label="Weight" placeholder="Please enter your weight" hideControls value={weightValue} onChange={setWeightValue}/>
        <NumberInput label="Height" placeholder="Please enter your height" hideControls value={heightValue} onChange={setHeightValue}/>
        <p></p>
        <Button variant="filled" onClick={() => console.log("Clicked")}>Update</Button>
        <Switch checked={isLiveData} onChange={toggle} label="If fetch real time heartbeat?" mt="md" />
        <p></p>
        <Button rightSection={<IconDownload size={14} />}  onClick={() => console.log("Clicked")}>Download</Button>
    </>
  );
}
