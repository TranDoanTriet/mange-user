import React, { useEffect, useState, useContext } from 'react';
// import { loginApi } from './services/userService';
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom';
import { handleLoginRedux } from '../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
const Login = () => {
    // const { loginContext } = useContext(UserContext);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)

    const isLoading = useSelector(state => state.user.isLoading)
    const account = useSelector(state => state.user.account)

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Email/password is required')
            return
        }
        dispatch(handleLoginRedux(email, password))
    }

    const handleGoBack = () => {
        navigate('/')
    }
    const handleKeyDown = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin()
        }
    }

    useEffect(() => {
        if (account && account.auth === true) {
            navigate('/')
        }
    }, [account])
    return (
        <>
            <div className='login-container col-sm-8 col-md-6 col-lg-4 '>
                <div className='title'>
                    Log in
                </div>
                <div className='text'>Email or username (eve.holt@reqres.in)</div>
                <input
                    placeholder='Email or Username'
                    type='text'
                    value={email}
                    onChange={(event) => setEmail(event.target.value.trim())}
                />
                <div className='password'>
                    <input
                        placeholder='Password'
                        type={isShowPassword === true ? 'text' : 'password'}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event)}
                    />
                    <div className='icon-pass'>

                        <i
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                        ></i>
                        {/* <i className="fa-solid fa-eye"></i> */}
                    </div>
                </div>
                <button
                    className={email && password ? 'active' : ''}
                    disabled={(email && password) ? false : true}
                    onClick={() => handleLogin()}
                >
                    {isLoading && <i className='fa-solid fa-sync fa-spin'></i>}
                    &nbsp;Login
                </button>
                <div className='back'><i className="fa-solid fa-angle-left"></i>
                    <span onClick={() => handleGoBack()}>&nbsp;Go back</span>
                    {/* <Link to='/'>Go back</Link> */}
                </div>
            </div>
        </>
    );
};

export default Login;