import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

import { connect } from 'react-redux';
import CircleLoading from './CircleLoading';


class  About extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
   
  }
  getStyles() {
        const styles = {
            wrapper: {
                width: '1150',
                marginLeft: 'auto',
                marginRight: 'auto',
            },
            leftpart: {
                width: '842',
                float:'left',
                marginRight: '10',
            },
            
        };
        return styles;
  }
  render() {
   
    return ( 
            <div>
                about
            </div>);
  }
}
About.propTypes = {
  
};

function mapStateToProps(state) {
  return {
    
  };
}

export default connect(mapStateToProps)( About);
