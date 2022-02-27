import { createContext } from 'react'

export const AuthContext = createContext({
    userObject: { user: null, isFetching: false, error: false},
    setUserObject: () => { }
})