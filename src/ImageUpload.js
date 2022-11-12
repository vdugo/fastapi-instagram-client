import { useState } from "react";
import { Button } from "@material-ui/core";

import React from 'react'

const BASE_URL = 'http://localhost:8000/'

const ImageUpload = ({authToken, authTokenType, userId}) => {
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState(null)

  const handleChange = (event) => {
    if (event.target.files[0]) {
        setImage(event.target.files[0])
    }
  }

   const handleUpload = (event) => {
    event?.preventDefault()

    const formData = new FormData()
    formData.append('image', image)

    const requestOptions = {
        method: 'POST',
        headers: new Headers({
            'Authorization': authTokenType + ' ' + authToken
        }),
        body: formData
    }

    fetch(BASE_URL + 'post/image', requestOptions)
    .then((response) => {
        if (response.ok) {
            return response.json()
        }
        throw response
    })
    .then((data) => {
        setImage(null)
        createPost(data.filename)
    })
    .catch((error) => {
        console.log(error)
        alert(error)
    })
    .finally(() => {
        setCaption('')
        setImage(null)
        document.getElementById('fileInput').value = null
    })
   }

   const createPost = (imageUrl) => {
    const json_string = JSON.stringify({
        'image_url': imageUrl,
        'image_url_type': 'relative',
        'caption': caption,
        'creator_id': userId
    })

    const requestOptions = {
        method: 'POST',
        headers: new Headers({
            'Authorization': authTokenType + ' ' + authToken,
            'Content-Type': 'application/json'
        }),
        body: json_string
    }
    fetch(BASE_URL + 'post', requestOptions)
    .then((response) => {
        if (response.ok) {
            return response.json()
        }
        throw response
    })
    .then((data) => {
        window.location.reload()
        window.scrollTo(0, 0)
    })
    .catch((error) => {
        console.log(error)
    })
   }

  return (
    <div className="imageupload">
        <input 
        type="text"
        placeholder="enter a caption"
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
        />
        <input 
        type="file"
        id="fileInput"
        onChange={handleChange}
        />
        <Button
        className="imageupload_button"
        onClick={handleUpload}
        >
            Upload
        </Button>
    </div>
  )
}

export default ImageUpload