import axios from 'axios'
import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './upload.css'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'


export default function Upload() {
    const { userObject } = useContext(AuthContext)
    const [fileData, setFileData] = useState(null)
    const [tags, setTags] = useState('')
    const [uploading, setUploading] = useState(0)

    const handleFileChange = ({ target }) => {
        setFileData(target.files[0])
    } 

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('request sent')
        setUploading(1)
        const formData = new FormData()
        formData.append('userId', userObject.user._id)
        formData.append('img', fileData)
        formData.append('tags', tags.split(' '))
     
        try {
          const res = await axios.post('/posts/upload', formData)
          console.log(res.data)
          setUploading(2)
          setFileData(null)
        } catch(error) {
            console.log(error)
        }

    }
    

    return (
      <div className='uploadContainer'> 
      
      <div className='uploadImageContainer'>
        <div className='loader' style={uploading === 1? {visibility: 'visible'} : {visibility: 'hidden'}}>
         <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </div>
        {fileData?
            <img className='uploadImage' src={URL.createObjectURL(fileData)} alt='' style={uploading === 1? {opacity: '0.6'} : {opacity: '1'}}/>
            :
            <div>
              {uploading === 0?
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
              :
              <span>Uploaded!</span>
              }
            </div>     
        }
        </div>

        <textarea
            style={uploading === 1 || uploading === 2? {visibility: 'hidden'} : {visibility: 'visible'}}
            className='caption'
            type='text'
            placeholder='#Add #Some #Tags'
            onChange={e => {
              setTags(e.target.value)
            }}
          ></textarea>
        <div className='upload' style={uploading === 1 || uploading === 2? {visibility: 'hidden'} : {visibility: 'visible'}}>
            <div onClick={handleSubmit} className='sendIt'>
              <span>Send It</span>
            </div>
        </div>
      </div>
    )
}
