import React from 'react';
import Badge from 'material-ui/lib/badge';
import IconButton from 'material-ui/lib/icon-button';
import NotificationsIcon from 'material-ui/lib/svg-icons/social/notifications';
import { connect } from 'react-redux';
import * as messageaction from '../actions/messageaction';
import { Link } from 'react-router';

class Message extends React.Component {

    constructor(props) {
        super(props);
        this.accesstoken = '';
    }
    findUserMessageAndCount() {
        const {dispatch} = this.props;
        const accesstoken = this.props.accesstoken || this.accesstoken; 
        this.accesstoken = accesstoken;
        if(accesstoken) {
            const getMessageCount = messageaction.getMessageCount(accesstoken);
            dispatch(getMessageCount);
            const getUserMessage = messageaction.getUserMessage(accesstoken);
            dispatch(getUserMessage);
        }
    }
    componentWillMount() {
        this.findUserMessageAndCount();
    }
    componentDidMount() {
        const accesstoken = this.props.accesstoken;
        if(accesstoken !==''){
           window.getMessageTimmer = setInterval(this.findUserMessageAndCount.bind(this),5000);//隔5秒请求
        }
       
    } 
    render() {  
        const count = this.props.count;
        return  <Link to='/usermessage'><Badge
                    badgeContent={count}
                    primary={true}
                    style = {{paddingTop: 0,paddingRight: 0,paddingLeft: 10,paddingRight:10,top:6}}
                    badgeStyle={{top: 0,right: 0}}>
                    <IconButton tooltip="消息">
                        <NotificationsIcon/>
                    < /IconButton>
                </Badge></Link>
    }
}


function mapStateToProps(state) {
  return {
      accesstoken: state.login.user.accesstoken,
      count: state.message.count,
  };
}

export default connect(mapStateToProps)(Message);