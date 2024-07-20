import { Title, Text, Anchor } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Heart{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Beat
        </Text>
        {' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'red', to: 'red' }}>
          Monitor
        </Text>
      </Title>
    </>
  );
}
