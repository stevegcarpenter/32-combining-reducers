import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow, mount} from 'enzyme';
import ExpenseForm from '../components/expense/expense-form/expense-form';
require('jest');

configure({ adapter: new Adapter() });

describe('<ExpenseForm />', function () {
  describe('Shallow Mounting', () => {
    beforeAll(() => {
      let wrapper = shallow(<ExpenseForm />);
      this.wrapper = wrapper;
    });
    afterAll(() => this.wrapper.unmount());

    it('should render a expense form component', () => {
      expect(this.wrapper.length).toBe(1);
      expect(this.wrapper.find('.expense-form').length).toBe(1);
    });

    it('should have a default state object with a name property assigned an empty string', () => {
      expect(this.wrapper.state().name).toEqual('');
    });

    it('should have a default state object with a cost property assigned an empty string', () => {
      expect(this.wrapper.state().cost).toEqual('');
    });

    it('should change the state object when name form input is provided', () => {
      let event = {
        target: {
          name: 'name',
          value: 'fakeexpense',
        },
      };
      this.wrapper.find('.expense-form .expense-name-input').simulate('change', event);
      expect(this.wrapper.state().name).toEqual('fakeexpense');
    });

    it('should change the state object when cost form input is provided', () => {
      let event = {
        target: {
          name: 'cost',
          value: '1000',
        },
      };
      this.wrapper.find('.expense-form .expense-cost-input').simulate('change', event);
      expect(this.wrapper.state().cost).toEqual('1000');
    });
  });

  describe('Full Mounting', () => {
    beforeAll(() => {
      this.wrapper = mount(<ExpenseForm />);
      this.wrapper.setProps({ onComplete: jest.fn() });
    });
    afterAll(() => this.wrapper.unmount());

    it('should reset the state.name value to empty string on form submit', () => {
      this.wrapper.setState({ name: 'bleh' });
      expect(this.wrapper.state().name).toEqual('bleh');
      this.wrapper.simulate('submit', { preventDefault: () => {} });
      expect(this.wrapper.state().name).toEqual('');
    });

    it('should reset the state.cost value to empty string on form submit', () => {
      this.wrapper.setState({ cost: '1000' });
      expect(this.wrapper.state().cost).toEqual('1000');
      this.wrapper.simulate('submit', { preventDefault: () => {} });
      expect(this.wrapper.state().cost).toEqual('');
    });

    it('should have called onComplete in the previous assertion', () => {
      expect(this.wrapper.props().onComplete).toHaveBeenCalled();
    });
  });
});
