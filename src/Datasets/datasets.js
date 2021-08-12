import css from '@styled-system/css';
import styled from 'styled-components';

import Dataset from '../Datasets/dataset';
import Layout from '../Layout/column';

const Datasets = (props) => {
  return (
    <SmallerGaps>
      {props?.datasets?.map((dataset) => (
        <Dataset dataset={dataset} key={dataset.pid} />
      ))}
    </SmallerGaps>
  );
};
export default Datasets;

const SmallerGaps = styled(Layout)(
  css({
    gap: [1, 1, 2, 3],
  })
);
