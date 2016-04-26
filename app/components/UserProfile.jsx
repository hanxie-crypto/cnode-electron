/**
 * 个人简介
 */
import React from 'react';
import { connect } from 'react-redux';
import LeftNav from 'material-ui/lib/left-nav';
import { Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import IconButton from 'material-ui/lib/icon-button';
import Profile from 'material-ui/lib/svg-icons/social/people';
import * as profileaction from '../actions/profileaction';
import * as loginaction from '../actions/loginaction';
import Avatar from 'material-ui/lib/avatar';
import MenuItem from 'material-ui/lib/menus/menu-item';


class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.openProfile = this.openProfile.bind(this);
        this.isopen = false;
    }
    getStyle() {
        return {
            
        }
    }
    openProfile() {
        const openprofile = this.props.openprofile;
        if(openprofile === true){
            let closeaction = profileaction.closeProfile();
            this.props.dispatch(closeaction);
        }else {
            let openaction = profileaction.openProfile();
            this.props.dispatch(openaction); 
           
        }
        
    }
    closeProfile() {
        let closeaction = profileaction.closeProfile();
        this.props.dispatch(closeaction);
        this.isopen = false;
    }  
    logOut() {
        let logOut = loginaction.logOut();
        this.props.dispatch(logOut);
        this.closeProfile();
        const history = createBrowserHistory();
        //history.push('/');
        history.go(-1);
        if(window.getMessageTimmer){
            clearInterval(window.getMessageTimmer);
        }
        if(window && typeof window.logoutsuccess === 'function'){
            window.logoutsuccess();
        }
    } 
    render() {
        const styles = this.getStyle();
        const {openprofile,user} = this.props;
        return(
            <div style={this.props.style}>
                <LeftNav open={openprofile} onRequestChange ={this.closeProfile.bind(this)} docked={false} style={{paddingTop: 30}}>
                        <MenuItem style={{textAlign:'center'}}>
                            <Link to='/' >
                                <Avatar src={user.avatar_url} /> 
                            </Link>
                        </MenuItem>
                        <MenuItem style={{textAlign:'center'}}>{user.loginname}</MenuItem>
                        <MenuItem style={{textAlign:'center'}}><Link to={`/usercollect/${user.loginname}`} >我的收藏 </Link></MenuItem>
                        {user.accesstoken?<MenuItem style={{textAlign:'center'}} onTouchTap={this.logOut.bind(this)}>退出登录</MenuItem>:null}
                </LeftNav>
                <div>
                    <IconButton tooltip="用户信息" onTouchTap={this.openProfile} >
                           <Profile />
                    < /IconButton>
                </div>
            </div>
        )
    }
} 

function mapStateToProps(state) {
  return {
    openprofile: state.userprofile.openprofile,
    user: state.login.user,
  };
}

export default connect(mapStateToProps)(UserProfile);