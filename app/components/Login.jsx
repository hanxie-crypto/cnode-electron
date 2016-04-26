
import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import Snackbar from 'material-ui/lib/snackbar';
import * as loginaction from '../actions/loginaction';
import * as snackbaraction from '../actions/snackbaraction';
class  Login extends React.Component {

  constructor(props) {
    super(props);
    this.accesstoken = '';
    this.closeLogin = this.closeLogin.bind(this);
  }
  componentDidMount() {
   
  }
  closeLogin() {
    const closeLogin = loginaction.closeLogin();
    this.props.dispatch(closeLogin);
  }
  getStyles() {
        const styles = {
            loginwrapper: {
                width: '300',
            },
            
        };
        return styles;
  }
  handleInputChange(event) {
    this.accesstoken = event.target.value.replace(/(^\s*)|(\s*$)/g, "");
  }
  validateAccessToken() {
    let accesstoken = this.accesstoken;
    const validateAccessToken = loginaction.validateAccessToken(accesstoken);
    this.props.dispatch(validateAccessToken);
  }
  handleRequestClose() {
    const closeSnackBar = snackbaraction.closeSnackBar();
    this.props.dispatch(closeSnackBar);
  }
  render() {
    const styles = this.getStyles();
    const openlogin =  this.props.openlogin;
    const {tipopen,tipinfo} = this.props;
    return ( 
            <div style={styles.loginwrapper}>
                <Dialog
                    title="登录验证"
                    modal={false}
                    open={openlogin}
                    onRequestClose = {this.closeLogin}
                    >
                    <div style = {{width: 520,marginLeft: 'auto'}}>
                        <TextField
                          hintText="请输入cnode的accesstoken"
                          onChange={this.handleInputChange.bind(this)}
                          floatingLabelText="accesstoken"/>
                        <FlatButton label="验证" secondary={true} onTouchTap={this.validateAccessToken.bind(this)}/>
                    </div>
                </Dialog>
                 <Snackbar
                   open={tipopen}
                   message={tipinfo}
                   autoHideDuration={4000}
                   onRequestClose={this.handleRequestClose.bind(this)}
                  />
            </div>);
  }
}
Login.propTypes = {
  
};

function mapStateToProps(state) {
  return {
    openlogin: state.login.openlogin,
    tipopen: state.snackbar.tipopen,
    tipinfo: state.snackbar.tipinfo,
  };
}

export default connect(mapStateToProps)( Login);
