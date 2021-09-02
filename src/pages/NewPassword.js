import React,{useState} from 'react'
import M from 'materialize-css'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
   import {useSelector} from 'react-redux'
function NewPassword() {
 const [password,setPassword]= useState('')
   
const history = useHistory()
const{token}= useParams()
console.log(token)
const handleSubmit=async()=>{
  try {
   await axios.post(`/auth/newpassword`,{password,token})
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
        
        <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
       
         <button className="btn waves-effect #90caf9 blue lighten-3" type="submit" name="action"onClick={handleSubmit}>Update password
    <i className="material-icons right"></i>
  </button> 
      </div>
    
  </div>
    )
}

export default NewPassword
