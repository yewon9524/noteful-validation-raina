import React from 'react'

export default class ValidateError extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: true
        };
    }

    static getDerivedStateFromError(error) {
    return { hasError: true };
    }

    render() {
        if (this.state.hasError) {      
          return (
            <div className="validation_error">{this.props.message}</div>
          );
        }
        return this.props.children;
      }  


}