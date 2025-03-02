import axios from "axios";
import { Link,Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind"
import style from './Auth.module.scss'
import { UserContext } from "../User/User";
const cx = classNames.bind(style)

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [redirect,setRedirect] = useState(false)
  const [data,setData]= useState({})
  const {setUser}= useContext(UserContext)
  const handelSubmit =async (e)=>{
    e.preventDefault()
      const {data}= await  axios.post('http://localhost:6060/login',{email,password})
      setUser(data.user)
      setData(data.user)
     switch (data.mess) {
      case 'Đăng nhập thành công':
        alert(data.mess)
        setRedirect(true)
        break;
        case 'Sai mật khẩu':
          alert(data.mess)
          break;
          case 'email không tồn tại':
            alert(data.mess)
            break;
      default:
        break;
     }
     
  }
  useEffect(()=>{
    if(email,password){
      if(data&& data.mess !== undefined){
       alert(data.mess);  
      }
    }
  },[data])
  if(redirect){
    return <Navigate to={'/'}/>
  }

    return ( 
      <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <div  className={cx('wrap')}>

        <form className="max-w-md mx-auto" onSubmit={handelSubmit}>
         
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} 
                 />
          <input type="password"
                 placeholder="password"
                 value={password}
                 onChange={ev => setPassword(ev.target.value)} />
                 <div className={cx('btn-regist')}>
                
          <button className="primary" >Login</button>
                 </div>
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-black" to={'/register'}>Register</Link>
          </div>
        </form>
        </div>
      </div>
    </div>
    );
}

export default Login;