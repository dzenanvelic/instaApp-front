import axios from 'axios'
import React,{useEffect, useState} from 'react'
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'
import{useSelector}from 'react-redux'
function CreatePost() {
    const [title,setTitle]= useState('')
    const [body,setBody]= useState('')
    const [image,setImage]= useState('')
    const {user}= useSelector((state)=>({...state}))
const[url,setUrl]= useState('')
const history = useHistory()
  
     const uploadData=async()=>{
     
           const data = new FormData()
      data.append("file",image)
      data.append("upload_preset","instaapp")
      data.append("cloud_name","dnwkbousj")
      try {
         await axios.post("https://api.cloudinary.com/v1_1/dnwkbousj/image/upload",
      data
      ).then(res=>{
        setUrl(res.data.secure_url)

        
      })
      } catch (error) {
        console.log(error)
      } 

    }
  useEffect(()=>{
 if(url){
   const makePost =async()=>{
      try {
         await axios.post('/post/createpost',{title,body,photo:url},{
        headers:{
          "Authorization":"Bearer "+ user.token
        }
      })
      .then(res=>{
       
        M.toast({html:"Post created successfuly",classes:"#00695c teal darken-3"})})
         history.push('/')
      }catch (error) {
        console.log(error)
      }
   }
      
makePost()
    }
  },[url])
   
      
 
  
     
     

   

   
     
    
    return (
        <div className="card input-filed createPost">
            <h5 >Create post</h5>
            <input type="text" placeholder="title" onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder="body"onChange={(e)=>setBody(e.target.value)} />

            <div class="file-field input-field">
      <div class="btn #90caf9 blue darken-3">
        <span>Upload image</span>
        <input type="file"onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
  <button className="btn waves-effect #90caf9 blue darken-3" type="submit" name="action"onClick={uploadData}>Submit Post
    <i className="material-icons right"></i>
  </button>
      
     
        </div>
    )
}

export default CreatePost
