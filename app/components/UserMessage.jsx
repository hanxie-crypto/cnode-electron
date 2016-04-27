/**
 * 用户消息
 */
import React from 'react';
import {connect} from 'react-redux';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import Divider from 'material-ui/lib/divider';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import * as messageaction from  '../actions/messageaction'; 
import * as topicaction from '../actions/topicaction';


class UserMessage extends React.Component {
    
    constructor(props) {
        super(props);
        //this.accesstoken = '';
    }
    findUserMessage() {
        const {dispatch} = this.props;
        const accesstoken = this.props.accesstoken || this.accesstoken; 
        this.accesstoken = accesstoken;
        if(accesstoken) {
            const getUserMessage = messageaction.getUserMessage(accesstoken);
            dispatch(getUserMessage);
        }
    }
    componentWillMount() {
        //this.findUserMessage();
    }
    markAll() {
        const {dispatch,accesstoken} = this.props;
        const markAll = messageaction.markAll(accesstoken);
        dispatch(markAll);
    }
    openDetail(topicid) {
        const accesstoken = this.props.accesstoken;
        const gettopicdetail = topicaction.getTopicDetail(topicid,accesstoken);
        this.props.dispatch(gettopicdetail);

    }
    render() {
        const {usermessage} = this.props;
        const has_read_messages = usermessage.has_read_messages;
        const hasnot_read_messages = usermessage.hasnot_read_messages;
        const redmessage = has_read_messages?has_read_messages.map((obj,key)=>{
            return <TableRow key={key} onTouchTap={this.openDetail.bind(this,obj.topic.id)} striped={true}>
                        <TableRowColumn>{obj.author.loginname}</TableRowColumn>
                        <TableRowColumn>回复了你的问题:</TableRowColumn>
                        <TableRowColumn>{obj.topic.title}</TableRowColumn>
                    </TableRow>
        }):null;
        const notredmessage = hasnot_read_messages?hasnot_read_messages.map((obj,key)=>{
             return <TableRow key={key} onTouchTap={this.openDetail.bind(this,obj.topic.id)} >
                        <TableRowColumn>{obj.author.loginname}</TableRowColumn>
                        <TableRowColumn>回复了你的问题:</TableRowColumn>
                        <TableRowColumn>{obj.topic.title}</TableRowColumn>
                    </TableRow>
        }):null;
        const  markbtn =  (hasnot_read_messages.length > 0)?(<FlatButton label="全部标记为已读" secondary={true} onTouchTap={this.markAll.bind(this)}/>):'';
        console.log(markbtn);
        return (<div style={{marginTop:80,position:'relative'}}>
                    <div style={{position:'absolute',right:10,top:15,zIndex: 1}}>{markbtn}</div>
                    <Menu desktop={true} >
                        <MenuItem primaryText="未读消息" />
                     </Menu>
                     <Divider />
                    <Table style={{marginBottom:30}}>
                        <TableBody>
                            {notredmessage}
                        </TableBody>
                    </Table>
                    <Menu desktop={true} >
                        <MenuItem primaryText="已读消息" />
                     </Menu>
                     <Divider />
                    <Table>
                        <TableBody>
                            {redmessage}
                        </TableBody>
                    </Table>
               </div>)
    }

} 

function mapStateToProps(state) {
  return {
    accesstoken: state.login.user.accesstoken,
    usermessage: state.message.usermessage,
  };
}


export default connect(mapStateToProps)(UserMessage);