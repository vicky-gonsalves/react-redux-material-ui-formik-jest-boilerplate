import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actions} from '../../_actions/user.actions';

export class Toaster extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidUpdate() {
    if (!!this.props.loginError && !this.state.open) {
      this.setState({open: true});
    }
  }

  handleClose(event, reason) {
    this.props.setLoginError(null);
    this.setState({open: false});
  }

  render() {
    const {loginError} = this.props;
    const {open} = this.state;
    return (
      <Snackbar
        data-test="toaster"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        message={loginError}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose} data-test="closeButton">
              <CloseIcon fontSize="small"/>
            </IconButton>
          </React.Fragment>
        }
      />
    );
  }
}

function mapState(state) {
  const {loginError} = state.user;
  return {loginError};
}

const actionCreators = {
  setLoginError: actions.setLoginError
};
const connectedToaster = connect(mapState, actionCreators)(Toaster);


export default connectedToaster;
