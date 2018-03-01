import * as actions from '../actions/expense-actions';
require('jest');

describe('expense actions', () => {
  it('should create an action to add a expense', () => {
    let expense = { name: 'equipment', cost: '100' };
    let action = actions.expenseCreate(expense);

    expect(action.type).toEqual('EXPENSE_CREATE');
    expect(action.payload).toHaveProperty('_id');
    expect(action.payload).toHaveProperty('timestamp');
    expect(action.payload).toHaveProperty('name');
    expect(action.payload).toHaveProperty('cost');
  });

  it('should create an action to update a expense', () => {
    let expense = { name: 'equipment', cost: '100' };
    let action = actions.expenseUpdate(expense);

    expect(action.type).toEqual('EXPENSE_UPDATE');
    expect(action.payload).not.toHaveProperty('_id');
    expect(action.payload).not.toHaveProperty('timestamp');
    expect(action.payload).toHaveProperty('name');
    expect(action.payload).toHaveProperty('cost');
  });

  it('should create an action to delete a expense', () => {
    let expense = { name: 'equipment', cost: '100' };
    let action = actions.expenseDelete(expense);

    expect(action.type).toEqual('EXPENSE_DELETE');
    expect(action.payload).not.toHaveProperty('_id');
    expect(action.payload).not.toHaveProperty('timestamp');
    expect(action.payload).toHaveProperty('name');
    expect(action.payload).toHaveProperty('cost');
  });
});
