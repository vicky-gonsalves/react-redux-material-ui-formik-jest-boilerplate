import {act} from '@testing-library/react';
import checkPropTypes from 'check-prop-types';
import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './../_reducers';


const findByDataAttr = (component, attr) => {
  return component.find(`[data-test='${attr}']`);
};

const findByDataAttrWhenMounted = (component, attr) => {
  return component.find(`[data-test='${attr}']`).hostNodes();
};

const checkProps = (component, expectedProps) => {
  return checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
};

const testStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
};

const wait = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

const updateFormikField = async (
  nativeFieldWrapper,
  targetName,
  value
) => {
  // simulate focus event
  await act(async () => {
    nativeFieldWrapper.simulate('focus');
  });
  // updates values and errors
  await act(async () => {
    nativeFieldWrapper.simulate('change', {
        persist: () => {
        }, target: {name: targetName, value}
      }
    );
  });
  // updates touched
  await act(async () => {
    nativeFieldWrapper.simulate('blur', {
        persist: () => {
        }, target: {name: targetName}
      }
    );
  });

  await wait(0);
};

const clickFormikCheckbox = async (nativeFormWrapper, targetName, checked) => {
  await act(async () => {
    nativeFormWrapper.simulate('change', {
      persist: () => {
      }, target: {
        checked: checked,
        name: targetName
      }
    });
  });
  await wait(0);
};

const submitFormikForm = async (nativeFormWrapper, elements = {}) => {
  await act(async () => {
    nativeFormWrapper.simulate('submit', {
      preventDefault: () => {
      }, ...elements
    });
  });
  await wait(0);
};

const clickButton = async (nativeButtonWrapper) => {
  await act(async () => {
    nativeButtonWrapper.simulate('click', {
      preventDefault: () => {
      }
    });
  });
  await wait(0);
};

const mockSuccesfulResponse = (
  status = 200,
  method = 'GET',
  returnBody = {}
) => {
  global.fetch = jest.fn().mockImplementationOnce(() => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        status,
        text: () => {
          return Promise.resolve(returnBody ? returnBody : {});
        },
      });
    });
  });
};

const mockErrorResponse = (
  status = 400,
  method = 'GET',
  returnBody = {}
) => {
  global.fetch = jest.fn().mockImplementationOnce(() => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: false,
        status,
        text: () => {
          return Promise.resolve(returnBody ? returnBody : {});
        },
      });
    });
  });
};


module.exports = {
  findByDataAttr,
  checkProps,
  testStore,
  findByDataAttrWhenMounted,
  wait,
  updateFormikField,
  clickFormikCheckbox,
  submitFormikForm,
  clickButton,
  mockSuccesfulResponse,
  mockErrorResponse
};
