import * as React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import {connect} from 'react-redux';

export default class LoginPage extends React.Component<any, any> {

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <h2>Войдите</h2>
                <a className="vk" href="/auth/vk"><FontIcon className="fa fa-vk" /></a>
            </div>)
    }
}
