import { createContext } from 'react'

export const PostContext = createContext({
    postObject: {userId: '', desc: '', img: '', likes: [], postAuthor: {}},
    setPostObject: () => { }
})