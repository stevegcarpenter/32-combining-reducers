import React from 'react';
import { connect } from 'react-redux';
import { renderIf } from '../../../lib/utils';
import CategoryForm from '../category-form/category-form';
import { categoryUpdate, categoryDelete } from '../../../actions/category-actions';

class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.category,
      editmode: false,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditMode = this.handleEditMode.bind(this);
  }

  handleDelete() {
    this.props.categoryItemDelete(this.state.category);
  }

  handleEditMode() {
    this.setState({ editmode: !this.state.editmode });
  }

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state,
});

const mapDispatchToProps = (dispatch, getState) => ({
  categoryItemDelete: category => dispatch(categoryDelete(category)),
  categoryItemUpdate: category => dispatch(categoryUpdate(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
