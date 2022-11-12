import { useState } from "react";
import { Button } from "@material-ui/core";

import React from 'react'

const ImageUpload = () => {
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState(null)

  const handleChange = (event) => {
    if (event.target.files[0]) {
        setImage(event.target.files[0])
    }
  }

   const handleUpload = (event) => {
    
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