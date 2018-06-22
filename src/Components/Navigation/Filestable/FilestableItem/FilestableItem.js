import React, { Component } from 'react';

import './FilestableItem.css';

class FilestableItem extends Component {
    state = {
        edit_name: false,
        is_selected: false,
    }

    handleEditNameClick = () => {
        this.setState(prevState => ({
            edit_name: true
        }));
    }

    handleCancelEditNameClick = () => {
        this.setState(prevState => ({
            edit_name: false
        }));
    }

    handleSubmitEditNameClick = () => {
        this.setState(prevState => ({
            edit_name: false
        }));
    }

    handleSelectClick = () => {
        this.setState(prevState => ({
            is_selected: !prevState.is_selected
        }));
    }

    render() {
        const { edit_name, is_selected } = this.state
        return (
            <li className="filestable_content_item">
                <div className="filestable_content_item_select" onClick={this.handleSelectClick}><i className="material-icons">{is_selected? "check_box":(this.props.file.type === "dir"? "folder_open":"insert_drive_file")}</i></div>
                <div className="filestable_content_item_name">{this.props.file.name}</div>
                <div className="filestable_content_item_icons">
                    {this.props.file.type !== "dir" && <a className="filestable_content_item_icons_item"><i className="material-icons">file_download</i></a> }
                    {edit_name === false && <button className="filestable_content_item_icons_item" onClick={this.handleEditNameClick}><i className="material-icons">mode_edit</i></button>}
                    {edit_name === true  && <button className="filestable_content_item_icons_item" onClick={this.handleSubmitEditNameClick}><i className="material-icons">done</i></button>}
                    {edit_name === true  && <button className="filestable_content_item_icons_item" onClick={this.handleCancelEditNameClick}><i className="material-icons">clear</i></button>}
                </div>
                <div className="filestable_content_item_lastupdate">{this.props.file.last_modif}</div>
                <div className="filestable_content_item_size">{typeof this.props.file.size === undefined? <span>-</span>:this.props.file.size}</div>
            </li>
        );
    }
}

export default FilestableItem;