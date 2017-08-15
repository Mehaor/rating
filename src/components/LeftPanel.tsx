import * as React from 'react';
import {Drawer, MenuItem} from 'material-ui';
import AppBar from 'material-ui/AppBar';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setLeftPanelOpen} from '../redux/actions/actionsLeftPanel';
import {SIZES} from '../constants';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';

class LeftPanel extends React.Component<any, any> {

    render() {
        let {open, isDesktop, setOpen} = this.props;
        return (
            <Drawer open={isDesktop || open} docked={isDesktop} width={SIZES.LEFT_PANEL_SIZE} onRequestChange={setOpen}>
                <AppBar onLeftIconButtonTouchTap={setOpen.bind(this, false)} showMenuIconButton={!isDesktop} />
                <Link to="/"><MenuItem leftIcon={<FontIcon className="fa fa-list-ol" />} focusState={'focused'}>Общий</MenuItem></Link>
                <Link  to="/my"><MenuItem leftIcon={<FontIcon className="fa fa-heart" />} focusState={'focused'} rightIcon={null}>Мой рейтинг</MenuItem></Link>
                <Divider />
                <a href="/logout"><MenuItem leftIcon={<FontIcon className="fa fa-sign-out" />}>Выйти</MenuItem></a>
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