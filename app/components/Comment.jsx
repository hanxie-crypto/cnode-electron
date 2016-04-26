/**
 * 评论
 */

import React from 'react';
import { connect } from 'react-redux';
import Favorite from 'material-ui/lib/svg-icons/toggle/star-border';
import Replay from 'material-ui/lib/svg-icons/communication/chat';
import * as topicaction from '../actions/topicaction';
import {MarkdownEditor} from 'react-markdown-editor';
import RaisedButton from 'material-ui/lib/raised-button';
class  Comment extends React.Component {

  constructor(props) {
    super(props);
  }


  componentDidMount() {
    /*const {dispatch,topicdetail,accesstoken} = this.props;
    const getTopicDetail = topicaction.getTopicDetail(topicdetail.id,accesstoken);
    dispatch(getTopicDetail);*/
  }
  getStyles() {
        const styles = {
            wrapper: {
                width: '100%',
            },
            title: {
              boxSizing: 'border-box',
              backgroundColor:'#fff',
              borderBottom: '1',
              borderRight: '0',
              borderLeft: '0',
              borderTop: '0',
              borderStyle: 'solid',
              borderColor: '#ccc',
              marginTop: '20',
              paddingTop: '15',
              paddingBottom: '15',
              position: 'relative',
            },
            replaytop: {
                padding: '10',
                backgroundColor: '#f6f6f6',
                borderTopRightRadius: '3',
                borderTopLeftRadius: '3',
                fontSize: '14'
            },
            replylist: {
                width: '100%',
                paddingLeft: '0',
                listStyle: 'none',
                marginTop: '0',
            },
            replyitem: {
              width: '100%',
              paddingTop: '10',
              paddingBottom: '10',
              boxSizing: 'border-box',
              borderColor: '#ccc',
              borderBottomWidth: '1',
              borderTopWidth: '0',
              borderLeftWidth: '0',
              borderRightWidth: '0',
              borderStyle: 'solid',
              position: 'relative',
              minHeight: '67',

            },
            contenttitle: {
              width: '100%',
              fontSize: '12',
              paddingLeft: '50',
              paddingRight: '50',
            },
            contenttext: {
              width: '100%',
              fontSize: '15',
              paddingLeft: '50',
              paddingRight: '50',
            },
            contentreplay: {
              width: '100%',
              paddingLeft: '50',
              paddingRight: '50',
            },
            avator: {
              width: 30,
              height: 30,
              borderRadius: '5',
              position: 'absolute',
              left: '10',
              top: '10',
            },
            good: {
              position: 'absolute',
              right: 40,
              top: 10,
            },
            replay: {
              position: 'absolute',
              right: 0,
              top: 10,
            }

            
        };
        return styles;
  }
  prise(replayid) {
    const accesstoken = this.props.accesstoken;
    let priseobj = this.refs[replayid];
    let prisenum = +priseobj.innerHTML;
    const replayUps = topicaction.replayUps(replayid,accesstoken);
    replayUps.then(function(data){
      if(data.action === 'down'){
         prisenum -= 1;
      }
      if(data.action === 'up') {
         prisenum += 1;
      }
      priseobj.innerHTML = prisenum;
    })
  }
  toggleReplay(rpid) {
    let replayobj = this.refs[rpid];
    if(replayobj.style.display === 'none') {
      replayobj.style.display = 'block';
    }
    else {
      replayobj.style.display = 'none';
    }
  }
  replayParent(mkreplayid,replay_id,initContent,topicid) {
    const rpid = mkreplayid.replace(/mkreplayid/g,'rpid');
    const mkdowned = this.refs[mkreplayid];
    const {accesstoken,dispatch} = this.props;
    let data ={};
    data.accesstoken = accesstoken;
    data.content = mkdowned.getContent();
    data.reply_id = replay_id;
    dispatch(topicaction.addReply(topicid,data));
    dispatch(topicaction.getTopicDetail(topicid,accesstoken));
    mkdowned.setContent(initContent);
    this.refs[rpid].style.display = 'none';
  }
  render() {
    const {loading,topicdetail} = this.props;
    const topiccomment = topicdetail.replies;
    const styles = this.getStyles();
    let flowindex = 0;
    const replaylist =  topiccomment ? topiccomment.map((replay, key) => {
           flowindex++;
           let replydatestr = replay.create_at.replace(/T/g,' ').replace(/Z/g,'');
           replydatestr = replydatestr.substr(0,replydatestr.lastIndexOf('.'));
    const initContent = '@' + replay.author.loginname;
    const rpid = 'rpid' + replay.id;
    const mkreplayid = 'mkreplayid' + replay.id;

    return (<li  style={styles.replyitem} key={key}>
                       <img  style={styles.avator} src={replay.author.avatar_url}/>
                       <div style={styles.contenttitle}>
                        {replay.author.loginname} {flowindex}楼•创建于{replydatestr} 
                          <div style={styles.good} onTouchTap={this.prise.bind(this,replay.id)}>
                            <Favorite /> 
                            <span ref={replay.id} >{replay.ups.length}</span>
                          </div>
                          <div style={styles.replay} >
                            <Replay onTouchTap={this.toggleReplay.bind(this,rpid)}/> 
                          </div>
                        </div>
                       <div style={styles.contenttext} dangerouslySetInnerHTML={{__html: replay.content}}></div>
                       <div style={{display:'none'}} ref={rpid}>
                          <MarkdownEditor initialContent={initContent} ref={mkreplayid} iconsSet="font-awesome" style={{height:30}}/>
                          <RaisedButton label="回复" secondary={true}   onTouchTap={this.replayParent.bind(this,mkreplayid,replay.id,initContent,topicdetail.id)}/>
                       </div>
                    </li>)}): null;
    return (
        <div style={styles.wrapper}> 
            <div style={{marginTop:30}}>
                <h1 style={styles.replaytop}>{topicdetail.reply_count}回复</h1>
                <ul style={styles.replylist}>
                    {replaylist}
                </ul>
            </div>
        </div>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    accesstoken: state.login.user.accesstoken,
  };
}

export default connect(mapStateToProps)(Comment);