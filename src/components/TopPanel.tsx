import * as React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {SIZES} from '../constants';
import {setLeftPanelOpen} from '../redux/actions/actionsLeftPanel';
import AppBar from 'material-ui/AppBar';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class TopPanel extends React.Component<any, any> {

    setLeftPanelOpen() {
        this.props.setLeftPanelOpen(!this.props.leftPanelOpen);
    }

    render() {
        let {leftPanelOpen, setLeftPanelOpen, isDesktop, title} = this.props;
        return (<AppBar title={title}
                        showMenuIconButton={!isDesktop}
                        onLeftIconButtonTouchTap={setLeftPanelOpen.bind(this, !leftPanelOpen)} />)

    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        isDesktop: state.screen.isDesktop,
        leftPaneOpen: state.leftPanel.open,
        title: state.title,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setLeftPanelOpen: (open: boolean) => {dispatch(setLeftPanelOpen(open))},
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopPanel));