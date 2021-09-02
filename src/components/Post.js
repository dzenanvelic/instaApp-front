import React,{useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import M from 'materialize-css'
import {  Link } from 'react-router-dom'


function Post({p}) {
    
    const [text,setText]= useState('')
    const{user}=useSelector((state)=>({...state}))
    const[exactPost,setExactPost]= useState(p)
    const handleLike=async()=>{
await axios.put(`/post/like/${p._id}`,{user},{
    headers:{
        "Authorization":"Bearer "+ user.token
    },
},{new:true})
.then((res)=>{

    M.toast({html:res.data,classes:"#00695c teal darken-3"})
getExactPost()
//window.location.reload()
})
    }
    const sendComment=async()=>{
await axios.put(`/post/commentpost/${p._id}`,{text,postedBy:user._id},{
    headers:{
        "Authorization":"Bearer "+ user.token
    }
})
.then(res=> {
   // window.location.reload()

    console.log("COMMENT",res.data)
    M.toast({html:"You commented post",classes:"#00695c teal darken-3"}) 
   getExactPost()
}

 )
    }
    
    const handleComment=(id,commentid)=>{
        axios.delete(`/post/removecomment/${id}/${commentid}`,{
            headers:{
                "Authorization":"Bearer "+ user.token
            }
        })
        .then(res=>{
             getExactPost()
            console.log(res.data)})
    }
    const deletePost=async()=>{
      await  axios.delete(`/post/removepost/${p._id}/${p.postedBy._id}`,{
          headers:{
              "Authorization": "Bearer " + user.token
          }
      })
      .then(res=>{
         // console.log("DELETE POST DATA",res.data)
          M.toast({html:"You are deleted post  successfuly",classes:"#00695c teal darken-3"})
             getExactPost()
      })
      
    }
   
const getExactPost=async()=>{
     await axios.get(`/post/getexactpost/${p._id}`,{
         headers:{
             "Authorization":"Bearer " + user.token
         }
     })
     .then(res=>setExactPost(res.data))
 }
   
 
    return (
        <div key={p._id} className="card cardHome">
               <h6 className="postHeader">{p.postedBy._id === user._id ? (<Link to="/profile">{p.postedBy.username}</Link>) : (<Link to={`profile/${p.postedBy._id}`}>{p.postedBy.username}</Link>)}<span>{p.postedBy._id === user._id && <span class="material-icons deletePostIcon "onClick={deletePost}>
delete
</span> }</span></h6>
               <div className="card-image">
                   <img src={p.photo } alt="" />
               </div>
               <div className="card-content">
                   <div className="likesPost">
                        <span className="material-icons heart" onClick={handleLike}>
favorite
</span><span>{exactPost.likes?.length || null} likes</span>
                   </div>
                  
                   <h6>{p.title}</h6>
                   <p>{p.body}</p>
                   <div className="commentInput">
                        <input type="text" placeholder="add a comment" onChange={(e)=>setText(e.target.value)} /><span><i className="material-icons sendComment"onClick={sendComment}>chevron_right</i></span>
                   </div>
                   <div className="commentsAll">
                      
                    {
                                   exactPost.comments.map(c=>{
                                        return(
                                       <div key={c._id} className="commentsDiv">
                                          <div className="div1">
                                              <span className="postedByComment">{c.postedBy.username}:</span>
<span className='postedComment'>{c.text}</span>
                                          </div>
                                          <div className="div2"><span  className="material-icons deleteComment"onClick={()=>handleComment(p._id,c._id)}>
clear
</span></div>
                                           

                                       </div>
                                        )
                                    })
                                }
                   </div>
                  
                   <p>{new Date(p.createdAt).toDateString() || "No time ago"}</p>
               </div>
           </div>
    )
}

export default Post
