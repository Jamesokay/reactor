import axios from "axios"

export const loginCall = async (userCredentials, dispatch) => {
    dispatch({type: 'LOGIN_START'})
    console.log('commencing')
    try {
        const res = await axios.post('auth/login', userCredentials)
        dispatch({type: 'LOGIN_SUCCESS', payload: res.data})
        console.log('success')
    } catch(err) {
        dispatch({type: 'LOGIN_FAILURE', payload: err})
        console.log('failed call')
    }
}