import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import {useSelector} from "react-redux";


const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const PostCreateWidget = ({addPost, showAddPost}) => {

    const loggedUser = useSelector(state => state.users.loggedUser)
    const [state, setState] = useState({name: loggedUser}); // initialize with username
    const classes = useStyles();


    const submit = () => {
        if (state.name && state.title && state.content) {
            addPost(state);
        }
    };

    const handleChange = (evt) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value,
        });
    };

    return (
        <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
            <h3>Create new post</h3>
            <TextField variant="filled" label="Author name" name="name" onChange={handleChange}
                       defaultValue={loggedUser} disabled={loggedUser}/>
            <TextField variant="filled" label="Post title" name="title" onChange={handleChange}/>
            <TextField variant="filled" multiline minRows={4} label="Post content" name="content"
                       onChange={handleChange}/>

            {showAddPost ?
                <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()}
                        disabled={!state.name || !state.title || !state.content}>
                    Submit
                </Button>
                :
                <>
                    {/*TODO: Implement icon library or install Mui Icons libs.*/}
                    <span>&#9888; <em>You need an account to submit posts</em></span>
                </>

            }

        </div>
    );
};

PostCreateWidget.propTypes = {
    addPost: PropTypes.func.isRequired
};

export default PostCreateWidget;
