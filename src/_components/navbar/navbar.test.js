import {shallow} from 'enzyme';
import React from 'react';
import {checkProps, findByDataAttr} from '../../_utils';
import config from '../../config';
import Navbar from './navbar';

const setUp = (props = {}) => {
  return shallow(<Navbar {...props}/>);
};

describe('Navbar Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedPropTypes = {
        appName: 'Home Automation'
      };

      const propsErr = checkProps(Navbar, expectedPropTypes);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Have props', () => {
    let component;
    beforeEach(() => {
      const props = {
        appName: config.appName
      };
      component = setUp(props);
    });

    it('should render without error', () => {
      const wrapper = findByDataAttr(component, 'navbar');
      expect(wrapper.length).toBe(1);
    });

    it('should render app name on navbar', () => {
      const appName = findByDataAttr(component, 'appName');
      expect(appName.length).toBe(1);
      expect(appName.text()).toBe(config.appName);
    });

    it('should render toolbar', () => {
      const appName = findByDataAttr(component, 'toolbar');
      expect(appName.length).toBe(1);
    });

    it('should render icon on navbar', () => {
      const appName = findByDataAttr(component, 'icon');
      expect(appName.length).toBe(1);
    });
  });
});

