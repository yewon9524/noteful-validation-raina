import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import ValidateError from '../ValidateError'
import './AddNote.css'


export default class AddNote extends Component {
    state = {
        name: '',
        nameTouched: false,
        content: '',
        contentTouched: false,
        folder: '',
        folderId: 'b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1',
        folderTouched: false
    }

    static contextType = ApiContext

    updateName = (name) => {
        this.setState({
            name: name,
            nameTouched: true
        })
    }

    updateContent = (content) => {
        this.setState({
            content: content,
            contentTouched: true
        })
    }

    updateFolder = (folder) => {
        this.setState({
            folder: folder[folder.selectedIndex].value,
            folderId: folder[folder.selectedIndex].id,
            folderTouched: true
        })
    }
        
    validateName =() => {
        const name = this.state.name.trim();
        if(name.length === 0) {
            return 'Please enter the title'
        } else if (name.length > 15) {
            return 'The name must be 15 characters or less'
        }
    }

    validateContent = () => {
        const content = this.state.content.trim();

        if(content.length === 0) {
            return 'Please enter the content'
        } else if (content.length > 100) {
            return 'The content must be 100 characters or less'
        }
    }

    validateFolder = () => {
        if (!this.state.folder) {
            return 'select folder'
        }
    }

    handleAddNote (event) {
        event.preventDefault();
        const { name, content, folderId } = this.state

        const data = {
            name,
            content,
            folderId,
            modified: new Date()
        }

        fetch(`${config.API_ENDPOINT}/notes`, {
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
            this.context.addNote(data);
            this.props.history.push('/');
        })
        .catch(err => {
            console.log(err.message);
        });
        }

    folderList = () => {
        const folders = this.context.folders;

        return folders.map(folder => {
            return (<option key={folder.id} id={folder.id} value={folder.name}>{folder.name}</option>);
        });
    }

    render() {
        return (
            <form className='AddNote' onSubmit={event => this.handleAddNote(event)}>
                <h2>+ Note</h2>

                <div className='note-title'>
                    <label htmlFor='name'>NoteName</label>
                    <input 
                        type='text' 
                        className='note-name' 
                        onChange={event => this.updateName(event.target.value)} required />
                    {this.state.nameTouched && <ValidateError message={this.validateName()} />}
                </div>

                <div className='note-content'>
                    <label htmlFor='name'>Content</label>
                    <input 
                        type='text' 
                        className='note-content' 
                        onChange={event => this.updateContent(event.target.value)} required />
                    {this.state.contentTouched && <ValidateError message={this.validateContent()} />}
                </div>

                <div>
                    <label>Folder destiniation</label>
                    <select 
                        value={this.state.folder}
                        onChange={event => {this.updateFolder(event.target)}}>
                        {this.folderList()}
                    </select>
                    {this.state.contentTouched && <ValidateError message={this.validateFolder} />}
                </div>

                <div className='AddNote-button-group'>
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