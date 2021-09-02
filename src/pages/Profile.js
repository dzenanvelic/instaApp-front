import React, { useEffect,useState } from 'react'
import {useDispatch, useSelector}from 'react-redux'
import axios from 'axios'
import M from 'materialize-css'
import { Link } from 'react-router-dom'
function Profile() {
    const{user}= useSelector((state)=>({...state}))
    const dispatch=useDispatch()
const [userPosts,SetUserPosts]= useState([])
const[image,setImage]= useState('')
const [profilePic,setProfilePic]= useState('')
const [upload,setUpload]=useState(false)
    useEffect(()=>{
        axios.get('/post/userposts',{
            headers:{
"Authorization":"Bearer "+ user.token
            }
        })
        .then(res=>SetUserPosts(res.data))
    },[])

    const uploadData=async()=>{
     
           const data = new FormData()
      data.append("file",image)
      data.append("upload_preset","instaapp")
      data.append("cloud_name","dnwkbousj")
      try {
         await axios.post("https://api.cloudinary.com/v1_1/dnwkbousj/image/upload",
      data
      ).then( res=>{
      setProfilePic(res.data.secure_url)
//console.log("CLOUDINSARY",res.data)
        
      })
 
      } catch (error) {
        console.log(error)
      } 

    }

    useEffect(()=>{
        if(profilePic){
            
            const changePic = async()=>{
await axios.put(`/user/updatephoto/${user._id}`,{profilePic},{
    headers:{
        "Authorization": "Bearer " + user.token
    }
})
.then(res=>{
    //console.log("PROFILEPIC DATA",res.data)
   dispatch({type:"UPLOAD_PIC",payload:res.data.profilePic})
   
  
  M.toast({html:"You are changed profile pic successfuly",classes:"#00695c teal darken-3"})
   
})
            }
 
            changePic()
        }
        
    },[profilePic]) 

    localStorage.setItem("instauser",JSON.stringify(user))
    const handleUpload=()=>{
      return  setUpload(!upload)
    }
    return (
        <div className="container-flex">
            <div className="row">
               
                     <div className="col-md-4 profilePicWrapper">
                        <img className="profile-image" src={user.profilePic ? user.profilePic :'https://t4.ftcdn.net/jpg/03/40/12/49/360_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.jpg'} alt="" /> 
                     </div>
                <div className="col-md-5">
                    
                          <h4>{user.username}</h4>
                    <div className="followDiv">
                        <h6>{userPosts?.length} posts</h6>
                        <h6>{user.followers?.length || 0} followers</h6>
                        <h6>{user.following?.length || 0} following</h6>
                    </div>
                    </div>
                    <div className="col-md-3">
                        <div onClick={handleUpload}className="uploadPic">
                             <span class="material-icons" >
upload
</span><p>Upload Profile Picture</p>
                        </div>
                       
                        {upload &&  (<><div class="file-field input-field">
      <div class="btn #90caf9 blue darken-3">
        <span>Upload image</span>
        <input type="file"onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
                        
  <button className="btn waves-effect #90caf9 blue darken-3" type="submit" name="action"onClick={uploadData}>Submit Image
    <i className="material-icons right"></i>
  </button></>) }
                    </div>
                 
                   
                
                
              
               
            </div>
            <hr />
           <div className="gallery">
               {userPosts.map((post)=>{
 return <div key={post._id}  className="userPost">
    
    <img className="userPostImage" src={post.photo} alt="userpostimage" />
 </div>
 
               })}
              
               
           </div>
          
        </div>
    )
}

export default Profile
