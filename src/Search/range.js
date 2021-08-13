import NotSoCrispSlider from 'rc-slider';

import 'rc-slider/assets/index.css';
import { Box } from '../Primitives';

const RangeSlider = NotSoCrispSlider.createSliderWithTooltip(
  NotSoCrispSlider.Range
);

function Range(props) {
  const { obj } = props;

  function handleChange(e) {
    if (!obj.isActive) {
      obj.toggleIsActive(1);
    }
    if (obj.isActive && e[0] === obj.range[0] && e[1] === obj.range[1]) {
      obj.toggleIsActive(0);
    }
    return obj.assocValue(e);
  }

  return (
    <Box mt={-2} mb={2}>
      <RangeSlider
        min={obj.range[0]}
        max={obj.range[1]}
        step={(obj.range[1] - obj.range[0]) / 100}
        defaultValue={obj.range}
        onChange={handleChange}
      />
    </Box>
  );
}

export default Range;
