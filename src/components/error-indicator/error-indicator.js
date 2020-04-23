import React from "react";
import './error-indicator.css'

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <span className="boom">BOOM!<br/></span>
            <span>something has gone terrible wrong<br/></span>
            <span>(but we already sent droids to fix it)</span>
        </div>
    );
};

export default ErrorIndicator;