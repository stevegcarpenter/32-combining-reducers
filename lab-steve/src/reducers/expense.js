export default (state={}, action) => {
  let { type, payload } = action;

  switch (type) {
  case 'CATEGORY_CREATE': return { ...state, [payload._id]: [] };
  case 'CATEGORY_DELETE':
  {
    let newstate = { ...state };
    delete newstate[payload._id];
    return newstate;
  }
  case 'EXPENSE_CREATE':
  {
    let newstate = { ...state };
    newstate[payload.categoryId].push(payload);
    return newstate;
  }
  case 'EXPENSE_UPDATE':
  {
    let newstate = { ...state };
    newstate[payload.categoryId] = newstate[payload.categoryId]
      .map(exp => exp._id === payload._id ? payload : exp);
    return newstate;
  }
  case 'EXPENSE_DELETE':
  {
    let newstate = { ...state };
    newstate[payload.categoryId] = newstate[payload.categoryId]
      .filter(exp => exp._id !== payload._id);
    return newstate;
  }
  case 'EXPENSE_RESET':
  {
    let newstate = { ...state };
    newstate[payload.categoryId] = [];
    return newstate;
  }
  default: return state;
  }
};
