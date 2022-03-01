import axios from 'axios'
import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
// import axios from 'axios'
import './upload.css'

export default function Upload() {
    const { userObject } = useContext(AuthContext)
    const [fileData, setFileData] = useState()
    const [imageFile, setImageFile] = useState('')

    const handleFileChange = ({ target }) => {
        console.log(target.files[0])
        setFileData(target.files[0])
        console.log(target.value)
        setImageFile(target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('request sent')
        const formData = new FormData()
        formData.append('userId', userObject.user._id)
        formData.append('img', fileData)
        

        
        try {
          console.log(formData)
          const res = await axios.post('/posts/upload', formData)
          console.log(res.data)
        } catch(err) {
            console.error(err)
        }

    }
    

    return (
        <div className='upload'>
          <form onSubmit={handleSubmit}>
              <input 
                type='file'
                value={imageFile}
                name='file'
                accept='image/*'
                onChange={handleFileChange}
                placeholder='upload image'
                required>
              </input>
              <button type='submit'>Upload</button>
          </form>
        </div>
    )
}
