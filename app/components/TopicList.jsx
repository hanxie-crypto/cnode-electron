/**
 * 主页
 */
import React from 'react';
import { connect } from 'react-redux';

import TopicItem from './TopicItem';




class  TopicList extends React.Component {

  constructor(props) {
    super(props);
  }
  getStyles() {
        const styles = {
            wrapper: {
                width: '1150',
                marginTop:'120',
                marginLeft: 'auto',
                marginRight: 'auto',
            },
            
        };
        return styles;
  }

  render() {
    const styles = this.getStyles();
    const {topiclist,dispatch} = this.props;
    const topiccomponent=  topiclist.length>0?topiclist.map((topic, key) => {
        return <TopicItem topic={topic} key={key} dispatch={dispatch}/>;
    }):null;
    return (
          <div style={styles.wrapper}> 
            {topiccomponent}
          </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    topiclist: state.maintopic.topiclist,
  };
}

export default connect(mapStateToProps)(TopicList);