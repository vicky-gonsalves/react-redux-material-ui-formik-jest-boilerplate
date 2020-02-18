import {withStyles} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import SignInButton from '../../_components/buttons/SignInButton/SignInButton';
import Footer from '../../_components/footer/footer';
import Navbar from '../../_components/navbar/navbar';
import config from '../../config';

const useStyles = theme => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto'
  },
});


export class PublicPage extends Component {
  render() {
    const {classes, isLoggedIn, tokens} = this.props;
    const userLoggedIn = isLoggedIn && tokens !== null;
    if (userLoggedIn) {
      return (<Redirect to="/home"/>);
    }
    return (
      <React.Fragment>
        <CssBaseline/>
        <div data-test="publicPageContainer">
          <Navbar appName={config.appName} data-test="navbarComponent"/>
          <main className={classes.main}>
            {/* Hero unit */}
            <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom data-test="appName">
                  {config.appName}
                </Typography>
                <Typography variant="h6" align="center" color="textSecondary" paragraph data-test='message'>
                  This is restricted site. If you have credentials please proceed with Sign In else please EXIT.
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <SignInButton data-test="signInButtonComponent"/>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </div>
          </main>
          {/* Footer */}
          <footer className={classes.footer}>
            <Footer appName={config.appName} data-test="footerComponent"/>
          </footer>
          {/* End footer */}
        </div>
      </React.Fragment>
    );
  }
}

PublicPage.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {isFetching, isLoggedIn, tokens} = state.user;
  return {isFetching, isLoggedIn, tokens};
}

const connectedPublicPage = connect(mapStateToProps, null)(PublicPage);

export default withStyles(useStyles)(connectedPublicPage);
