import { useState } from 'react';

import RCSlider from 'rc-slider';
import { FiSlash } from 'react-icons/fi';

import { Button, Flex } from '../Primitives';

const RangeSlider = RCSlider.createSliderWithTooltip(RCSlider.Range);

function Range(props) {
  const { obj } = props;
  const [value, setValue] = useState(obj.range);

  function handleChange(val) {
    const shouldActivate = val[0] !== obj.range[0] || val[1] !== obj.range[1];
    if (obj.isActive !== shouldActivate) {
      obj.toggleIsActive(shouldActivate ? 1 : 0);
    }

    obj.assocValue(val);
  }

  return (
    <Flex mt={-2}>
      <Flex flex="1 1 0%" alignItems="center" mx={2}>
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
        py={2}
        disabled={!obj.isActive}
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
