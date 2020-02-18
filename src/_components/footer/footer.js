import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Toaster from '../toaster';

class Footer extends Component {
  render() {
    const {appName} = this.props;
    return (
      <React.Fragment>
        <div data-test="footer">
          <Typography variant="body2" color="textSecondary" align="center" data-test="copyright">
            {'Copyright © '}
            <Link color="inherit" href="/" data-test="link">
              {appName}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </div>
        <Toaster data-test="toaster"/>
      </React.Fragment>
    );
  }
}

Footer.propTypes = {
  appName: PropTypes.string
};

export default Footer;
