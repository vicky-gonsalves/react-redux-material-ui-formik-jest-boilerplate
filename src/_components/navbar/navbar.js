import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    const {appName} = this.props;
    return (
      <AppBar position="relative" data-test="navbar">
        <Toolbar data-test="toolbar">
          <BrightnessAutoIcon data-test="icon"/>
          <Typography variant="h6" color="inherit" noWrap data-test="appName">
            {appName}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  appName: PropTypes.string
};

export default Navbar;
