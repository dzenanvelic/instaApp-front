import React,{useState} from 'react'
import M from 'materialize-css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
  
function ResetPassword() {
 const [email,setEmail]= useState('')
   
const history = useHistory()


const handleSubmit=async()=>{
  try {
   await axios.post('/auth/resetpassword',{email})
.then(res=>{
  M.toast({html:res.data.message,classes:"#00695c teal darken-3"})

history.push('/login')

  })
 

 


  } catch (error) {
    return M.toast({html:error,classes:"#f44336 red"})
  }

}




    return (
       <div className="row myCard">
   
      <div className="card authCard input-field ">
      <h2>Insta App</h2>
        
        <input type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
       
         <button className="btn waves-effect #90caf9 blue lighten-3" type="submit" name="action"onClick={handleSubmit}>Reset Password
    <i className="material-icons right"></i>
  </button> 
      </div>
    
  </div>
    )
}

export default ResetPassword
