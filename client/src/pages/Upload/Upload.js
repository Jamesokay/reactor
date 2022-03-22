import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './upload.css'
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'

export default function Upload() {
    const { userObject } = useContext(AuthContext)
    const [fileData, setFileData] = useState()
    const [tags, setTags] = useState('')

    // useEffect(() => {
    //   if (!tags) return

    //   console.log(tags.split(' '))

    // }, [tags])

    const handleFileChange = ({ target }) => {
        setFileData(target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('request sent')
        const formData = new FormData()
        formData.append('userId', userObject.user._id)
        formData.append('img', fileData)
        formData.append('tags', tags.split(' '))
     
        try {
          const res = await axios.post('/posts/upload', formData)
          console.log(res.data)
        } catch(error) {
            console.log(error)
        }

    }
    

    return (
      <div className='uploadContainer'> 
        {fileData && (
          <div className='uploadImageContainer'>
            <img className='uploadImage' src={URL.createObjectURL(fileData)} alt='' />
          </div>
        )}
        <input
            type='text'
            placeholder='Tags'
            onChange={e => {
              setTags(e.target.value)
            }}
          />
        <div className='upload'>
          <form onSubmit={handleSubmit} className='uploadForm'>
            <label htmlFor='file' className='shareOption'>
              <AddToPhotosOutlinedIcon />
              <input 
                style={{ display: "none" }}
                id='file'
                type='file'
                name='file'
                accept='image/*'
                onChange={handleFileChange}
                required>
              </input>
            </label>
            <button type='submit' className='shareOption'>
              <FileUploadOutlinedIcon />
            </button>
          </form>
        </div>
      </div>
    )
}
