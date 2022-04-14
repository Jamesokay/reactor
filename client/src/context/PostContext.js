import { createContext, useState } from 'react'

const initialState = {
    userId: '', 
    postId: '', 
    isLiked: false}

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