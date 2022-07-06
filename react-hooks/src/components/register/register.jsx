import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addRegister } from "./action"
import { store } from "../store"


export const Register = ()=>{
    let register = useSelector((store)=>store.register.register)
    let state = store.getState()
    console.log(state)
    let navigate = useNavigate()
    // console.log("r-",register)

    let dispatch = useDispatch()
    let [register_data,setdata] = useState({
        name:"",
        email:"",
        password:"",
        username:"",
        mobile:"",
        description:"",
    })
 

    let handlechange = (e)=>{
        const {name , value} = e.target;

        setdata({
            ...register_data,
            [name]:value
        })
    }
   
  const getdata = async(e)=>{
      e.preventDefault()
      try {
          let data = JSON.stringify(register_data)
          let res = await fetch("https://masai-api-mocker.herokuapp.com/auth/register",{
              method:"POST" ,
              body:data,
              headers:{
                  "Accept":"application/json",
                  "content-type":"application/json",
              },
          });
        
          let regis_data = await res.json()
          if(regis_data.error === false){
              dispatch(addRegister(register_data))
              
              navigate("/login")
          }
          else{
              alert("User already exists")
          }
          
        
      } catch (error) {
          console.log(error)
      }
   
  }  

    return (
        <div>
           <form action="" onSubmit={getdata}>
               <input type="name" value={register_data.name} onChange={handlechange} required={true} placeholder="name" name="name"/>
               <br />
               <input type="email" value={register_data.email} onChange={handlechange} required={true} placeholder="email" name="email"/>
               <br />
               <input type="password" value={register_data.password} onChange={handlechange} required={true} placeholder="password" name="password"/>
               <br />
               <input type="username" value={register_data.username} onChange={handlechange} required={true}  placeholder="username" name="username"/>
               <br />
               <input type="number" value={register_data.mobile} onChange={handlechange} required={true}  placeholder="number" name="mobile"/>
               <br />
               <input type="desc" value={register_data.description} onChange={handlechange} required={true}  placeholder="Description" name="description"/>
               <br />
               <input type="submit" value="Submit" placeholder="Submit"/>
           </form>
      
           

           
        </div>
    )
}