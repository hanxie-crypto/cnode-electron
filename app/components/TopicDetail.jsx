/**
 * 帖子详情
 */

import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import Comment from './Comment';
import AuthorProfile from './AuthorProfile';

import {MarkdownEditor} from 'react-markdown-editor';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import Profile from 'material-ui/lib/svg-icons/action/favorite';
import RaisedButton from 'material-ui/lib/raised-button';
import * as topicaction from '../actions/topicaction';
import * as snackbaraction from '../actions/snackbaraction';
import * as collectaction from '../actions/collectaction';

class TopicDetail extends React.Component {
    constructor(props) {
        super(props);
        this.replay ={
            content :'',
            accesstoken:'',
        }
    }

    closeDetail() {
        const closetopicdetail = topicaction.closeTopicDetail();
        this.props.dispatch(closetopicdetail);
    }
    handleContentChange(value) {
      this.replay.content = value;
    }
    addReply(topicid){
        if(this.replay.content === ''){
             dispatch(snackbaraction.openSnackBar('请先输入内容'));
             return;
        }
        const {dispatch,accesstoken} = this.props;
        if(!accesstoken){
            dispatch(snackbaraction.openSnackBar('请先登录'));
            return;
        }
       
        this.replay.accesstoken = accesstoken;
        dispatch(topicaction.addReply(topicid,this.replay));
        dispatch(topicaction.getTopicDetail(topicid,accesstoken));
        if(this.refs.mkeditor){
            this.refs.mkeditor.setContent('');//
        }

    }
    collect(topicid) {
        const accesstoken = this.props.accesstoken;
        const data = {topic_id:topicid,accesstoken:accesstoken};
        const collect = collectaction.collect(data);
        this.props.dispatch(collect);
    }
    decollect(topicid) {
        const accesstoken = this.props.accesstoken;
        const data = {topic_id:topicid,accesstoken:accesstoken};
        const decollect = collectaction.decollect(data);
        this.props.dispatch(decollect);
        const name = this.props.username;
        const getTopicListByName = topicaction.getTopicListByName(name);
        this.props.dispatch(getTopicListByName);

    }
    render() {
        const {openmodal,topicdetail,iscollect,islogin} = this.props;
        const actions = [
                <FlatButton
                    label="关闭"
                    secondary={true}
                    onTouchTap={this.closeDetail.bind(this)}
                />];
        const titledesc = topicdetail.title;
        let topiccontent = topicdetail?topicdetail.content.replace(/https:/g,'').replace(/http:/g,''):'';
        topiccontent = topiccontent.replace(/\/\//g,'http://');
        return(
            <Dialog
                title={titledesc}
                modal={false}
                titleStyle = {{fontSize: 20,height:15}}
                actions = {actions}
                open={openmodal}
                autoDetectWindowHeight = {false}
                autoScrollBodyContent = {true}
                onRequestClose={this.closeDetail.bind(this)}
                bodyStyle={{width:'100%',height:'100%'}}
                contentStyle={{width:'100%',maxWidth: 'none',maxHeight:'none'}}>
                <div style={{width: '60%',float:'left',position:'relative'}}>

                    <div style={{position:'absolute',right:-30,top: -30}}>
                        {iscollect?
                        <IconButton tooltip="已收藏" onTouchTap={this.decollect.bind(this,topicdetail.id)}  >
                           <Profile color={Colors.red500}/>
                        < /IconButton>:<IconButton tooltip="收藏" onTouchTap={this.collect.bind(this,topicdetail.id)}>
                           <Profile />
                        < /IconButton>}
                    </div>
                    <div  dangerouslySetInnerHTML={{__html: topiccontent}} style={{width:'100%'}}></div>
                    <Comment topicdetail={topicdetail} />
                    {islogin?<div><MarkdownEditor ref="mkeditor" initialContent="" iconsSet="font-awesome" onContentChange={this.handleContentChange.bind(this)}/>
                    <div style={{textAlign:'right',marginTop: 20}}>
                        <RaisedButton label="回复" secondary={true}  onTouchTap = {this.addReply.bind(this,topicdetail.id)}  />
                        </div></div>:null};
                </div>
                <div style={{width: '30%',float:'right',paddingRight: 50,paddingTop:0}}>
                    {topicdetail?<AuthorProfile authorname={topicdetail.author.loginname} />:null}
                </div>
            </Dialog>
            );
    }

}

function mapStateToProps(state) {
  return {
    topicdetail: state.detailtopic.topicdetail,
    openmodal: state.detailtopic.openmodal,
    accesstoken: state.login.user.accesstoken,
    islogin: state.login.islogin,
    iscollect: state.detailtopic.iscollect,
    username: state.login.user.loginname,
  };
}

export default connect(mapStateToProps)(TopicDetail);