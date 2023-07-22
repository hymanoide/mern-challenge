import React, {useRef, useState} from 'react';
import {CardMedia} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {useDispatch} from "react-redux";
import {addImageToPostRequest} from "../PostActions";

function PostImageWrapper({post, onDelete}) {

    const [showUploadText, setShowUploadText] = useState(false);
    const [previewImage, setPreviewImage] = useState(false);
    const fileInputRef = useRef(null); // Upload input ref

    const dispatch = useDispatch();

    const handleMouseEnter = () => {
        setShowUploadText(true);
    };

    const handleMouseLeave = () => {
        setShowUploadText(false);
    };

    const handleImageClickUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                // Convert the file to base64 string
                const base64Image = reader.result.split(',')[1];

                // Load preview image
                const imageUrl = URL.createObjectURL(file);
                setPreviewImage(imageUrl);

                dispatch(addImageToPostRequest(post.cuid, base64Image));
            };

            // Read the file as a data URL (base64) and let us launch the above onloadend
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <CardMedia
                component="img"
                alt="green iguana"
                height={showUploadText ? '200px' : post.image ? '200px' : '50px'}
                image={previewImage || post.image || "logo512.png"}
                style={{opacity: showUploadText ? '0.5' : '1', transition: 'height 0.3s ease'}}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleImageClickUpload}
            />
            {showUploadText && (
                <Typography
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleImageClickUpload}
                    style={{ // TODO: Avoid inline styles
                        position: 'relative',
                        top: showUploadText ? '-200px' : '0',
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        height: showUploadText ? '40px' : '200px'
                    }}
                >
                    Click here to change the image
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                    />
                </Typography>
            )
            }
        </>
    )
}


export default PostImageWrapper;
