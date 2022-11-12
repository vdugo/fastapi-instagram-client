import { useState } from "react";
import { Button } from "@material-ui/core";

import React from 'react'

const BASE_URL = 'http://localhost:8000/'

const ImageUpload = ({authToken, authTokenType}) => {
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
        // create post here
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