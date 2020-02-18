import Button from '@material-ui/core/Button';
import React from 'react';
import {history} from '../../../_helpers/history';

const SignInButton = () => {
  return (
    <Button variant="contained" color="primary" onClick={redirectToSignIn} data-test="signInButton">Sign In</Button>
  );
};

const redirectToSignIn = () => {
  history.push('/signin');
};

export default SignInButton;
