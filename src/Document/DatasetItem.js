import { Card, Heading, Text } from '../Primitives';

const DatasetItem = ({ dataset }) => {
  return (
    <Card as="article" key={dataset.pid} p={[2, 2, 3]}>
      <Heading as="h3">{dataset.title}</Heading>
      <Text as="p">
        {dataset.instrument.name} @ {dataset.instrument.facility}
      </Text>
    </Card>
  );
};

export default DatasetItem;
