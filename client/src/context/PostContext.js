import { createContext } from 'react'

export const PostContext = createContext({
    postObject: {userId: '', postId: ''},
    setPostObject: () => { }
})