const defaultClassState = []

const classesReducer = (state=defaultClassState,action)=>{
    switch(action.type){
        case "ADD_CLASS":
            return [
                ...state,
                action._class
            ]
        case "EDIT_CLASS":
            return state.map((_class)=>{
                if(_class._id === action._id){
                    console.log(_class);
                    return {
                        ..._class,
                    }
                }else{
                    return _class;
                }
            })
        case "REMOVE_CLASS":
            return state.filter((_class)=>(_class._id!==action._id));
        case "GET_CLASSES":
            return action.classes;
        case "CLASSES_ERROR":
            return {
                ...state
            }
        case "LOGOUT":
            return []
        default:
            return state;
    }
}

export default classesReducer;