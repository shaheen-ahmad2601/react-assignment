
export const ADD_REGISTER = "ADD_REGISTER"


export const addRegister = (data)=>{
    return{
        type:ADD_REGISTER,
        payload:data
    }
}