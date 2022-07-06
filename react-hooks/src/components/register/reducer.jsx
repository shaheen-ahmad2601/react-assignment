import { ADD_REGISTER } from "./action"



export const Registerstore = {
    register:[]
}

export const registerReducer = (store = Registerstore , {type , payload})=>{
    switch(type){
        case ADD_REGISTER:return{...store , register:[...store.register,payload]}
        default:return store
    }
}