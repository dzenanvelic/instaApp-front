import React,{useEffect,useState} from 'react'
import Post from '../components/Post'
import {useSelector} from "react-redux"
import axios from 'axios'
function FollowingUsersPosts() {
    const [posts,setPosts]= useState([])
const {user}= useSelector((state)=>({...state}))

    useEffect(()=>{
axios.get('/post/folpost',{
    headers:{
        "Authorization":"Bearer "+ user.token
    }
})
.then((res)=>setPosts(res.data))
    },[])
    return (
        <div className="home ">
           
               
                <div className="col-md-8 cardContainer">
                   
                        {posts.map((p)=>{
                            return <Post key={p._id} p={p}/>
                        })}

 

               
                  
 
               
            </div>
          
        </div>
    )
}

export default FollowingUsersPosts

