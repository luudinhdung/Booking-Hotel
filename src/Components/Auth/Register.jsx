import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import classNames from "classnames/bind"
import style from './Auth.module.scss'

const cx = classNames.bind(style) 

const  RegisterPage =()=>{
  const [data,setData] = useState({})
  const [email,setEmail] = useState('')
  const [role,setRole] = useState('')
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [avatar,setAvatar] =useState('')

  async function registerUser(e){
    e.preventDefault()
    if(email&&password&&role&&avatar){
         await axios.post('http://localhost:6060/register',{
          name,
          email,
          password,
          role,
          avatar
        }).then( (res)=>{
          setData(res.data)
        })
      }else if((email&&password&&role&&!avatar)){
        await axios.post('http://localhost:6060/register',{
          name,
          email,
          password,
          role,
          avatar:'uploads\\61c80a1a32d6acc85e21ec2912c4d847.webp'
        }).then( (res)=>{
          setData(res.data)
        })
      }
    }
    console.log(avatar);
    async function handel(e){
      const files = e.target.files
      const data = new FormData()
      data.append('photos',files[0])
      await axios.post('http://localhost:6060/avatar',data,)
      .then(res=>{
       const {data}= res
       setAvatar(data)
      })
    }
    useEffect(()=>{
      if(data.mess !== undefined)
        alert(data.mess)
    },[data])
    return (
      <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <div  className={cx('wrap')}>

        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          
           <input type="text"
                 placeholder="your name"
                 value={name}
                 onChange={ev => setName(ev.target.value)} 
                 />
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} 
                 />
          <input type="password"
                 placeholder="password"
                 value={password}
                 onChange={ev => setPassword(ev.target.value)} />
                    <input type="text"
                 placeholder="your role"
                 value={role}
                 onChange={ev => setRole(ev.target.value)} 
                 />
                   <label className={cx('btn-img')} htmlFor="" for="file">
                      choose img
                      </label>
                  {avatar ? 
                  <div className={cx('wrap-avatar')}>
                    <img className={cx('avatar-img')} src={`http://localhost:6060/${avatar}`} alt="" />
                  </div>
                  : ''}
                <input type="file" onChange={handel} id="file" style={{display:'none'}}/>
                 <div className={cx('btn-regist')}>

          <button className="primary" >Register</button>
                 </div>
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
          </div>
        </form>
        </div>
      </div>
    </div>
    )
}

export default RegisterPage