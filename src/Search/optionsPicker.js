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
      key={option}
      as="a"
      variant="small"
      onClick={() => toggleOption(option)}
      sx={{
        color: obj.isActive && obj.value === option ? 'heading' : 'text',
        fontSize: 0,
        fontWeight: obj.isActive && obj.value === option ? 600 : 400,
        cursor: 'pointer',
      }}
    >
      {option}
    </Heading>
  ));
};

export default OptionsMapped;
