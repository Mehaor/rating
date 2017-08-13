import * as React from 'react';
import LeftPanel from './LeftPanel';
import TopPanel from './TopPanel';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import LoginPage from './LoginPage';
import {getUserFromJwt} from '../redux/actions/actionsUser';
import {setIsDesktop} from '../redux/actions/actionsScreen';
import {SIZES} from '../constants';

class Base extends React.Component<any, any> {

    constructor() {
        super();
        this.setScreen = this.setScreen.bind(this);
    }

    componentDidMount() {
        this.props.getUser();
        this.setScreen();
        window.addEventListener('resize', this.setScreen);
    }

    setScreen() {
        
        let isDesktop: boolean = window.innerWidth >= 768;
        if (isDesktop != this.props.screen.isDesktop) {
            this.props.setScreen(isDesktop);
        }
    }

    render() {
        let {user, screen} = this.props;
        if (!user) {
            return <LoginPage />;
        }
        let marginLeft: string = screen.isDesktop ? (SIZES.LEFT_PANEL_SIZE + 10) + 'px' : '0';
        return (<div style={{marginLeft: marginLeft}}>
            <LeftPanel />
            <TopPanel />
            <div id="content" style={{maxWidth: SIZES.MAX_CONTENT_WIDTH + 'px', margin: '10px auto 0 auto'}}>
            {this.props.children}
            </div>
            
            
        </div>)
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        screen: state.screen,
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        // login: () => {dispatch(loginUser())},
        setScreen: (isDesktop: boolean) => {dispatch(setIsDesktop(isDesktop))},
        getUser: () => {dispatch(getUserFromJwt())}
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Base));