export function userReducer(state= JSON.parse(localStorage.getItem("instauser")) || null,action){
    switch(action.type){
case "LOGGED_IN_USER":
    return action.payload;

    case "LOGOUT":
        return action.payload;

  case "FOLLOW":
return{
    
        ...state,
        following:[...state.following,action.payload],
    
}
 case "UNFOLLOW":
return{
    
    
        ...state,
        following:state.following.filter((follow)=>follow !== action.payload),
    
}
case "UPLOAD_PIC":
    return{
        ...state,
        profilePic:action.payload
    }
 
        default:
            return state
    }

   
}