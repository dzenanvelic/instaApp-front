import React, { useEffect,useRef,useState } from 'react'
import axios from 'axios'
import{useSelector} from 'react-redux'
import Post from '../components/Post'
import M from 'materialize-css'
import {Link} from 'react-router-dom'
function Home() {
const [posts,setPosts]= useState([])
const[allUsers,setAllUsers]= useState([])
const {user}= useSelector((state)=>({...state}))

    useEffect(()=>{
axios.get('/post/allposts',{
    headers:{
        "Authorization":"Bearer "+ user.token
    }
})
.then((res)=>setPosts(res.data))
    },[])

   
   
    useEffect(()=>{
axios.get('/user',{
    headers:{
        "Authorization":"Bearer "+ user.token
    }
})

.then((res)=>setAllUsers(res.data))
    },[])
    
    return (
        <div className=" home">
            <div className="row">
              
                <div className="col-md-8  cardContainer">
                    <div >
                        {posts.map((p)=>{
                            return <Post key={p._id} p={p}/>
                        })}

 

                </div>
                    </div>
 
                <div className="col-md-4 userContainer">
                    {allUsers.map((us)=>{
                       return <div key={us._id} className="cardUser">
                           {user._id === us._id ? (<Link to='/profile'><img  className="cardUserImage" src={us.profilePic ? us.profilePic : 'https://t4.ftcdn.net/jpg/03/40/12/49/360_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.jpg'} alt="tre" /> </Link>):(<Link to={`/profile/${us._id}`}><img  className="cardUserImage" src={us.profilePic ? us.profilePic : 'https://t4.ftcdn.net/jpg/03/40/12/49/360_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.jpg'} alt="tre" /> </Link>)}
                           <h6  className="cardUserName" >{us.username}</h6>

                       </div>
                   })} 
                </div>
            </div>
         
        </div>
    )
}

export default Home
