import React,{useEffect, useRef} from 'react'
import './Login.css'
import {Link, useHistory, useLocation} from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useDispatch,useSelector } from 'react-redux'
import { login } from '../../actions/userActions'

const Login = () => {
    const email = useRef()
    const password = useRef()

    const dispatch = useDispatch()


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email.current.value,password.current.value))
    }

    const history = useHistory()
    let redirect = useLocation().search
    redirect = redirect ? redirect.split('=')[1] : '/'

    const userLogin = useSelector(state=>state.userLogin)
    const {error,loading,userInfo} = userLogin

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])
  return (
    <div className="login">
        <div className="loginWrapper">
        <h1 className="signIn">Sign In</h1>
        {error&&<Message variant='danger'>{error}</Message>}
        {loading&&<Loader/>}
        <form onSubmit={submitHandler}>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                placeholder="Email"
                required
                className="loginInput"
                ref={email}
                id="email"/>
            <label htmlFor="password">Password</label>
            <input
                type="password"
                placeholder="Password"
                required
                className="loginInput"
                ref={password}
                id="password"/>
            <button className="loginButton" type="submit">
                Log In
            </button>
        </form>
            <div className="register">
                <span>New Customer? <Link style={{textDecoration:'none'}}
                to={redirect ? `/register?redirect=${redirect}`:'/register'}
                ><span className="registerText">Register</span>
                </Link></span>
            </div>
        </div>

    </div>
  )
}

export default Login