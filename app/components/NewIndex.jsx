
import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import { connect } from 'react-redux';
import CircleLoading from './CircleLoading';
import MainTopic from './MainTopic';

class  Intex extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {getMainTopic} = this.props;
    getMainTopic();
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
            }
            
        };
        return styles;
  }
  render() {
    const {loading,maintopic,changeNav,getTopicByType} = this.props;
    const styles = this.getStyles();
    return ( 
            <div>
              <div  style={{display:loading,width:'100%',height:'100%',position:'fixed',zIndex:'2',backgroundColor:'black',top:'0',left:'0',right:'0',bottom:'0',opacity: '0.5'}}>
                <div style={{display:loading,width: '100',height: '100',marginLeft:'auto',marginRight:'auto',marginTop: '20%'}}>
                  <CircleLoading />
                </div>
              </div>
              <div style={styles.wrapper}>
                 <div style={styles.leftpart}>
                    <MainTopic changeNav={changeNav} getTopicByType={getTopicByType}/>
                 </div>
              </div>
            </div>);
  }
}
Intex.propTypes = {
  
};

function mapStateToProps(state) {
  return {
    loading: state.maintopic.loading,
    maintopic: state.maintopic.maintopic
  };
}

export default connect(mapStateToProps)( Intex);
