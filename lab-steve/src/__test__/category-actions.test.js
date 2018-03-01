import * as actions from '../actions/category-actions';
require('jest');

describe('category actions', () => {
  it('should create an action to add a category', () => {
    let category = { name: 'equipment', budget: '100' };
    let action = actions.categoryCreate(category);

    expect(action.type).toEqual('CATEGORY_CREATE');
    expect(action.payload).toHaveProperty('_id');
    expect(action.payload).toHaveProperty('timestamp');
    expect(action.payload).toHaveProperty('name');
    expect(action.payload).toHaveProperty('budget');
  });

  it('should create an action to update a category', () => {
    let category = { name: 'equipment', budget: '100' };
    let action = actions.categoryUpdate(category);

    expect(action.type).toEqual('CATEGORY_UPDATE');
    expect(action.payload).not.toHaveProperty('_id');
    expect(action.payload).not.toHaveProperty('timestamp');
    expect(action.payload).toHaveProperty('name');
    expect(action.payload).toHaveProperty('budget');
  });

  it('should create an action to delete a category', () => {
    let category = { name: 'equipment', budget: '100' };
    let action = actions.categoryDelete(category);

    expect(action.type).toEqual('CATEGORY_DELETE');
    expect(action.payload).not.toHaveProperty('_id');
    expect(action.payload).not.toHaveProperty('timestamp');
    expect(action.payload).toHaveProperty('name');
    expect(action.payload).toHaveProperty('budget');
  });
});
