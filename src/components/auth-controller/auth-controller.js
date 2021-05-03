import React from 'react';
import UnSplashApiService from '../../services/unsplash-api-service';
import './auth-controller.css'

export default class AuthController extends React.Component {

    _unsplashApiService = new UnSplashApiService();
    _code = null
    _accessToken = localStorage.getItem("accessToken");

    componentDidMount() {

        if (this._code) {
            this.props.onLogin(this._code);
        }
    }

    logout = async () => {
        localStorage.removeItem("accessToken");
        window.location.href = "/"
    }

    render() {

        const authURL = this._unsplashApiService.getAuthUrl();
        this._code = (window.location.search.match(/code=([^&]+)/) || [])[1];

        if (this._accessToken) {
            return <button className="btn btn-danger" onClick={this.logout} > Logout</button >
        }

        return (
            <a href={authURL} className="btn btn-success">Login</a>
        );
    }
}