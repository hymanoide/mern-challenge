import callApi from '../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const ADD_IMAGE_TO_POST = 'ADD_IMAGE_TO_POST;'

// Export Actions
export function addPost(post) {
    return {
        type: ADD_POST,
        post,
    };
}

export function addPostRequest(post, username) {
    return (dispatch) => {
        return callApi('posts', 'post', {
            post: {
                name: post.name,
                title: post.title,
                content: post.content,
                author: username,
            },
        }).then(res => dispatch(addPost(res.post)));
    };
}

export function addPosts(posts) {
    return {
        type: ADD_POSTS,
        posts,
    };
}

export function fetchPosts() {
    return (dispatch) => {
        return callApi('posts').then(res => {
            dispatch(addPosts(res.posts));
        });
    };
}

export function fetchPost(cuid) {
    return (dispatch) => {
        return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
    };
}

export function deletePost(cuid) {
    return {
        type: DELETE_POST,
        cuid
    };
}

export function deletePostRequest(cuid, loggedUser) {
    return (dispatch) => {
        return callApi(`posts/${cuid}`, 'delete', {user: loggedUser}).then(() => dispatch(deletePost(cuid)));
    };
}

/** Media of post **/

export function addImageToPost(cuid) {
    return {
        type: ADD_IMAGE_TO_POST,
        cuid
    };
}

export function addImageToPostRequest(cuid, file) {
    return (dispatch) => {
        return callApi(`upload/${cuid}`, 'post', {file: {cuid: cuid, content: file}}).then(() => {
            dispatch(addImageToPost(cuid));
        });
    };
}
