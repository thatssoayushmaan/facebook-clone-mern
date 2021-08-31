import './topbar.css'
import {Notifications, Person, Search, Chat} from '@material-ui/icons'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import {AuthContext} from '../../context/AuthContext'

export default function Topbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const {user} = useContext(AuthContext)

    return (
        <div>
            <div className="topbarContainer">
                <div className="topbarLeft">
                    <Link to="/" className="link">
                        <span className="logo">FreshBook</span>
                    </Link>
                </div>

                <div className="topbarCenter">
                    <div className="searchbar">
                        <Search className="searchIcon"/>
                        <input type="text" placeholdor="explore...." className="searchInput" />
                    </div>
                </div>

                <div className="topbarRight">
                    <div className="topbarLinks">
                        <div className="topbarLink">
                            <Link to="/" className="link">Home</Link>
                        </div>
                        <div className="topbarLink">Explore</div>
                    </div>
                    <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
                </div>
                <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
            </div>
        </div>
    )
}
