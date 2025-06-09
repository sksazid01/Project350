import React from 'react';
import App from '../../App';

const BlankLayout = ({ children }) => {
    return (
        <App>
            <div className="text-white-dark min-h-screen">{children}</div>
        </App>
    );
};

export default BlankLayout;