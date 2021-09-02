import React, { useEffect,useState } from 'react'
import {useSelector,useDispatch}from 'react-redux'
import axios from 'axios'
import M from 'materialize-css'
import { useParams } from 'react-router-dom'
function UserProfile() {
    const{userid}= useParams()

    const{user}= useSelector((state)=>({...state}))

    const dispatch=useDispatch()
    const [userCurrent,setUserCurrent]= useState('')
const [userPosts,SetUserPosts]= useState([])
//console.log("USERCurrent",userCurrent.followers)
//console.log("USER ID",user._id)

  const[showFollow,setShowFollow]=useState(user ? user.following.includes(userid) : true)     

console.log("showFollow",showFollow)
     useEffect(()=>{
        axios.get(`/user/${userid}`,{
            headers:{
"Authorization":"Bearer "+ user.token
            }
        })
        .then(res=>{
            console.log("USER PROFILE",res.data)
            setUserCurrent(res.data.user)
            SetUserPosts(res.data.userPosts)
        })
    },[userid,user.followers,user.token]) 


    const followUser=async()=>{
await axios.put(`/user/${userid}/follow`,{},{
    headers:{
        "Authorization":"Bearer " + user.token
    }
})
.then(res=>{
   dispatch({type:"FOLLOW",payload:userid})
 
  
    M.toast({html:res.data,classes:"#00695c teal darken-3"})
     localStorage.setItem("instauser",JSON.stringify(user))
})

    }

    const unfollowUser=async()=>{
await axios.put(`/user/${userid}/unfollow`,{},{
    headers:{
        "Authorization":"Bearer " + user.token
    }
})
.then(res=>{
     dispatch({type:"UNFOLLOW",payload:userid})
    
    
    M.toast({html:res.data,classes:"#00695c teal darken-3"})
  
  localStorage.setItem("instauser",JSON.stringify(user))
})

    }
    
     localStorage.setItem("instauser",JSON.stringify(user))
   // console.log("USER",userCurrent)
    return (<>
    {userCurrent ? (<div className="container-flex">
            <div className="row">
               
                     <div className="col-md-4 profilePicWrapper">
                        <img className="profile-image" src={userCurrent.profilePic ? userCurrent.profilePic : 'https://www.kindpng.com/picc/m/22-223965_no-profile-picture-icon-circle-member-icon-png.png'} alt="" /> 
                     </div>
                <div className="col-md-8">
                    <h4>{userCurrent.username}</h4>
                    <h6>{userCurrent.email}</h6>
                    <div className="followDiv">
                        <h6> {userPosts?.length} posts</h6>
                        <h6>{userCurrent.followers?.length || 0} followers</h6>
                        <h6>{userCurrent.following?.length || 0} following</h6>
                    </div>
                    <div className="followButtons">
                   {showFollow ? (<a className="waves-effect waves-light btn"onClick={unfollowUser}>Unfollow</a>): ( <a className="waves-effect waves-light btn" onClick={followUser}>Follow</a>)}     
                          

                         
                            
                      
                        
                      
                     
                    
                      
                        
                    </div>
                </div>
              
               
            </div>
            <hr />
           <div className="gallery">
               {userPosts.map((post)=>{
 return <div key={post._id} className="userPost">
    
     <img className="userPostImage" src={post.photo} alt="userpostimage" />
 </div>
 
               })}
              
               
           </div>
        </div>):("Loading")}
        
   </> )
}

export default UserProfile
