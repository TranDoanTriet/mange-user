
import { toast } from 'react-toastify';
import { loginApi } from '../../components/services/userService'
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_REFRESH = 'USER_REFRESH'

export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN'
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'

export const handleLoginRedux = (email, password) => {
    return async (dispatch, getstate) => {
        dispatch({ type: FETCH_USER_LOGIN })
        let res = await loginApi(email.trim(), password)
        console.log(res)
        if (res && res.token) {
            localStorage.setItem('token', res.token)
            localStorage.setItem('email', email.trim())
            dispatch({
                type: FETCH_USER_SUCCESS,
                data: {
                    email: email.trim(),
                    token: res.token,
                }
            })

            // loginContext(email, res.token)
            // // localStorage.setItem('token', res.token)
            // navigate('/')
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error)
            }
            dispatch({
                type: FETCH_USER_ERROR,
            })
        }
    }
}

export const handleLogoutRedux = () => {
    return (dispatch, getstate) => {
        dispatch({ type: USER_LOGOUT })
    }
}

export const handleRefresh = () => {
    return (dispatch, getstate) => {
        dispatch({ type: USER_REFRESH })
    }
}