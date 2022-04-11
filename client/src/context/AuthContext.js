import { createContext, useState, useEffect } from 'react'

const initialState = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
  }
export const AuthContext = createContext(initialState)

export const AuthContextProvider = ({ children }) => {
    const [userObject, setUserObject] = useState(initialState);
    const userValue = {userObject, setUserObject}
    
    useEffect(()=>{
      localStorage.setItem('user', JSON.stringify(userObject.user))
    },[userObject.user])
    
    return (
      <AuthContext.Provider
        value={userValue}
      >
        {children}
      </AuthContext.Provider>
    );
  };