import RCSlider from 'rc-slider';
import { useState } from 'react';
import { FiSlash } from 'react-icons/fi';

import { Button, Flex } from '../Primitives';
import { JOIN_CHAR, useQueryParam } from '../router-utils';
import FilterBox from './Filter';

const RangeSlider = RCSlider.createSliderWithTooltip(RCSlider.Range);

function Range(props) {
  const { obj } = props;

  const param = useQueryParam(obj.name);
  const [value, setValue] = useState(
    param.value ? param.value.split(JOIN_CHAR) : obj.range
  );

  return (
    <FilterBox title={obj.name} isActive={param.isActive}>
      <Flex mt={-2} mb={-2}>
        <input
          type="checkbox"
          checked={param.isActive}
          aria-label="Toggle range filter"
          onChange={() => {
            if (param.isActive) {
              param.remove();
            } else {
              param.setValue(value.join(JOIN_CHAR));
            }
          }}
          style={{ cursor: 'inherit' }}
        />
        <Flex flex="1 1 0%" alignItems="center" mr={2} ml={3}>
          <RangeSlider
            value={value}
            min={obj.range[0]}
            max={obj.range[1]}
            step={(obj.range[1] - obj.range[0]) / 100}
            allowCross={false}
            onChange={(val) => setValue(val)}
            onAfterChange={(val) => param.setValue(val.join(JOIN_CHAR))}
          />
        </Flex>
        <Button
          variant="action"
          disabled={!param.isActive}
          aria-label="Clear"
          onClick={() => {
            setValue(obj.range);
            param.remove();
          }}
        >
          <FiSlash />
        </Button>
      </Flex>
    </FilterBox>
  );
}

export default Range;
