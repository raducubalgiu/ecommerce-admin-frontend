import React from 'react';

const SpinnerSmall = () => {
    return (
        <div className="text-center m-4">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default SpinnerSmall;