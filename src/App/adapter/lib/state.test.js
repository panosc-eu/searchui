import { mergeState, parseState, LABEL_FOR_CONFIG } from './state';

describe('mergeState(inits, diffs)', () => {
  test('Works on empty arrays', () => {
    const inits = [];
    const diffs = [];
    expect(mergeState(inits, diffs)).toHaveLength(0);
  });
  test('Merges objects with matching labels', () => {
    const inits = [
      {
        label: '1',
        group: 'test',
      },
      {
        label: '2',
        group: 'test',
      },
    ];
    const diffs = [
      {
        label: '1',
        value: 'something',
      },
      {
        label: '2',
        value: 'something',
      },
    ];
    const expected = [
      {
        label: '1',
        group: 'test',
        value: 'something',
      },
      {
        label: '2',
        group: 'test',
        value: 'something',
      },
    ];
    expect(mergeState(inits, diffs)).toEqual(expected);
  });
  test('Merges "right"', () => {
    const inits = [
      {
        label: '1',
        group: 'test',
        value: '',
      },
    ];
    const diffs = [
      {
        label: '1',
        value: 'something',
      },
    ];
    const expected = [
      {
        label: '1',
        value: 'something',
        group: 'test',
      },
    ];
    expect(mergeState(inits, diffs)).toEqual(expected);
  });
  test('Only filters found in diffs get through', () => {
    const inits = [
      {
        label: '1',
        group: 'test',
        operator: 'like',
        value: '',
      },
      {
        label: '2',
        group: 'test',
        operator: 'like',
      },
    ];
    const diffs = [
      {
        label: '1',
        value: 'something',
      },
    ];
    const expected = [
      {
        label: '1',
        group: 'test',
        operator: 'like',
        value: 'something',
      },
    ];
    expect(mergeState(inits, diffs)).toEqual(expected);
  });
  test('Config is never filtered out', () => {
    const inits = [{ label: LABEL_FOR_CONFIG }];
    const diffs = [];
    expect(mergeState(inits, diffs)).toEqual(inits);
  });
  test('Objects (= groups) whose labels match the group key of any object in diffs are not filtered out', () => {
    const inits = [{ label: 'group' }];
    const diffs = [
      {
        label: 'filter',
        group: 'group',
      },
    ];
    const expected = [...inits, ...diffs];
    expect(mergeState(inits, diffs)).toEqual(expected);
  });
});

describe('parseState(state, endpoint)', () => {});
