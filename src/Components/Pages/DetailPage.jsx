import axios from "axios";
import { useEffect, useState,useContext,useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import format from "date-fns/format";
import classNames from "classnames/bind";
import styles from './DeatilPage.module.scss'
import Comment from "./Comment";
import { UserContext } from '../User/User';

const cx=classNames.bind(styles)
function DetailPage() {
    const {id} = useParams()
    const  user =  useContext(UserContext)
    const [data,setData] = useState({})
    const [name,setName]=useState('')
    const [checkIn,setCheckIn]=useState('')
    const [checkOut,setCheckOut]=useState('')
    const [phone,setPhone]=useState('')
    const [max,setMax] =useState(1)
    const [redirect,setRedirect] = useState(false)
    const wrap= useRef()
    useEffect(()=>{
        axios.get('http://localhost:6060/detail')
        .then(res=>{
            const data = res.data.find(item=>item._id === id)
            setData(data)
        })
    },[id])
    async function handelSubmit(e){
      e.preventDefault()
      if(user.user){
        const data = await axios.post('http://localhost:6060/booking',{
          id:id,
          userId:user.user._id,
          checkIn:format(new Date(checkIn),'MM/dd/yyyy'),
          checkOut:format(new Date(checkOut),'MM/dd/yyyy'),

        })
        alert("Dat phong thanh cong")
      }else{
        setRedirect(true)
      }
    }

    if(redirect){
      return <Navigate to={'/login'}/>
    }

    return ( 
        
        <div >
            <Header />
            <div className={cx('title')}><h2>{data.title}</h2></div>
       <div className={cx('wrapper')}>
                <div className={cx('wrap-img')}>
                  {data.addedPhotos ? 
                    data.addedPhotos.map((item,index)=>{
                        return (
                            <div key={index} className={cx('img-list')}>
                                <img className={cx('img-item')} src={`http://localhost:6060/${item}`}/>
                            </div>
                        )
                    })
                  :''}
                </div>
       </div>
     <div className={cx('desc')}>
           <p>
            {data.desc}
           </p>
     </div>
 <div className={cx('wrap')}>
         <form onSubmit={handelSubmit}>
              <div>
              <div className={cx('wrapper-book')}>
                <h3>{data.price}$/Đêm</h3>
                <div className={cx('wraper-check')}>
                <div className={cx('input-check')}>
                    <label>Check In</label>
                    <input name='checkIn' value={checkIn} onChange={e=>setCheckIn(e.target.value)} className={cx('input-date')}  type="date"/>
                </div>
                <div className={cx('input-check')}>
                    <label>Check Out</label>
                    <input  value={checkOut} onChange={e=>setCheckOut(e.target.value)} className={cx('input-date')}  type="date"/>
                </div>
                </div>
                <div className={cx('wrap-text')}>
                  <label htmlFor="">Your full name</label>
                  <input  value={name} onChange={e=>setName(e.target.value)} className={cx('input-text')} type="text" />
                </div>
                <div className={cx('wrap-text')}>
                  <label htmlFor="">Phone number</label>
                  <input  value={phone} onChange={e=>setPhone(e.target.value)} className={cx('input-text')} type="text" />
                </div>
                <div className={cx('wrap-text')}>
                  <label htmlFor="">Max Guess</label>
                  <input  value={max} onChange={e=>setMax(e.target.value)} className={cx('input-text')} type="text" />
                </div>
                <button  className={cx('booking-btn')}>
                  Book
                  </button>
                        
              </div>
            </div>
          </form>
 </div>
                  <Comment select={id} />

           </div>
         
     );
}

export default DetailPage;