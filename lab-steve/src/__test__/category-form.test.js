import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow, mount} from 'enzyme';
import CategoryForm from '../components/category/category-form/category-form';
require('jest');

configure({ adapter: new Adapter() });

describe('<CategoryForm />', function () {
  describe('Shallow Mounting', () => {
    beforeAll(() => {
      let wrapper = shallow(<CategoryForm />);
      this.wrapper = wrapper;
    });
    afterAll(() => this.wrapper.unmount());

    it('should render a category form component', () => {
      expect(this.wrapper.length).toBe(1);
      expect(this.wrapper.find('.category-form').length).toBe(1);
    });

    it('should have a default state object with a name property assigned an empty string', () => {
      expect(this.wrapper.state().name).toEqual('');
    });

    it('should have a default state object with a budget property assigned an empty string', () => {
      expect(this.wrapper.state().budget).toEqual('');
    });

    it('should change the state object when name form input is provided', () => {
      let event = {
        target: {
          name: 'name',
          value: 'fakecategory',
        },
      };
      this.wrapper.find('.category-form .category-name-input').simulate('change', event);
      expect(this.wrapper.state().name).toEqual('fakecategory');
    });

    it('should change the state object when budget form input is provided', () => {
      let event = {
        target: {
          name: 'budget',
          value: '1000',
        },
      };
      this.wrapper.find('.category-form .category-budget-input').simulate('change', event);
      expect(this.wrapper.state().budget).toEqual('1000');
    });
  });

  describe('Full Mounting', () => {
    beforeAll(() => {
      this.wrapper = mount(<CategoryForm />);
      this.wrapper.setProps({ onComplete: jest.fn() });
    });
    afterAll(() => this.wrapper.unmount());

    it('should reset the state.name value to empty string on form submit', () => {
      this.wrapper.setState({ name: 'bleh' });
      expect(this.wrapper.state().name).toEqual('bleh');
      this.wrapper.simulate('submit', { preventDefault: () => {} });
      expect(this.wrapper.state().name).toEqual('');
    });

    it('should reset the state.budget value to empty string on form submit', () => {
      this.wrapper.setState({ budget: '1000' });
      expect(this.wrapper.state().budget).toEqual('1000');
      this.wrapper.simulate('submit', { preventDefault: () => {} });
      expect(this.wrapper.state().budget).toEqual('');
    });

    it('should have called onComplete in the previous assertion', () => {
      expect(this.wrapper.props().onComplete).toHaveBeenCalled();
    });
  });
});
