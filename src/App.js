import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router';
import {Route, Router, Switch} from 'react-router-dom';
import {history} from './_helpers/history';
import './App.scss';
import ForgotPasswordPage from './modules/Auth/ForgotPassword/ForgotPasswordPage';
import SignInPage from './modules/Auth/SignIn/SignInPage';
import HomePage from './modules/Home/HomePage';
import NotFoundPage from './modules/NotFound/NotFoundPage';
import PublicPage from './modules/Public/PublicPage';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }
}));


function App() {
  const classes = useStyles();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn && state.user.tokens !== null);

  const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
      isLoggedIn === true
        ? <Component {...props} />
        : <Redirect to='/signin'/>
    )}/>
  );

  return (
    <Container maxWidth={false} disableGutters={true} className={classes.root}>
      <Router history={history}>
        <Switch>
          <Route path='/' component={PublicPage} exact/>
          <Route path='/signin' component={SignInPage}/>
          <Route path='/forgot-password' component={ForgotPasswordPage}/>
          <PrivateRoute path='/home' component={HomePage}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
