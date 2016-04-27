/**
 * 用户收藏
 */
import React from 'react';
import TopicList from './TopicList';
import { connect } from 'react-redux';
import * as topicaction from '../actions/topicaction';
import * as profileaction from '../actions/profileaction';
class UserCollect extends React.Component {


    componentDidMount() {
       const name = this.props.params.username;
       const getTopicListByName = topicaction.getTopicListByName(name);
       this.props.dispatch(getTopicListByName);
       const closeaction = profileaction.closeProfile();
       this.props.dispatch(closeaction);
    }

    render(){
        return  <div>
                    <TopicList> </TopicList>
                </div>
    }
}
function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(UserCollect);