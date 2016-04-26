import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import AddTopicBtn from './AddTopicBtn';//发帖

import UserProfile from './UserProfile';//用户简介
import Login from './Login';
import TopicDetail from './TopicDetail'; //帖子详情
import Message from './Message';
import * as loginaction from '../actions/loginaction';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.openLogin = this.openLogin.bind(this);
    }
    componentWillMount(){
        if(window && typeof window.getloginconfig ==='function'){
           const config = window.getloginconfig();
           if(config.islogin === true){
                const  getAccessSuccess = loginaction.getAccessSuccess(config.user);
                this.props.dispatch(getAccessSuccess);
           }
        }
    }
    openLogin() {
        const openLogin = loginaction.openLogin();
        this.props.dispatch(openLogin);
    }
    getStyles() {
        const styles = {
            appBar: {
                position: 'fixed',
                top: 0,
                left: 0,
                right:0,
            },
            nodeIcon: {
                width: '120',
                display: 'block',
                float: 'left',
                marginTop: '6',
                marginRight: '10',
            },
            searchText: {
                width: '230',
                height: '45',
                color: '#fff',
            },
            hTagWrapper: {
                paddingLeft: '40'
            }
        };
        return styles;
    }
    render() {
        const styles = this.getStyles();
        const islogin = this.props.islogin;
        const leftPart = (
                        <div style={styles.hTagWrapper}>
                            <img src="http://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" style={styles.nodeIcon}/>
                        </div>
                );
                const rightPart = islogin?(<div>
                        <UserProfile style={{marginTop: '6',float:'left'}}/>
                        <AddTopicBtn style={{marginTop: '6',float:'left'}}/>
                        <Message />
                </div>) :(
                <div>
                    <FlatButton
                        label="登录"
                        keyboardFocused={true}
                        onTouchTap = {this.openLogin}
                        style={{marginTop: '6',float:'left'}}/>
                </div>
);
        return(
                <div>
                    <TopicDetail/>
                    <AppBar
                        style={styles.appBar}
                        title=""
                        iconElementLeft={leftPart}
                        iconElementRight={rightPart}/>
                     <Login />
                </div>
        );
    }

}

Header.propTypes = {
    
}

function mapStateToProps(state) {
  return {
    islogin: state.login.islogin,
  };
}

export default connect(mapStateToProps)(Header);