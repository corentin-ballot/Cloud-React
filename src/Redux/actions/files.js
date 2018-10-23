export const RECEIVE_FILE_LIST = 'RECEIVE_FILE_LIST';
export const REQUEST_FILE_LIST = 'REQUEST_FILE_LIST';
export const ENABLE_FILE_EDIT_NAME = 'ENABLE_FILE_EDIT_NAME';
export const DISABLE_FILE_EDIT_NAME = 'DISABLE_FILE_EDIT_NAME';
export const TOGGLE_SELECT_FILE = 'TOGGLE_SELECT_FILE';
export const SELECT_ALL_FILES = 'SELECT_ALL_FILES';
export const DISPLAY_NEW_DIR = 'DISPLAY_NEW_DIR';
export const DISPLAY_NEW_FILE = 'DISPLAY_NEW_FILE';
export const HIDE_NEW_DIR = 'HIDE_NEW_DIR';
export const HIDE_NEW_FILE = 'HIDE_NEW_FILE';

function pathToBreadcrumb(path) {
    return (path.slice(-1)==='/'? path.substring(0, path.length - 1):path).split('/').map((item, index, array) => {
        return {route:array.filter((x, y) => y <= index).join('/'), folderName: item}
    });
}

function requestFileList(path) {
    console.log('requestFileList', path)
    return {
        type: REQUEST_FILE_LIST,
        breadcrumb: pathToBreadcrumb(path),
        path
    }
}

function receiveFileList(json) {
    return {
        type: RECEIVE_FILE_LIST,
        fileList: json.dirs.map((e,i,a) => {e.type='dir'; return e;}).concat(json.files)
    };
}

export function fetchFileList(path) {
    return function action(dispatch) {
        dispatch(requestFileList(path));

        return fetch(`http://localhost/web/app.php/api/cloud/navigate?path=${path}`)
            .then(response => response.json())
            .then(json => dispatch(receiveFileList(json)));
    }
}

export function toggleFileSelect(file) {
    return {
        type: TOGGLE_SELECT_FILE,
        file
    }
}

export function selectAllFiles(selectStatus) {
    return {
        type: SELECT_ALL_FILES,
        selectStatus
    }
}

export function enableFileEditName(file) {
    return {
        type: ENABLE_FILE_EDIT_NAME,
        file
    }
}

export function disableFileEditName(file) {
    return {
        type: DISABLE_FILE_EDIT_NAME,
        file
    }
}

export function displayNewDir() {
    return {
        type: DISPLAY_NEW_DIR,
    }
}

export function displayNewFile() {
    return {
        type: DISPLAY_NEW_FILE,
    }
}

export function hideNewDir() {
    return {
        type: HIDE_NEW_DIR,
    }
}

export function hideNewFile() {
    return {
        type: HIDE_NEW_FILE,
    }
}

export function submitNewDir(path, name) {
    console.log("submitNewDir", path, name);
    return function action(dispatch) {
        dispatch(hideNewDir());
        return fetch('http://localhost/web/app.php/api/cloud/newfolder', {
            method: 'POST',
            body: JSON.stringify({foldername: name, path: path})
        }).then(() => {
            dispatch(fetchFileList(path));
        });
    }
}

export function submitNewFile(path, name) {
    console.log("submitNewFile", path, name);
    return function action(dispatch) {
        dispatch(hideNewFile());
        return fetch('http://localhost/web/app.php/api/cloud/newfile', {
            method: 'POST',
            body: JSON.stringify({filename: name, path: path})
        }).then(() => {
            dispatch(fetchFileList(path));
        });
    }
}

export function renameFile(file, newUrl){
    return function action(dispatch) {
        return fetch("http://localhost/web/app.php/api/cloud/renamefile?fileurl=" + file.url + "&newurl=" + newUrl, {method: 'GET'})
            .then(function(res){
            return res.json();
            })
            .then(() => dispatch(fetchFileList(file.url.replace(file.name, ''))));
    }
}

export function uploadFiles(files, path) {
    return function action(dispatch) {
        dispatch(fetchFileList(path));
        files.forEach(file => {
            let data = new FormData();
            data.append('path', path);
            data.append('file', file);

            fetch('http://localhost/web/app.php/api/cloud/uploadfile', {
                method: 'POST',
                body: data
            }).then(() => dispatch(fetchFileList(path)));
        });
    }
}