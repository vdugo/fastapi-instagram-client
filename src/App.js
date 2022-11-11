import { useState, useEffect } from 'react';
import './App.css';

import Post from './Post';

const BASE_URL = 'http://localhost:8000'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(BASE_URL + '/post/all')
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw response
    })
    // sort the posts by timestamp
    .then((data) => {
      const result = data.sort((a,b) => {
        const time_a = a.timestamp.split(/[-T:]/)
        const time_b = b.timestamp.split(/[-T:]/)
        const date_a = new Date(Date.UTC(time_a[0], time_a[1]-1, time_a[2], time_a[3], time_a[4], time_a[5]))
        const date_b = new Date(Date.UTC(time_b[0], time_b[1]-1, time_b[2], time_b[3], time_b[4], time_b[5]))
        return date_b - date_a
      })
      return result
    })
    .then((data) => {
      setPosts(data)
    })
    .catch((error) => {
      console.log(error)
      alert(error)
    })
  }, [])

  return (
    <div className="app_posts">
      {
        posts.map((post) => (
          <Post
          post = {post}
          />
        ))
      }
    </div>
  );
}

export default App;
