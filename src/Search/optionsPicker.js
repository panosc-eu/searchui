import { Heading } from '../Primitives';

const OptionsMapped = ({ obj }) => {
  const toggleOption = (option) => {
    if (obj.value !== option || !obj.isActive) {
      obj.assocValue(option);
      if (!obj.isActive) {
        obj.toggleIsActive(1);
      }
    } else {
      obj.toggleIsActive(0);
    }
  };
  return obj.options.map((option) => (
    <Heading
      fontSize={0}
      key={option}
      variant="small"
      as="a"
      onClick={() => toggleOption(option)}
      sx={{
        cursor: 'pointer',
        color: obj.isActive && obj.value === option ? 'heading' : 'text',
        fontWeight: obj.isActive && obj.value === option ? 600 : 400,
      }}
    >
      {option}
    </Heading>
  ));
};

export default OptionsMapped;
