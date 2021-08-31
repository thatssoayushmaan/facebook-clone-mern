import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import axios from 'axios'
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({post}) {
    //console.log(post)
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [user,setUser] = useState({})
    const {user: currentUser} = useContext(AuthContext)

    useEffect(() => {
      setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    useEffect(() => {
        fetchUser()
      },[])
    
      const fetchUser = async () => {
        // const res = await axios.get(`/users/${post.userId}`)
        const res = await axios.get(`https://av-facebook-clone.herokuapp.com/api/users?userId=${post.userId}`);
        setUser(res.data)

      }

      const handleLike = () => {
        try {
          axios.put("https://av-facebook-clone.herokuapp.com/api/posts/" + post._id + "/like", { userId: currentUser._id });
        } catch (err) {}
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
      };
    return (
        <div>
            <div className="post">
                <div className="postWrapper">
                    
                    <div className="postTop">

                        <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
                            <span className="postUsername">
                            <Link to={`/profile/${user.username}`}>{user.username}</Link>
                            </span>
                            <span className="postDate">{format(post.createdAt)}</span>
                        </div>

                        <div className="postTopRight">
            <MoreVert />
          </div>
                    </div>

                    <div className="postCenter">
                    <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={PF + post.img} alt="" />
        </div>
                    </div>

                    <div className="postBottom">
                    <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`}  alt="" onChange={handleLike}/>
            <img className="likeIcon" src={`${PF}heart.png`}  alt="" onChange={handleLike}/>
            <span className="postLikeCounter">{like} people like it</span>
          </div>

          <div className="postBottomRight">
          <span className="postCommentText">{post.comment} comments</span>
          </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
