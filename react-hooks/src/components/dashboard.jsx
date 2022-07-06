import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import "./dashboard.css"


export const Dashboard= ()=>{

 let loginstore = useSelector((store)=>store.login.login)
 let [page , setpage] = useState(1)
 console.log(page)
let [reqstate , setdata] = useState([])


let handlepage = (value)=>{

    if(page==2 || page==0 ){
       page = 1
    }
    setpage(page+value)
    console.log(page)
}
 let getreqdata = async()=>{
     try {
         let res = await fetch(`https://reqres.in/api/users?page=${page}`)
         let data = await res.json()
  
         setdata(data.data)
     } catch (error) {
         console.log(error)
     }
 }
 useEffect(()=>{getreqdata()},[page])

    return(
        <div>
              <div  className="grid">
                  <div>
           {loginstore.map(e=><div>
            <p>Name-{e.name}</p>
            <br/>
            <p>Mobile-{e.mobile}</p>
            <br/>
            <p>Email-{e.email}</p>
            <br/>
            <p>Username-{e.username}</p>
            <br/>
            <p>Description-{e.description}</p>
            </div>)}
            </div>
            <div>
                {reqstate.map(e=><div><img src={e.avatar}></img><p>{e.first_name} {e.last_name}</p><p>{e.email}</p></div>)}
                <button onClick={()=>{handlepage(-1)}}>Previous</button>
                <button onClick={()=>{handlepage(1)}}>Next</button>
          
            </div>
            
    </div>
        </div>
    )
}