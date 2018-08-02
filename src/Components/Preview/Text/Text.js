import React, { Component } from 'react';

import './Text.css';

class Text extends Component {

    handleSaveClick = () => {
        fetch("http://localhost/web/app.php/api/cloud/savetextfile", {method: 'POST', body: JSON.stringify({fileurl: this.props.file.url, content: this.content.value})});
    }

    handleValueChange = () => {
        this.props.file.preview.content = this.content.value;
        this.setState({});
    }

    render() {
        return (
            <div>
                <textarea className="cloud_preview_panel_item_textedit" ref={el => this.content=el} defaultValue={this.props.file.preview.content} onChange={this.handleValueChange}></textarea>
                <button className="cloud_preview_panel_item_savebutton" onClick={this.handleSaveClick}>Save</button>
            </div>
        );
    }
}

export default Text;