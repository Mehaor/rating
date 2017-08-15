import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {} from 'react-router';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Base from './components/Base';
import Index from './components/Index';
import MyRating from './components/MyRating';
import OverallRating from './components/OverallRating';
import {Users} from './components/shared/User';
import {connect, Provider} from 'react-redux';
import {store} from './redux/reducers/reducers';
import {MuiThemeProvider} from 'material-ui/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500} from 'material-ui/styles/colors';
import {WEEKDAY_PRIMARY_COLORS} from './constants';

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

function getPrimaryColor(): string {
    return WEEKDAY_PRIMARY_COLORS[(new Date()).getDay()] || cyan500;
}

const muiTheme = getMuiTheme({
    palette: {
        // textColor: cyan100,
        primary1Color: getPrimaryColor(),
    }
});

class App extends React.Component<any, any> {

    componentDidMount() {

    }

    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <BrowserRouter>
                    <Base>
                        <Switch>
                            <Route exact path="/" component={OverallRating} />
                            <Route exact path="/my" component={MyRating} />
                            <Route path="/u/:username" component={Users} />
                            <Route path="/u" component={Users} />
                        </Switch>
                    </Base>
                    </BrowserRouter>
                </MuiThemeProvider>
            </Provider>
            );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));