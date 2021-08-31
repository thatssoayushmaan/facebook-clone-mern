import './home.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rigthbar'
import Feed from '../../components/feed/Feed'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Home() {
    //const {user} = useContext(AuthContext)
    
    return (
        <div>
            <>
            <Topbar/>
            <div className="homeContainer">
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </div> 
            </>
        </div>
    )
}
