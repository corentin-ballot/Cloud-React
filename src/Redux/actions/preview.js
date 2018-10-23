export const ADD_PREVIEW_FILE = 'ADD_PREVIEW_FILE';
export const REMOVE_PREVIEW_FILE = 'REMOVE_PREVIEW_FILE';
export const REQUEST_PREVIEW_CONTENT = 'REQUEST_PREVIEW_CONTENT';
export const RECEIVE_PREVIEW_CONTENT = 'RECEIVE_PREVIEW_CONTENT';
export const UPDATE_PREVIEW_TAB = 'UPDATE_PREVIEW_TAB';

export function previewFile(file) {
    return function action(dispatch) {
        dispatch(addPreviewFile(file));
        fetch("http://localhost/web/app.php/api/cloud/filecontent?fileurl=" + file.url, {method: 'GET'})
          .then(response => response.json())
          .then((json) => dispatch(receivePreviewContent(file, json)))
    }
}

export function closePreviewFile(url) {
    return {
        type: REMOVE_PREVIEW_FILE,
        url
    }
}

function addPreviewFile(file) {
    return {
        type: ADD_PREVIEW_FILE,
        file
    }
}

function receivePreviewContent(file, json) {
    return {
        type: RECEIVE_PREVIEW_CONTENT,
        json,
        file
    }
}

export function selectPreview(index) {
    return {
        type: UPDATE_PREVIEW_TAB,
        index
    }
}