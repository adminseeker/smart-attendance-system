const defaultUserState = []

const usersReducer = (state=defaultUserState,action)=>{
    switch(action.type){
        case "ADD_USERS":
            return [
                ...state,
                action.user
            ]
        case "EDIT_USER":
            return state.map((user)=>{
                if(user._id === action._id){
                    console.log(user);
                    return {
                        ...user,
                    }
                }else{
                    return user;
                }
            })
        case "REMOVE_USER":
            return state.filter((user)=>(user._id!==action._id));
        case "GET_USERS":
            return action.users
        case "CLEAN_USERS":
            return []
        case "USERS_ERROR":
            return {
                ...state
            }
        case "LOGOUT":
            return []
        default:
            return state;
    }
}

export default usersReducer;