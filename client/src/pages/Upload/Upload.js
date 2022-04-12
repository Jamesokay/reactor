import axios from 'axios'
import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './upload.css'
import Picker from 'emoji-picker-react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import CircularProgress from '@mui/material/CircularProgress';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Box from '@mui/material/Box'


export default function Upload() {
    const { userObject } = useContext(AuthContext)
    const [fileData, setFileData] = useState(null) 
    const [caption, setCaption] = useState('')
    const [uploading, setUploading] = useState(0)   
    const [showEmojis, setShowEmojis] = useState(false)
   
    const handleFileChange = ({ target }) => {
        setFileData(target.files[0])
    } 

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('request sent')
        setUploading(1)
        let tags = []
        let hashTagMatch = caption.match(/#[a-z0-9_]+/g)
        if (hashTagMatch) {
          tags = hashTagMatch.map((t) => {
            return t.slice(1)
          })
        }

        const formData = new FormData()
        formData.append('userId', userObject.user._id)
        formData.append('img', fileData)
        formData.append('caption', caption)
        formData.append('tags', JSON.stringify(tags))
     
        try {
          const res = await axios.post('/posts/upload', formData)
          console.log(res.data)
          setUploading(2)
          setFileData(null)
        } catch(error) {
            console.log(error)
        }

    }

    const onEmojiClick = (event, emojiObject) => {
      setCaption(prevInput => prevInput + emojiObject.emoji);
      setShowEmojis(false);
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
        {showEmojis && (
          <div className='emojiPickerContainer'>
        <Picker 
          pickerStyle={{background: 'white', boxShadow: 'none'}}
          onEmojiClick={onEmojiClick}
          native='true'
          />
        </div>
        )}
        <div className='captionContainer'>
        <textarea
            style={uploading === 1 || uploading === 2? {visibility: 'hidden'} : {visibility: 'visible'}}
            className='caption'
            value={caption}
            type='text'
            placeholder='Add a caption...'
            onChange={e => {
              setCaption(e.target.value)
            }}
          ></textarea>
          <InsertEmoticonIcon onClick={() => setShowEmojis(!showEmojis)}/>
        </div>
            <div onClick={handleSubmit} className='sendIt' style={uploading === 1 || uploading === 2? {visibility: 'hidden'} : {visibility: 'visible'}}>
              <span>Send It</span>
            </div>
      </div>
    )
}
