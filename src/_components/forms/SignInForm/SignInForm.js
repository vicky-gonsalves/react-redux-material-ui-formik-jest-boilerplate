import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {withFormik} from 'formik';
import React from 'react';
import {connect} from 'react-redux';
import * as yup from 'yup';
import {actions} from '../../../_actions';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

const SimpleSignInForm = props => {
  const classes = useStyles();
  const {
    touched,
    errors,
    handleChange,
    handleBlur,
    isFetching,
    handleSubmit,
    onSubmit
  } = props;

  return (
    <form className={classes.form} onSubmit={typeof onSubmit === 'function' ? onSubmit : handleSubmit} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        type="email"
        name="email"
        autoComplete="email"
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isFetching}
        error={errors.email && touched.email}
        helperText={(errors.email && touched.email) && errors.email}
        data-test="emailInput"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="password"
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isFetching}
        error={errors.password && touched.password}
        helperText={(errors.password && touched.password) && errors.password}
        data-test="passwordInput"
      />
      <FormControlLabel
        control={<Checkbox color="primary" id="remember" name="remember" disabled={isFetching} onChange={handleChange}/>}
        label="Remember me"
        data-test="rememberMe"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={isFetching}
        data-test="submitButton"
      >
        Sign In
      </Button>

    </form>
  );
};

export const SignInForm = withFormik({
  mapPropsToValues: () => ({email: '', password: '', remember: false}),
  validationSchema: yup.object().shape({
    email: yup.string().email().required('Please enter email address'),
    password: yup.string().required('Please enter password'),
  }),
  handleSubmit: (values, {props}) => {
    props.signIn(values);
  },
  displayName: 'signInForm'
})(SimpleSignInForm);

function mapStateToProps(state) {
  const {isFetching} = state.user;
  return {isFetching};
}

const actionCreators = {
  signIn: actions.signIn
};

export default connect(mapStateToProps, actionCreators)(SignInForm);






