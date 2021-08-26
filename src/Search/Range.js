import { useState } from 'react';

import RCSlider from 'rc-slider';
import { FiSlash } from 'react-icons/fi';

import { Button, Flex } from '../Primitives';

const RangeSlider = RCSlider.createSliderWithTooltip(RCSlider.Range);

function Range(props) {
  const { obj } = props;
  const [value, setValue] = useState(obj.range);
  const isInitialRange = value[0] === obj.range[0] && value[1] === obj.range[1];

  function handleChange(val) {
    if (!obj.isActive) {
      obj.toggleIsActive(true);
    }

    obj.assocValue(val);
  }

  return (
    <Flex mt={-2} mb={-2}>
      <input
        type="checkbox"
        checked={obj.isActive}
        onChange={() => obj.toggleIsActive(!obj.isActive)}
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
          onAfterChange={handleChange}
        />
      </Flex>
      <Button
        variant="action"
        disabled={!obj.isActive && isInitialRange}
        aria-label="Clear"
        onClick={() => {
          setValue(obj.range);
          obj.toggleIsActive(0);
          obj.assocValue(obj.range);
        }}
      >
        <FiSlash />
      </Button>
    </Flex>
  );
}

export default Range;
