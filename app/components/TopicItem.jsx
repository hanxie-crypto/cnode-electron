/**
 * 帖子列表
 */
import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import FlatButton from 'material-ui/lib/flat-button';
import Colors from 'material-ui/lib/styles/colors';
import * as topicaction from '../actions/topicaction';
import { connect } from 'react-redux';
import moment from 'moment';
export default class TopicItem extends React.Component{
    constructor(props) {
        super(props);
    }
    getStyles() {
        return {
            item : {
                float:'left',
                marginRight:'20',
                marginBottom:'20',
                width:'330',
            },
            subtitle: {
                width:'220',
                overflow:'hidden',
                textOverflow : 'ellipsis',
                whiteSpace : 'nowrap', 
            },
        }
    }
    openDetail(topicid) {
        const accesstoken = this.props.accesstoken;
        const gettopicdetail = topicaction.getTopicDetail(topicid,accesstoken);
        this.props.dispatch(gettopicdetail);
       /* const opentopicdetail = topicaction.openTopicDetail();
        this.props.dispatch(opentopicdetail);*/

    }
    tabMap(tab) {
        switch(tab) {
            case 'share':
            return '分享';
            break;
            case 'job':
            return '招聘';
            break;
            case 'ask':
            return '问答';
            break;
            default:
            return '';
            break;
        }
    }
    render() {
        const styles = this.getStyles();
        const {topic} = this.props;
        const topcontent = topic.top?'置顶':this.tabMap(topic.tab);
        let lastreply = new moment(topic.last_reply_at).startOf('day').fromNow().replace('ago','前').replace('hours','小时').replace('days','天');  
        let content = '('+topic.reply_count + '/'+topic.visit_count + ') ' + topcontent ;
        let desc = '最近回复于'+ lastreply+'(点击查看详情)';
        let avatar = topic.author.avatar_url.replace(/^\/\//g,'http://');
        return(
            <Card style={styles.item}>
                <CardHeader
                  title={content}
                  titleColor = {topic.top?Colors.cyan500:'grey'}
                  subtitle={topic.title}
                  avatar={avatar}
                  subtitleStyle={styles.subtitle}
                />
                <CardActions>
                    <FlatButton label={desc}  onTouchTap={this.openDetail.bind(this,topic.id)} />
                </CardActions>
            </Card>);
    }
}
function mapStateToProps(state) {
  return {
    accesstoken: state.login.user.accesstoken,
  };
}

export default connect(mapStateToProps)(TopicItem);