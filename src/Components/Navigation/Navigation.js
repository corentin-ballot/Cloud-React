import React, { Component } from 'react';

import Breadcrumb from './Breadcrumb/Breadcrumb';
import FileList from './FileList/FileList';

import './Navigation.css';

class Navigation extends Component {

    render() {
        return (
            <div className="cloud_navigation" style={this.props.style}>
                <Breadcrumb />
                <FileList />
            </div>
        );
    }
}

export default Navigation;