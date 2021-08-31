import { useContext, useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

export default function Feed({username}) {
  const [posts,setPosts] = useState([])

  const {user} = useContext(AuthContext)
  
  useEffect(() => {
    fetchPosts()
  },[])

  const fetchPosts = async () => {
    const res = username
      ? await axios.get("https://av-facebook-clone.herokuapp.com/api/posts/profile/" + username)
      : await axios.get("https://av-facebook-clone.herokuapp.com/api/posts/timeline/" + user._id);
    setPosts(
      res.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    );
  };
    
  return (
        <div>
            <div className="feed">
      <div className="feedWrapper">
      {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}

      </div>
    </div>
        </div>
    )
}
