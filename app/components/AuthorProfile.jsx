/**
 * 个人简介
 */
import React from 'react';
import { connect } from 'react-redux';

import * as authoraction from '../actions/authoraction';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
class AuthorProfile extends React.Component {
    constructor(props) {
        super(props);
    }
    
    getStyle() {
        return {
            loginbtn: {
              position: 'fixed',
              right: '20',
              top: '580',
            },
        }
    }
    componentDidMount() {
        const {dispatch,authorname} = this.props;
        const getAuthorInfo = authoraction.getAuthorInfo(authorname);
        dispatch(getAuthorInfo);
    }
    render() {
        const styles = this.getStyle();
        const authorprofile = this.props.authorprofile;
        const scoreword = '积分:' + authorprofile.score; 
        const authrodesc = authorprofile.desc?authorprofile.desc:'';
        let avatar = authorprofile.avatar_url?authorprofile.avatar_url.replace(/^\/\//g,'http://'):'';
        return(
            <div>
                <Card>
                    <CardHeader
                        title={authorprofile.loginname}
                        subtitle= {scoreword}
                        avatar={avatar}/>
                    <CardTitle title={authrodesc} subtitle="" />
                    <CardText>
      
                    </CardText>
                    
                </Card>
            </div>
        )
    }
} 

function mapStateToProps(state) {
  return {
    authorprofile: state.author.author,
  };
}

export default connect(mapStateToProps)(AuthorProfile);