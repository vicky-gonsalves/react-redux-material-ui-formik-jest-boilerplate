import {shallow} from 'enzyme';
import React from 'react';
import {findByDataAttr} from '../../_utils';
import {Toaster} from './toaster';

const props = {};

describe('Toaster Component', () => {
  describe('Store checks', () => {
    let wrapper;
    let setLoginErrorMock;
    beforeEach(() => {
      setLoginErrorMock = jest.fn();
      wrapper = shallow(<Toaster {...props} setLoginError={setLoginErrorMock}/>);
    });

    it('should render without error', () => {
      const component = findByDataAttr(wrapper, 'toaster');
      expect(component.length).toBe(1);
    });

    it('should set state open true', () => {
      wrapper.setProps({loginError: true, open: false});
      wrapper.instance().componentDidUpdate();
      expect(wrapper.props().open).toBe(true);
    });

    it('should call setLoginError and set state open to false', () => {
      wrapper.instance().handleClose();
      expect(setLoginErrorMock).toHaveBeenCalled();
      expect(wrapper.props().open).toBe(false);
    });
  });
});
