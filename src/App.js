
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Switch,Route, useHistory} from 'react-router-dom'

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CreatePost from './components/CreatePost';
import{useSelector} from "react-redux"
import M from 'materialize-css'
import UserProfile from './pages/UserProfile';
import FollowingUsersPosts from './pages/FollowingUsersPosts';
import ResetPassword from './pages/ResetPassword';
import NewPassword from './pages/NewPassword';

function App() {
   const {user}=useSelector((state)=>({...state}))
   const Routing=()=>{
       const history = useHistory()
 
   
   const redirect=()=>{
  M.toast({html:"Please register first",classes:"#f44336 red"})
      history.push('/register')
   }
   return(
 <Switch>
 { user     ? <Route exact path="/">
<Home/>
            </Route> : redirect()  }   
            <Route exact path="/login">
<Login/>
            </Route>
           <Route exact path="/register">
<Register/>
            </Route>
            <Route exact path="/profile">
<Profile/>
            </Route>
        {user && <Route exact path="/create">
<CreatePost/>
            </Route>}  
         <Route exact path="/profile/:userid">
<UserProfile/>
            </Route> 
         <Route exact path="/followingpost">
<FollowingUsersPosts/>
            </Route> 
         <Route exact path="/reset">
<ResetPassword/>
            </Route> 
         <Route exact path="/reset/:token">
<NewPassword/>
            </Route> 
          
</Switch>
   )
    
   }
  
  
    return(<>
     
       <Router>
        
          <Navbar/>
        
          
    
           <Routing/>
        
     
          
       </Router>
       
   </> )
     
    
 
}

export default App;
