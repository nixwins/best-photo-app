import React from 'react';
import AuthController from '../auth-controller';

const AppHeader = ({onLogin})=> {

        return (
            <div className="app-header">
                <div className="auth-controller">
                    <AuthController onLogin={onLogin} />
                </div>
                <div className="profile">

                </div>
            </div>
        )
}

export default AppHeader;