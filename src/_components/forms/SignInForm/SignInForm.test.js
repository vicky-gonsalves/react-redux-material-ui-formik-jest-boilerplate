import {createShallow} from '@material-ui/core/test-utils';
import {mount} from 'enzyme';
import faker from 'faker';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {checkProps, findByDataAttr, submitFormikForm, updateFormikField} from '../../../_utils';
import DefaultSignInForm, {SignInForm} from './SignInForm';

const mockStore = configureStore([thunk]);
const initialState = {
  user: {
    loginError: null
  }
};

const store = mockStore(initialState);

const props = {
  classes: {form: 'someprop'}
};
const email = faker.internet.email();
const password = faker.internet.password();


describe('SignInForm Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(SignInForm, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Test', () => {
    let wrapper;
    beforeEach(() => {
      const shallow = createShallow({untilSelector: 'TextField'});
      const props = {classes: {paper: 'someprop'}};
      wrapper = shallow(<SignInForm {...props}/>);
    });

    it('should have email input field', () => {
      const component = findByDataAttr(wrapper, 'emailInput');
      expect(component.length).toBe(1);
    });

    it('should show no error when first entered email input field', () => {
      const component = findByDataAttr(wrapper, 'emailInput');
      expect(component.props().error).toBeUndefined();
    });

    it('should have password input field', () => {
      const component = findByDataAttr(wrapper, 'passwordInput');
      expect(component.length).toBe(1);
    });

    it('should have remember me checkbox', () => {
      const component = findByDataAttr(wrapper, 'rememberMe');
      expect(component.length).toBe(1);
    });

    it('should have submit button', () => {
      const component = findByDataAttr(wrapper, 'submitButton');
      expect(component.length).toBe(1);
    });

  });


  describe('Component Testing', () => {
    let component;

    beforeEach(() => {
      component = mount(
        <Provider store={store}>
          <DefaultSignInForm {...props}/>
        </Provider>
      );
    });

    afterEach(() => {
      component.unmount();
      store.clearActions();
    });

    it('should error if filled invaild value in email input', async () => {
      const emailInput = component.find(`input[name="email"]`).first();
      await updateFormikField(emailInput, 'email', 'invalidEmail');
      emailInput.update();
      const formikEmailInput = findByDataAttr(component, 'emailInput').first();
      expect(formikEmailInput.props().error).toBe(true);
      expect(formikEmailInput.props().helperText).toEqual('email must be a valid email');
    });

    it('should error if empty value in email input', async () => {
      const emailInput = component.find(`input[name="email"]`).first();
      await updateFormikField(emailInput, 'email', '');
      emailInput.update();
      const formikEmailInput = findByDataAttr(component, 'emailInput').first();
      expect(formikEmailInput.props().error).toBe(true);
      expect(formikEmailInput.props().helperText).toEqual('Please enter email address');
    });

    it('should not have error if valid email value', async () => {
      const emailInput = component.find(`input[name="email"]`).first();
      await updateFormikField(emailInput, 'email', email);
      emailInput.update();
      const formikEmailInput = findByDataAttr(component, 'emailInput').first();
      expect(formikEmailInput.props().error).toBeUndefined();
    });

    it('should error if password input is empty', async () => {
      const passInput = component.find(`input[name="password"]`).first();
      await updateFormikField(passInput, 'password', '');
      passInput.update();
      const formikPassInput = findByDataAttr(component, 'passwordInput').first();
      expect(formikPassInput.props().error).toBe(true);
      expect(formikPassInput.props().helperText).toEqual('Please enter password');
    });
  });

  describe('Form Submit tests', () => {
    let component;
    const onLogin = jest.fn();
    beforeEach(() => {
      component = mount(
        <Provider store={store}>
          <SignInForm {...props} onSubmit={onLogin}/>
        </Provider>
      );
    });

    afterEach(() => {
      component.unmount();
      onLogin.mockClear();
    });
    it('should not submit form if email and password are invalid', async () => {
      const form = component.find(`form`).first();
      const emailInput = component.find(`input[name="email"]`).first();
      const passInput = component.find(`input[name="password"]`).first();
      await updateFormikField(emailInput, 'email', '');
      await updateFormikField(passInput, 'password', '');
      emailInput.update();
      passInput.update();
      await submitFormikForm(form);
      const formikEmailInput = findByDataAttr(component, 'emailInput').first();
      const formikPassInput = findByDataAttr(component, 'passwordInput').first();
      expect(onLogin).toHaveBeenCalledTimes(1);
      expect(formikEmailInput.props().error).toBe(true);
      expect(formikPassInput.props().error).toBe(true);
    });

    it('should submit form if email and password are valid', async () => {
      const form = component.find(`form`).first();
      await submitFormikForm(form, {elements: {email: email, password: password}});
      expect(onLogin).toHaveBeenCalledTimes(1);
    });
  })
});
