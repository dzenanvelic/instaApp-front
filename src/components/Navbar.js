import React, { useRef,useEffect ,useState} from 'react'
import "../App.css"
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux"
import M from 'materialize-css'
import axios from 'axios'
function Navbar() {
  const{user }=useSelector((state)=>({...state}))
  
  const refSidebar=useRef()
  const dispatch = useDispatch()
  const refModal = useRef(null)
const [search,setSearch]=useState('')
const [userDetails,setUserDetails]= useState([])
  const handleLogout=()=>{
dispatch({type:"LOGOUT",payload:null})
localStorage.removeItem("instauser")
  }
  useEffect(()=>{
M.Sidenav.init(refSidebar.current)
    },[])
    useEffect(()=>{
M.Modal.init(refModal.current)
    },[])
    const fetchUsers=(query)=>{
setSearch(query)
axios.post('/user/searchusers',{query},{
    headers:{
        "Authorization":"Bearer "+ user.token
    }
})
.then(res=>{
   // console.log(res.data)
   setUserDetails(res.data.user)
})
  }
    return (<>
      {/*   <nav>
    <div className="nav-wrapper white">
      <Link to={user ? "/": '/register'} className="brand-logo left">Insta App</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><span data-target="modal1" class="material-icons searchBar modal-trigger">
search
</span></li>
        {user ? <li onClick={handleLogout}><Link to="/login">Logout</Link></li> : <li> <Link to="/login">Login</Link></li>} 
        <li><Link to="/register">Register</Link></li>
       {user && <li><Link to="/profile">Profile</Link></li>} 
       {user && <li><Link to="/followingpost">Friends Posts</Link></li>} 
      {user &&   <li><Link to="/create">Create post</Link></li>}
      </ul>
    </div>
  </nav> */}
  
  <nav>
    <div className="nav-wrapper white">
      <Link to={user ? "/": '/register'} className="brand-logo ">Insta App</Link>
       <a href="#mobile-demo" data-target="mobile-demo" className="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><span data-target="modal1" className="material-icons searchBar modal-trigger">
search
</span></li>
        {user ? <li onClick={handleLogout}><Link to="/login">Logout</Link></li> : <li> <Link to="/login">Login</Link></li>} 
        <li><Link to="/register">Register</Link></li>
       {user && <li><Link to="/profile">Profile</Link></li>} 
       {user && <li><Link to="/followingpost">Friends Posts</Link></li>} 
      {user &&   <li><Link to="/create">Create post</Link></li>}
      </ul>
    </div>
  </nav>

  <ul className="sidenav" id="mobile-demo" ref={refSidebar}>
    <li><span data-target="modal1" className="material-icons searchBar modal-trigger">
search
</span></li>
        {user ? <li onClick={handleLogout}><Link to="/login">Logout</Link></li> : <li> <Link to="/login">Login</Link></li>} 
        <li><Link to="/register">Register</Link></li>
       {user && <li><Link to="/profile">Profile</Link></li>} 
       {user && <li><Link to="/followingpost">Friends Posts</Link></li>} 
      {user &&   <li><Link to="/create">Create post</Link></li> }
      
  </ul>
     <div id="modal1" className="modal modalSearch"ref={refModal}>
    <div className="modal-content">
      <input type="text" placeholder="search users" value={search} onChange={(e)=>fetchUsers(e.target.value)}/>
      
    <ul className="collection">
        {userDetails.map((u)=>{
 return<Link to={u._id !== user._id ?"/profile/" + u._id : "/profile"}><li className="collection-item">name: {u.username} email:<span>{u.email}</span></li></Link>
        })}
     
     
    </ul>
            
    </div>
    <div className="modal-footer">
      <button className="modal-close waves-effect waves-green btn-flat"onClick={()=>setSearch('')}>Close</button>
    </div>
  </div>      
    </>)
}

export default Navbar
