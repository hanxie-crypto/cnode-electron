import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import { connect } from 'react-redux';
import CircleLoading from './CircleLoading';


import TopicList from './TopicList';

import Pagination from './Pagination'; //分页器
import TopicCatNav from './TopicCatNav'; //帖子分类

import * as profileaction from '../actions/profileaction';


class  Index extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const accesstoken = this.props.accesstoken;
    this.props.getTopicList();
    const closeaction = profileaction.closeProfile();
    this.props.dispatch(closeaction);
  }
  getStyles() {
        const styles = {
            wrapper: {
                width: '1150',
                marginLeft: 'auto',
                marginRight: 'auto',
            },
            
        };
        return styles;
  }
  render() {
    const {loading} = this.props;
    const styles = this.getStyles();
    return ( 
            <div>
              <div  style={{display:loading,width:'100%',height:'100%',position:'fixed',zIndex:'2',backgroundColor:'black',top:'0',left:'0',right:'0',bottom:'0',opacity: '0.5'}}>
                <div style={{display:loading,width: '100',height: '100',marginLeft:'auto',marginRight:'auto',marginTop: '20%'}}>
                  <CircleLoading />
                </div>
              </div>
              <Pagination/>
              <TopicCatNav/>
              <TopicList/>
            </div>);
  }
}
Index.propTypes = {
  
};

function mapStateToProps(state) {
  return {
    loading: state.maintopic.loading,
    accesstoken: state.login.user.accesstoken,
  };
}

export default connect(mapStateToProps)( Index);
