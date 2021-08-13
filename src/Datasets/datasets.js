import Dataset from '../Datasets/dataset';
import { Flex } from '../Primitives';

const Datasets = (props) => {
  return (
    <Flex column gap={[1, 1, 2, 3]}>
      {props?.datasets?.map((dataset) => (
        <Dataset key={dataset.pid} dataset={dataset} />
      ))}
    </Flex>
  );
};

export default Datasets;
