import axios from "axios";
import { useEffect, useState,useContext,useRef } from "react";
import { UserContext } from "../User/User";
import styles from './Comment.module.scss'
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate } from "react-router-dom";
import { format } from "date-fns";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles)
function Comment({select}) {
    const user=useContext(UserContext)
    const [comment,setComment] = useState('')
    const [content,setContent]=useState([])
    const [redirect,setRedirect] = useState(false)
    const [update,setUpdate] = useState(false)
    const time = format(new Date(), "hh:mm dd/MM/yyyy")
    let id
    if(user.user){
        id =user.user._id
    }
    async function handelComment(){
        if(user.user){
            await axios.post('http://localhost:6060/comment',{comment,user:user.user,time,select})
            setComment('')
            await axios.get('http://localhost:6060/comment')
            .then(
                res=>{
                    const data= res.data.filter(item=>item.bookingId === select)
                    setContent(data);
                }
            )
        }else{
          setRedirect(true)
        }

    } 
    async function handelDelete(id){
        await axios.delete(`http://localhost:6060/delete/${id}`)
        .then(res=>console.log(res.data))
        await axios.get('http://localhost:6060/comment')
        .then(
            res=>{
                const data= res.data.filter(item=>item.bookingId === select)
                setContent(data);
            }
        )
    }
    async function handelEdit(id){
        await axios.get('http://localhost:6060/comment')
        .then(
            res=>{
                const data= res.data.find((item)=>item._id===id)
                setComment(data.content)
                setUpdate(true)
            }
            )
            
        }
     
    async function completeUpdate(id){
        await axios.put('http://localhost:6060/comment',{content:comment,id})
        .then(res=>console.log(res.data))
        await axios.get('http://localhost:6060/comment')
            .then(
                res=>{
                    const data= res.data.filter(item=>item.bookingId === select)
                    setContent(data);
                }
            )
    }
    useEffect(()=>{
        if(comment === ''){
            setUpdate(false)
        }
    },[comment])
 
    useEffect(()=>{
         axios.get('http://localhost:6060/comment')
        .then(
            res=>{
                const data= res.data.filter(item=>item.bookingId === select)
                setContent(data);
            }
        )
    },[])
    
    if(redirect){
        return <Navigate to={'/login'}/>
    }
    return (
        <div  className={cx('comment')}>
        <div className={cx('input')}>
            <p>Viết bình luận của bạn</p>
            <input value={comment} onChange={e=>setComment(e.target.value)}  type="text"/>
            <button className={cx('btn')} onClick={()=>handelComment()}> 
            <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
        </div>
        {content ? 
            content.map((content,index)=>{
                return (
                    <div key={index} className={cx('wrap-comment')}>
                    <div  className={cx('wrapper')}>
                            <div className={cx('wrap-avatar')}>
                                <img className={cx('avatar')} src={`http://localhost:6060/${content.user.avatar}`} alt="" />
                            </div>
                        <div className={cx('info')}>
                             <div className={cx('name')}>
                                    {content.user.name}
                            </div>
                                <div className={cx('content')}>
                                {content.content}
                                </div>
                            <div className={cx('time')}>
                                <p>Lúc {content.time}</p>
                            </div>
                        </div>
                    </div>
                    {user.user && user.user._id === content.user._id ? 
<div>
                        <button className={cx('btn-options')} onClick={()=>handelDelete(content._id)}>Xoá</button>
                        <button className={cx('btn-options')} onClick={()=>handelEdit(content._id)}>Sửa</button>
                        {update ? 
                                     <button className={cx('btn-options')} onClick={()=>completeUpdate(content._id)}>update</button>
                                 
                                 :
                                 ''
                                 }
</div>
                    :''}
            </div>
                )
            })
        :''}
       </div>
      );
}

export default Comment;