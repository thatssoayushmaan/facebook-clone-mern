import { useState } from "react";
import { loginCall } from "../../context/apiCalls";
import "./login.css";
import { useContext } from "react";
import {AuthContext} from '../../context/AuthContext'
import {CircularProgress} from '@material-ui/core'

export default function Login() {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const {user, isFetching, error, dispatch} = useContext(AuthContext)
  
  const handleClick = (e) => {
    e.preventDefault()
    loginCall({email,password},dispatch)
  }
  
  //console.log(user)
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">FreskBook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on FreskBook.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onClick={handleClick}>
            <input placeholder="Email" type="email" className="loginInput" value={email} onChange={e => setEmail( e.target.value)}/>
            <input placeholder="Password" type="password" className="loginInput" value={password} onChange={e =>setPassword( e.target.value)}/>
            <button className="loginButton" disabled={isFetching}>
            {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" disabled={isFetching}>
            {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
          <strong>User Credentials :- Email : john@gmail.com, Password : 1234567</strong>
        </div>
      </div>
    </div>
  );
}