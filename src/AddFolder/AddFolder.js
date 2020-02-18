import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import ValidateError from '../ValidateError'
import './AddFolder.css'


export default class AddFolder extends Component {
    state = {
        title: '',
        touched: false
    }

    static contextType = ApiContext

    validateName() {
        const name = this.state.title.trim();
        if(name.length === 0) {
            return 'Please enter a folder name'
        } else if (name.length > 15) {
            return 'The name must be 15 characters or less'
        }
    }

    updateName(title) {
        this.setState({
            title: title,
            touched: true
        })
    }

    handleAddFolder(event) {
        event.preventDefault();
        const data = {
            name: this.state.title
        }

        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        .then(res => {
            if (!res.ok) {
                throw new Error('Error');
            }
            return res.json();
        })
        .then(data => {
            this.context.addFolder(data);
            this.props.history.push('/');
        })
        .catch(err => {
            console.log(err.message);
        });
    }
      
    render() {
        return (
            <form className='AddFolder' onSubmit={event => this.handleAddFolder(event)}>
                <h2>+ Folder</h2>

                <div className='form-group'>
                    <label htmlFor='name'>New Folder Name</label>
                    <input 
                        type='text' 
                        value={this.state.title} 
                        className='folder-name' 
                        onChange={event => this.updateName(event.target.value)} required />
                    {this.state.touched && <ValidateError message={this.validateName} />}
                </div>
                
                <div className='AddFolder-button-group'>
                    <button className='button-group' type='submit'  disabled={this.validateName()}>
                        Add
                    </button>
                    <button className='button-group' type='reset'>
                        Cancel
                    </button>
                </div>
            </form>
        )
    }
}