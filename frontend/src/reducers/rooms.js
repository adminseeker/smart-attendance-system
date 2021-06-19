const defaultRoomState = []

const roomsReducer = (state=defaultRoomState,action)=>{
    switch(action.type){
        case "ADD_ROOM":
            return [
                ...state,
                action.room
            ]
        case "EDIT_ROOM":
            return state.map((room)=>{
                if(room._id === action._id){
                    console.log(room);
                    return {
                        ...room,
                    }
                }else{
                    return room;
                }
            })
        case "REMOVE_ROOM":
            return state.filter((room)=>(room._id!==action._id));
        case "GET_ROOMS":
            return action.rooms;
        case "ROOMS_ERROR":
            return {
                ...state
            }
        case "LOGOUT":
            return []
        default:
            return state;
    }
}

export default roomsReducer;