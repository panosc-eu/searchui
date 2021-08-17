import React from 'react';

import ListPicker from './ListPicker';
import OptionsPicker from './OptionsPicker';
import Range from './Range';
import TextInput from './TextInput';

const TEXT_OPERATORS = [
  'ilike',
  'nilike',
  'like',
  'nlike',
  'regexp',
  'eq',
  'neq',
];

function FilterControl(props) {
  const { obj } = props;

  if (obj.operator === 'between') {
    return <Range obj={obj} />;
  }

  if (obj.options) {
    return <OptionsPicker obj={obj} />;
  }

  if (obj.list) {
    return <ListPicker obj={obj} />;
  }

  if (TEXT_OPERATORS.includes(obj.operator)) {
    return <TextInput obj={obj} />;
  }

  return null;
}

export default FilterControl;
