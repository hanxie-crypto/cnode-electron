/**
 * 个人简介
 */
import React from 'react';
import { connect } from 'react-redux';
import LeftNav from 'material-ui/lib/left-nav';

import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add-box';
import { Link } from 'react-router';

class AddTopicBtn extends React.Component {
    constructor(props) {
        super(props);
       
    }
    getStyle() {
        const styles = {
           topicbtn: {
              position: 'fixed',
              right: '20',
              top: '640',
              },
        };
        return styles;
    }
  
    render() {
        const styles = this.getStyle();
        return(
           <Link to='topicadd'>
            <div style={this.props.style}>
                <IconButton tooltip="发帖子"  >
                    <ContentAdd />
                < /IconButton>
            </div>
           </Link>
        )
    }
} 

function mapStateToProps(state) {
  return {
    
  };
}

export default connect(mapStateToProps)(AddTopicBtn);