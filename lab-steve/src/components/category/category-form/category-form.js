import React from 'react';

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.category
      ? this.props.category
      : {
        name: '',
        budget: '',
      };

    // Binding Handlers
    Object.getOwnPropertyNames(CategoryForm.prototype)
      .filter(prop => prop.startsWith('handle'))
      .map(prop => this[prop] = this[prop].bind(this));
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
    this.setState({ name: '', budget: '' });
  }

  render() {
    return (
      <form className="category-form" onSubmit={this.handleSubmit}>
        <input
          className='category-name-input'
          type='text'
          name='name'
          placeholder='name'
          value={this.state.name}
          onChange={this.handleChange}
        />

        <input
          className='category-budget-input'
          type='number'
          name='budget'
          placeholder='budget'
          value={this.state.budget}
          onChange={this.handleChange}
        />

        <button type='submit'>{this.props.buttonText}</button>
      </form>
    );
  }
}

export default CategoryForm;
