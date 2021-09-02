import React,{useState} from 'react'
import M from 'materialize-css'
import axios from 'axios'
import { useHistory,Link } from 'react-router-dom'
   import {useDispatch,useSelector} from 'react-redux'
function Login() {
 const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
const history = useHistory()
const dispatch=useDispatch()
const{user}= useSelector((state)=>({...state}))
const handleSubmit=async()=>{
  try {
   await axios.post('/auth/login',{email,password},{
     headers:{
      
     }
   })
.then(res=>{
  console.log("USER DATA",res.data)
  dispatch({type:"LOGGED_IN_USER",payload:{
    username:res.data.user.username,
    _id:res.data.user._id,
    email:res.data.user.email,
token:res.data.token,
followers:res.data.user.followers,
following:res.data.user.following,
profilePic:res.data.user.profilePic,

  }})
 

  M.toast({html:"You are registered successfuly",classes:"#00695c teal darken-3"})

history.push('/')
})

  } catch (error) {
    return M.toast({html:"Please enter correct password or email",classes:"#f44336 red"})
  }

}
localStorage.setItem("instauser",JSON.stringify(user))
    return (
       <div className="row myCard">
   
      <div className="card authCard input-field ">
      <h2>Insta App</h2>
        
        <input type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
         <button className="btn waves-effect #90caf9 blue lighten-3" type="submit" name="action"onClick={handleSubmit}>Login
    <i className="material-icons right"></i>
  </button> 
     <h6><Link className="text-success" to="/register">Do not have an account?Go to register</Link></h6>
     <h6><Link className="text-danger" to="/reset">Change your password?Go to change password</Link></h6>
      </div>
    
  </div>
    )
}

export default Login
