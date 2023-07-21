import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget';

import {addPostRequest, deletePostRequest, fetchPosts} from '../../PostActions';
import Logo from '../../../logo.svg';

const PostListPage = ({showAddPost}) => {

    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.data);
    const loggedUser = useSelector(state => state.users.loggedUser);

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    // TODO: Maybe a good practise to extract delete and add logic outside
    const handleDeletePost = (post, author) => {
        if (author === loggedUser) {
            if (confirm('Do you want to delete this post')) { // eslint-disable-line
                dispatch(deletePostRequest(post, loggedUser));
            }
        } else {
            alert("You can't delete this post. It's from other person!")
        }
    };
    const handleAddPost = (post) => {
        dispatch(addPostRequest(post, loggedUser));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex align-items-center">
                    <img className="mx-3" src={Logo} alt="Logo" style={{height: '72px'}}/>
                    <h1 className="mt-4">
                        Alaya Blog
                    </h1>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-6">
                    <PostCreateWidget addPost={handleAddPost} showAddPost={showAddPost}/>
                </div>
                <div className="col-6">
                    <PostList handleDeletePost={handleDeletePost} posts={posts}/>
                </div>
            </div>
        </div>
    );
};

PostListPage.propTypes = {
    showAddPost: PropTypes.bool.isRequired
};


export default PostListPage;
