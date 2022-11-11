import { useState, useEffect } from "react";

import './Post.css'

import { Avatar, Button } from "@material-ui/core";

const BASE_URL = 'http://localhost:8000/'

const Post = ({ post }) => {

  const [imageUrl, setImageUrl] = useState('')
  const [comments, setComments] = useState([])
  
  useEffect(() => {
    if (post.image_url_type === 'absolute') {
        setImageUrl(post.image_url)
    }
    else {
        setImageUrl(BASE_URL + post.image_url)
    }
  }, [])

  useEffect(() => {
    setComments(post.comments)
  }, [])


  return (
    <div className="post">
        <div className="post_header">
            <Avatar
            alt="avatar"
            src=""
            />
            <div className="post_headerInfo">
                <h3>{post.user.username}</h3>
                <Button className="post_delete">Delete</Button>
            </div>
        </div>
        <img
        className="post_image"
        src={imageUrl}
        />

        <h4 className="post_text">{post.caption}</h4>

        <div className="post_comments">
            {
                comments.map((comment) => (
                    <p>
                        <strong>{comment.username}:</strong> {comment.text}
                    </p>
                ))
            }
        </div>
    </div>
  )
}

export default Post