import { Card, Heading, Text } from '../Primitives';

const Dataset = ({ dataset }) => {
  return (
    <Card key={dataset.pid} p={2}>
      <Heading>{dataset.title}</Heading>
      <Text>
        {dataset.instrument.name} @ {dataset.instrument.facility}
      </Text>
    </Card>
  );
};

export default Dataset;
