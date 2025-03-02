import axios from "axios";
import { useEffect, useState } from "react";

function ManagePage() {
    const [data,setData] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:6060/user')
        .then(res=>{
            const {data} = res
            setData(data)
        })
    },[])

    return (  

        <div style={{width:'700px'}}>
            {data?
         <table class="table">
         <thead class="thead-dark">
           <tr>
             <th scope="col">stt</th>
             <th scope="col">Name</th>
             <th scope="col">Email</th>
             <th scope="col">role</th>
           </tr>
         </thead>
         <tbody>
         {data.map((item,index)=>{
            return(
             <tr>
             <th scope="row">{index}</th>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.role}</td>
                        </tr>
            )
                        })}
           
         </tbody>
        
       </table>
            :''}
        </div>
    );
}

export default ManagePage;