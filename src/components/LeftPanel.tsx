import * as React from 'react';
import {Drawer, MenuItem} from 'material-ui';
import AppBar from 'material-ui/AppBar';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setLeftPanelOpen} from '../redux/actions/actionsLeftPanel';
import {SIZES} from '../constants';


class LeftPanel extends React.Component<any, any> {

    render() {
        let {open, isDesktop, setOpen} = this.props;
        return (
            <Drawer open={isDesktop || open} docked={isDesktop} width={SIZES.LEFT_PANEL_SIZE} onRequestChange={setOpen}>
                <AppBar style={isDesktop ? {display: 'none'} : {}} onLeftIconButtonTouchTap={setOpen.bind(this, false)} />
                <Link to="/"><MenuItem focusState={'focused'}>Общий рейтинг</MenuItem></Link>
                <Link  to="/my"><MenuItem focusState={'focused'} rightIcon={null}>Мой рейтинг</MenuItem></Link>
                <a href="/logout"><MenuItem>Выйти</MenuItem></a>
            </Drawer>)
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        isDesktop: state.screen.isDesktop,
        open: state.leftPanel.open
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setOpen: (open: boolean) => {dispatch(setLeftPanelOpen(open))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);