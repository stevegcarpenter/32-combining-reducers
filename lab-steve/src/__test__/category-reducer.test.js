import reducer from '../reducers/category';
require('jest');

describe('Category reducer', () => {
  it('should return the initial state on first call', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle CATEGORY_CREATE', () => {
    let categoryOne = { _id: '1235', name: 'foo', budget: '100', timestamp: new Date() };
    let categoryTwo = { _id: '4567', name: 'bar', budget: '200', timestamp: new Date() };

    let state = reducer([categoryOne], {
      type: 'CATEGORY_CREATE',
      payload: categoryTwo,
    });

    expect(state).toContain(categoryOne);
    expect(state).toContain(categoryTwo);
  });

  it('should handle CATEGORY_UPDATE', () => {
    let categoryOne = { _id: '1235', name: 'foo', budget: '100', timestamp: new Date() };
    let categoryOneUpdate = { _id: '1235', name: 'bar', budget: '200', timestamp: new Date() };

    let state = reducer([categoryOne], {
      type: 'CATEGORY_UPDATE',
      payload: categoryOneUpdate,
    });

    expect(state[0].name).toEqual(categoryOneUpdate.name);
    expect(state[0].budget).toEqual(categoryOneUpdate.budget);
  });

  it('should handle CATEGORY_DELETE', () => {
    let category = { _id: '1235', name: 'foo', budget: '100', timestamp: new Date() };

    let state = reducer([category], {
      type: 'CATEGORY_DELETE',
      payload: category,
    });

    expect(state.length).toEqual(0);
  });
});
