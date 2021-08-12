import { capitalizeAndSpace } from '../App/helpers';
import { Box, Flex, Heading } from '../Primitives';
import KeywordsMaybeSomethingElseInTheFutureDunno from './keywordsForNow';
import OptionsPicker from './optionsPicker';
import Range from './range';
import Text from './text';

const Filter = ({ obj }) => {
  return (
    <Box>
      <Heading
        variant="small"
        fontSize={1}
        onClick={(e) => obj.toggleIsActive(e)}
        sx={{
          cursor: 'pointer',
          color: obj.isActive ? 'heading' : 'text',
          fontWeight: obj.isActive ? 600 : 400,
          textTransform: 'capitalize',
        }}
      >
        {capitalizeAndSpace(obj.name ?? obj.value)}
      </Heading>

      <Flex sx={{ mx: 2, flexDirection: 'column' }}>
        {obj?.operator === 'between' ? (
          <Range obj={obj} />
        ) : obj.options ? (
          <OptionsPicker obj={obj} />
        ) : obj.list ? (
          <KeywordsMaybeSomethingElseInTheFutureDunno obj={obj} />
        ) : (
          ['ilike', 'nilike', 'like', 'nlike', 'regexp', 'eq', 'neq'].includes(
            obj?.operator
          ) && <Text obj={obj} />
        )}
      </Flex>
    </Box>
  );
};

export default Filter;
