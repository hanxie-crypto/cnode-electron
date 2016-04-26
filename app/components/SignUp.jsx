import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

import { connect } from 'react-redux';
import CircleLoading from './CircleLoading';


class  SignUp extends React.Component {

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
               signup
            </div>);
  }
}
SignUp.propTypes = {
  
};

function mapStateToProps(state) {
  return {
    
  };
}

export default connect(mapStateToProps)( SignUp);
