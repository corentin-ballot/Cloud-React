import React, { Component } from 'react';

class FilestableNewFileItem extends Component {
    render() {
        return (
            <li className="filestable_content_item">
                <div className="filestable_content_item_select"><i className="material-icons">insert_drive_file</i></div>
                <form className="filestable_content_item_name">
                    <input name="newfile" className="filestable_content_item_name_rename" type="text" placeholder="New file name" />
                </form>
                <div className="filestable_content_item_icons">
                    <button className="filestable_content_item_icons_item"><i className="material-icons">done</i></button>
                    <button className="filestable_content_item_icons_item"><i className="material-icons">clear</i></button>
                </div>
                <div className="filestable_content_item_lastupdate"></div>
                <div className="filestable_content_item_size"></div>
            </li>
        );
    }
}

export default FilestableNewFileItem;