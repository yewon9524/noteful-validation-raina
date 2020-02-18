import React from 'react'

class Errorboundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return error
    }

    render() {
        if (this.state.hasError) {      
            return (
                <div className="error">
                <h1>Error! Something went wrong</h1>
                </div>
            )
        }
        return this.props.children;
    }  
}

export default Errorboundary