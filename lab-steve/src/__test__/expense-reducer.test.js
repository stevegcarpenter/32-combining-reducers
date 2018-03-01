import reducer from '../reducers/expense';
require('jest');

describe('Expense reducer', () => {
  it('should return the initial state on first call', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle CATEGORY_CREATE', () => {
    let category = { _id: '1235', name: 'foo', budget: '100', timestamp: new Date() };

    let state = reducer({}, {
      type: 'CATEGORY_CREATE',
      payload: category,
    });

    expect(state).toEqual({ [category._id]: [] });
  });

  it('should handle CATEGORY_DELETE', () => {
    let category = { _id: '1235', name: 'foo', budget: '100', timestamp: new Date() };
    let oldstate = {
      '1235': [
        {
          name: 'expense1',
          budget: '1000',
        },
        {
          name: 'expense2',
          budget: '1000',
        },
      ]
    };

    let state = reducer(oldstate, {
      type: 'CATEGORY_DELETE',
      payload: category,
    });

    expect(state).toEqual({});
  });

  it('should handle EXPENSE_CREATE', () => {
    let expenseOne = { _id: '1111', categoryId: '1234', name: 'foo', budget: '100', timestamp: new Date() };
    let expenseTwo = { _id: '2222', categoryId: '1234', name: 'bar', budget: '200', timestamp: new Date() };
    let oldstate = {
      '1234': [expenseOne]
    };

    let state = reducer(oldstate, {
      type: 'EXPENSE_CREATE',
      payload: expenseTwo,
    });

    expect(state['1234']).toContain(expenseOne);
    expect(state['1234']).toContain(expenseTwo);
  });

  it('should handle EXPENSE_UPDATE', () => {
    let expenseOne = { _id: '1111', categoryId: '1234', name: 'foo', budget: '100', timestamp: new Date() };
    let expenseOneUpdate = { _id: '1111', categoryId: '1234', name: 'bar', budget: '200', timestamp: new Date() };

    let state = reducer({ [expenseOne.categoryId]: [expenseOne] }, {
      type: 'EXPENSE_UPDATE',
      payload: expenseOneUpdate,
    });

    expect(state['1234']).toEqual([expenseOneUpdate]);
  });

  it('should handle EXPENSE_DELETE', () => {
    let expense = { _id: '1111', categoryId: '1234', name: 'foo', budget: '100', timestamp: new Date() };

    let state = reducer({
      '1234': [
        expense
      ]
    }, {
      type: 'EXPENSE_DELETE',
      payload: expense,
    });

    expect(state).toEqual({ '1234': [] });
  });
});
