import React, { Component } from 'react';

import { connect } from 'react-redux'

import './Zip.css';
import ReadableOctets from '../../Conversion/ReadableOctets/ReadableOctets';
import ReadableDate from '../../Conversion/ReadableDate/ReadableDate';

class Zip extends Component {

    state = { zip: [] }

    process(entries) {
        console.log(entries);
        let array = [];
        let contents = [];
        for (const entry of entries) {
            if (!entry.directory) {
                let splitname = entry.filename.split(/\/(?=[^\/]+$)/);
                // create file obj
                let file = { name: splitname[splitname.length - 1], type: "file", size: entry.uncompressedSize, mtime: entry.lastModDateRaw * 100000, entry };
                // create dir if needed
                if (splitname.length > 1 && typeof contents[splitname[0]] === "undefined")
                    createDir(splitname[0]);
                // add file obj to parent dir
                splitname.length > 1 ? contents[splitname[0]].push(file) : array.push(file);
            }
        }
        this.setState({ zip: array });


        function createDir(dirname) {
            let splitname = dirname.split(/\/(?=[^\/]+$)/);

            // create dir obj
            let dir = { name: splitname[splitname.length - 1], type: "dir", content: [] };
            // save content attribute reference
            contents[dirname] = dir.content;
            // create dir if needed
            if (splitname.length > 1 && typeof contents[splitname[0]] === "undefined")
                createDir(splitname[0]);
            // add dir obj to parent dir
            splitname.length > 1 ? contents[splitname[0]].push(dir) : array.push(dir);
        }
    }

    tmp() {
        let _this = this;
        // use a BlobReader to read the zip from a Blob object
        window.zip.createReader(new window.zip.BlobReader(this.props.file.blob), function (reader) {

            // get all entries from the zip
            reader.getEntries(function (entries) {
                if (entries.length) {
                    _this.process(entries);
                }
            });

            // Close reader after 30 seconds
            window.setTimeout(function () { reader.close(); }, 30000);
        }, function (error) {
            // onerror callback
        });
    }

    componentWillMount() {
        this.tmp();
    }

    render() {
        return (
            <div className="cloud_preview_panel_item_container">
                {this.state.zip.map((e) => (
                    (e.type === "dir" && <ZipDir dir={e} />) || <ZipFile file={e} />
                ))}
            </div>
        );
    }
}

class ZipDir extends Component {

    state = {
        expanded: false
    }

    handleClick = () => {
        this.setState((prevState) => ({ expanded: !prevState.expanded }));
    }

    render() {
        return (
            <div aria-expanded={this.state.expanded} className="cloud_preview_panel_item_zip_dir">
                <button className="cloud_preview_panel_item_zip_dir_infos" onClick={this.handleClick}>
                    <span className="cloud_preview_panel_item_zip_dir_infos_icon"><i className="material-icons">{this.state.expanded ? "folder_open" : "folder"}</i></span>
                    <span className="cloud_preview_panel_item_zip_dir_infos_name">{this.props.dir.name}</span>
                </button>
                <div className="cloud_preview_panel_item_zip_dir_content">
                    {this.props.dir.content.map((e) => (
                        (e.type === "dir" && <ZipDir dir={e} />) || <ZipFile file={e} />
                    ))}
                </div>
            </div>
        );
    }
}

class ZipFile extends Component {
    // handleClick() {
    //     this.props.file.entry.getData(new window.zip.TextWriter(), function (text) {
    //         console.log(text);
    //         //reader.close();
    //     })
    // }

    render() {
        return (
            // <div className="cloud_preview_panel_item_zip_file" onClick={this.handleClick.bind(this)}>
            <div className="cloud_preview_panel_item_zip_file" onClick={this.handleClick.bind(this)}>

                <span className="cloud_preview_panel_item_zip_file_icon"><i className="material-icons">insert_drive_file</i></span>
                <span className="cloud_preview_panel_item_zip_file_name">{this.props.file.name}</span>
                <ReadableOctets className="cloud_preview_panel_item_zip_file_size">{this.props.file.size}</ReadableOctets>
                <ReadableDate className="cloud_preview_panel_item_zip_file_mtime">{this.props.file.mtime}</ReadableDate>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps)(Zip);