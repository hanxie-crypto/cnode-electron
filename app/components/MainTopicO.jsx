import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class  MainTopic extends React.Component {

  constructor(props) {
    super(props);
  }
  getStyles() {
        const styles = {
           navlist: {
              width: '842',
              height: '40',
              padding: '10',
              backgroundColor: '#f6f6f6',
              borderTopLeftRadius: '3',
              borderTopRightRadius: '3',
              listStyle: 'none',
              boxSizing: 'border-box',
              marginTop: 10,
              marginBottom: 0,
           },
           actnav: {
              float: 'left',
              backgroundColor: '#80bd01',
              color: '#fff',
              padding: '3',
              borderRadius: '3',
              marginRight: '10',
              cursor: 'pointer',
           },
           navitem: {
              float: 'left',
              marginRight: '10',
              padding: '3',
              color: '#80bd01',
              cursor: 'pointer',
           },
            
        };
        return styles;
  }
  handleClick(type) {
    this.props.changeNav(type);
    this.props.getTopicByType(type);
  }
  render() {
    const styles = this.getStyles();
    const topiclist =  this.props.maintopic.data ? this.props.maintopic.data.map((topic, key) => {
        let _url = '/topicdtail/' + topic.id;
        var content = '('+topic.reply_count + '/'+topic.visit_count + ') ' +topic.title;
        return (
         <Link to={_url} activeStyle={{ color: 'red' }} style={{textDecoration:'none'}} key = {key}>
          <ListItem
                  primaryText={content}
                  leftAvatar={<Avatar src={topic.author.avatar_url} />}/></Link>)}): null;
    const {all,good,share,ask,job} = this.props.navlink;
    return (
      <div> 
        <ul style={styles.navlist}>
             <li style={all?styles.actnav:styles.navitem} onClick={this.handleClick.bind(this,'all')} >全部</li>
             <li style={good?styles.actnav:styles.navitem} onClick={this.handleClick.bind(this,'good')}>精华</li>
             <li style={share?styles.actnav:styles.navitem} onClick={this.handleClick.bind(this,'share')}>分享</li>
             <li style={ask?styles.actnav:styles.navitem} onClick={this.handleClick.bind(this,'ask')}>问答</li>
             <li style={job?styles.actnav:styles.navitem} onClick={this.handleClick.bind(this,'job')}>招聘</li>
        </ul> 
        <List>
          {topiclist}
        </List>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    maintopic: state.maintopic.maintopic,
    navlink: state.maintopic.navlink
  };
}

export default connect(mapStateToProps)(MainTopic);