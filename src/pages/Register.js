import React,{ useState,} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import M from 'materialize-css'
function Register() {
    const [username,setUsername]= useState('')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
const history = useHistory()
     const handleSubmit=async()=>{
try {
  if(username.length < 4){
    return M.toast({html:"Please enter min 4 letters for username",classes:"#f44336 red"})
  }
  if(password.length < 6){
    return M.toast({html:"Please enter min 6 letters for password",classes:"#f44336 red"})
  }
 await axios.post('/auth/register',{username,email,password})
  .then(res=>{
M.toast({html:res.data,classes:"#00695c teal darken-3"})
history.push('/login')
  }
  )
  
    
    
    
} catch (error) {
 M.toast({html:"Please fill up all fields and try again or user already exists",classes:"#f44336 red"})
}
     }
     const tryToast =()=>{
     return 
     }
    return (
       
     
  <div className="row myCard">
   
      <div className="card authCard input-field ">
      <h2>Insta App</h2>
        <input type="text" placeholder="username" onChange={e=>setUsername(e.target.value)} />
        <input type="email" placeholder="email"onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
        <button className="btn waves-effect #90caf9 blue lighten-3" type="submit" name="action" onClick={handleSubmit}>Register
    <i className="material-icons right"></i>
  </button>
  <Link to='/login'>
  <h6 className="text-danger">Already have an account? Go to Login</h6>
  </Link>
   
      </div>
   
  </div>
            
    )
}

export default Register
