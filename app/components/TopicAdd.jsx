/**
 * 增加帖子
 */
import React from 'react';
import { connect } from 'react-redux';
import LeftNav from 'material-ui/lib/left-nav';

import IconButton from 'material-ui/lib/icon-button';
import BackHome from 'material-ui/lib/svg-icons/navigation/arrow-back';
import {MarkdownEditor} from 'react-markdown-editor';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';
import * as themetypeaction from '../actions/themetypeaction';
import * as snackbaraction from '../actions/snackbaraction';
import * as topicaction from '../actions/topicaction';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import RaisedButton from 'material-ui/lib/raised-button';
import { Link } from 'react-router';

class TopicAdd extends React.Component {
    constructor(props) {
        super(props);

        this.topicdata= {
            accesstoken:'',
            title:'',
            tab:'',
            content:'',
        }
    }
    getStyle() {
        const styles = {
            topicwrapper: {
                marginTop: 84,
                width: '80%',
                marginLeft: 'auto',
                marginRight: 'auto',
            },
            homebtn: {
                position:'fixed',
                right: 50,
                top: 80,
            }
        };
        return styles;
    }
    showMessage(message) {
        const openSnackBar = snackbaraction.openSnackBar(message);
        this.props.dispatch(openSnackBar);
    }
    handleContentChange(value) {
      this.topicdata.content = value;
    }
    handleTypeChange(event, index, value) {
         this.topicdata.tab = value;
         const changeThemeType = themetypeaction.changeThemeType(value);
         this.props.dispatch(changeThemeType);
    }
    handleTileChange(event) {
        this.topicdata.title = event.target.value;
    }
    addTopic() {
        this.topicdata.accesstoken = this.props.accesstoken;
        if(this.topicdata.accesstoken === '') {
            this.showMessage('请登录');
            return;
        }
        if(this.topicdata.tab === '') {
            this.showMessage('请选择标题');
            return;
        }
        if(this.topicdata.title === '') {
            this.showMessage('请输入标题');
            return;
        }
        if(this.topicdata.content=== '') {
            this.showMessage('请输入内容');
            return;
        }
        this.props.dispatch(topicaction.addTopic(this.topicdata));
    }
    render() {
        const styles = this.getStyle();
        const {themetype,accesstoken} = this.props;
        if(accesstoken){
            return(
            <div style={styles.topicwrapper}>
                <Link to='/'>
                    <div style={styles.homebtn}>
                        <FloatingActionButton secondary={true} >
                          <BackHome  />
                        </FloatingActionButton>
                    </div>
                </Link>
                <div>
                    <SelectField  value={themetype} onChange={this.handleTypeChange.bind(this)}>
                        <MenuItem value='' primaryText="请选择"/>
                        <MenuItem value='job' primaryText="招聘"/>
                        <MenuItem value='share' primaryText="分享"/>
                        <MenuItem value='ask' primaryText="问答"/>
                    </SelectField>
                </div>
                <div>
                    <TextField hintText="标题字数10个以上" onChange={this.handleTileChange.bind(this)}/>
                </div>
                <MarkdownEditor initialContent="" iconsSet="font-awesome"  onContentChange={this.handleContentChange.bind(this)}/>

                <div style={{textAlign:'center',marginTop: 20}}>
                    <RaisedButton label="提交" secondary={true}  onTouchTap = {this.addTopic.bind(this)} />
                </div>
            </div>
        );
        }else {
            return (<div></div>);
        
     }
    }
} 

function mapStateToProps(state) {
  return {
    themetype: state.themetype.themetype,
    accesstoken: state.login.user.accesstoken,
  };
}

export default connect(mapStateToProps)(TopicAdd);