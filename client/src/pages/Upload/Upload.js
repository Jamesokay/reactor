import axios from 'axios'
import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './upload.css'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'

export default function Upload() {
    const { userObject } = useContext(AuthContext)
    const [fileData, setFileData] = useState()
    const [tags, setTags] = useState('')

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
      
      <div className='uploadImageContainer'>
        {fileData?
            <img className='uploadImage' src={URL.createObjectURL(fileData)} alt='' />
            :
            <div className='uploadOptions'>
              <label htmlFor='file'>
              <AddAPhotoIcon className='imageIcon' />
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
              <span>Choose an image</span>
            </div>     
        }
        </div>

        <textarea
            className='caption'
            type='text'
            placeholder='#Add #Some #Tags'
            onChange={e => {
              setTags(e.target.value)
            }}
          ></textarea>
        <div className='upload'>
            <div onClick={handleSubmit} className='sendIt'>
              <span>Send It</span>
            </div>
        </div>
      </div>
    )
}
