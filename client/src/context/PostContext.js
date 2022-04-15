import { createContext, useState } from 'react'

const initialState = { post: null }

export const PostContext = createContext(initialState) 

export const PostContextProvider = ({ children }) => {
    const [postObject, setPostObject] = useState(initialState)
    const postValue = {postObject, setPostObject}

    return (
        <PostContext.Provider
          value={postValue}
        >
            {children}
        </PostContext.Provider>
    )
}