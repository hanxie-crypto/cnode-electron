/**
 * 分页
 */
import React from 'react';
import { connect } from 'react-redux';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Divider from 'material-ui/lib/divider';

import IconButton from 'material-ui/lib/icon-button';
import * as topicaction from '../actions/topicaction';
const rightPart = (
                <div>
                    <IconButton
                        style={{marginTop:'-15'}}
                        iconClassName="muidocs-icon-custom-github"
                        href="https://github.com/wq123456/cnode-electron"
                        linkButton={true}/>
                </div>
);
class Pagination extends React.Component {

    constructor(props) {
        super(props);
    }
    getStyle() {
        return {
            page: {
                position: 'fixed',
                right: '10',
                width: '80',
            },
        }
    }
    changePage(nowpage) {
        let changepage =  topicaction.getTopicList({page:nowpage});

        this.props.dispatch(changepage);
    }
    getPageination(nowpage,totalpage) {

        let pretag = null;
        let afttag = null;
        let beginindex = nowpage - 2 ;
        let endindex = nowpage + 2;
        let finalreturn = [];
        let keybegin = 1;
        if(nowpage - 2 > 1) {
            pretag = 'ok';     
        } else{
            pretag = null;
            beginindex  = 1;
        }
        if(nowpage + 2 <= totalpage) {
            afttag = 'ok'
        } else {
            afttag = null;
            endindex = totalpage;
        }
        endindex = endindex<=5?5:endindex;
        if(pretag !== null) {
            finalreturn.push(<MenuItem primaryText="..." key={keybegin}/>);
            keybegin ++;
            finalreturn.push(<Divider key={keybegin}/>);
            keybegin ++;
        }
        for(let i = beginindex;i <= endindex;i++){
            if(i === nowpage) {
                 finalreturn.push(<MenuItem primaryText={i} rightIcon={rightPart} onTouchTap={this.changePage.bind(this,i)} key={keybegin} style={{color:'red'}}/>);
             }else {
                 finalreturn.push(<MenuItem primaryText={i} onTouchTap={this.changePage.bind(this,i)} key={keybegin}/>);
            }
            keybegin ++ ;
            finalreturn.push(<Divider key={keybegin}/>);
            keybegin ++;
        }
        if(afttag !== null) {
            finalreturn.push(<MenuItem primaryText="..." key={keybegin}/>);
            keybegin ++;
            finalreturn.push(<Divider key={keybegin}/>);
        }
        return finalreturn;
    }
    render() {
        const styles = this.getStyle();
        const totalpage = 410;
        const nowpage = this.props.nowpage;
        const finalpage = this.getPageination(nowpage,totalpage);
        return (
            <div style={styles.page}>
                <Menu  desktop={true}>
                    <MenuItem primaryText="⬆️" onTouchTap={this.changePage.bind(this,1)}/>
                    <Divider />
                    {finalpage}
                    <MenuItem primaryText="⬇️" onTouchTap={this.changePage.bind(this,totalpage)} />
                    
                 </Menu>
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    nowpage: state.pageination.nowpage,
  };
}

export default connect(mapStateToProps)(Pagination);