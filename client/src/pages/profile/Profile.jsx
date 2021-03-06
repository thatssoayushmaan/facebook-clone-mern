import "./profile.css";
import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rigthbar"
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username
  //console.log(username)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://av-facebook-clone.herokuapp.com/api/users?username=${username}`);
      //console.log(res)
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  console.log(user)
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/1.jpeg"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}