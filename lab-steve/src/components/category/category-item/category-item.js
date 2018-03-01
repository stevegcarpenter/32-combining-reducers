import React from 'react';
import { connect } from 'react-redux';
import { renderIf } from '../../../lib/utils';
import CategoryForm from '../category-form/category-form';
import { categoryUpdate, categoryDelete } from '../../../actions/category-actions';
import { expenseCreate } from '../../../actions/expense-actions';
import ExpenseForm from '../../expense/expense-form/expense-form';
import ExpenseItem from '../../expense/expense-item/expense-item';

class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editmode: false,
    };

    // Binding Handlers
    Object.getOwnPropertyNames(CategoryItem.prototype)
      .filter(prop => prop.startsWith('handle'))
      .map(prop => this[prop] = this[prop].bind(this));
  }

  handleDelete() {
    this.props.categoryItemDelete(this.props.category);
  }

  handleEditMode() {
    this.setState({ editmode: !this.state.editmode });
  }

  render() {
    return (
      <div className='category-item'>
        <h4>Category: {this.props.category.name}</h4>
        <p>Budget: {this.props.category.budget}</p>
        <button onClick={this.handleDelete}>Delete</button>
        <button onClick={this.handleEditMode}>Edit</button>
        {renderIf(this.state.editmode,
          <CategoryForm
            category={this.props.category}
            buttonText='Update'
            onComplete={this.props.categoryItemUpdate}
          />
        )}
        <h5>Add an Expense</h5>
        <ExpenseForm
          buttonText='Create'
          categoryId={this.props.category._id}
          onComplete={this.props.expenseItemCreate}
        />
        {renderIf(this.props.expenses[this.props.category._id].length,
          this.props.expenses[this.props.category._id].map(exp => (
            <ExpenseItem
              key={exp._id}
              expense={exp}
            />
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  expenses: state.expenses,
});

// import action creators and attach them to props
const mapDispatchToProps = (dispatch, getState) => ({
  categoryItemDelete: category => dispatch(categoryDelete(category)),
  categoryItemUpdate: category => dispatch(categoryUpdate(category)),
  expenseItemCreate: expense => dispatch(expenseCreate(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
