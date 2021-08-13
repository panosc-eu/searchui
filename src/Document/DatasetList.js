import { Flex } from '../Primitives';
import DatasetItem from './DatasetItem';

const DatasetList = (props) => {
  return (
    <Flex column gap={[1, 1, 2, 3]}>
      {props?.datasets?.map((dataset) => (
        <DatasetItem key={dataset.pid} dataset={dataset} />
      ))}
    </Flex>
  );
};

export default DatasetList;
