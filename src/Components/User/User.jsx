import axios from "axios";
import { createContext,useEffect, useState } from "react";

export const UserContext = createContext()
function User({children}) {
    const [user,setUser]= useState(null)
    useEffect(()=>{
            if(!user){
            axios.get('http://localhost:6060/profile').then(({data}) => {
                setUser(data);
              })
        }
        },[])
    return (
        <UserContext.Provider value={{user,setUser}}>
        {children}
        </UserContext.Provider>
        );
}

export default User;