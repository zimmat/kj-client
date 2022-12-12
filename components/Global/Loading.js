import React from 'react';

const Loading = (props) => {
    let { loading, children } = props
    if (!loading) return children
    return (
        <div className="d-flex justify-content-center" >
            <div className="spinner-grow text-info" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loading