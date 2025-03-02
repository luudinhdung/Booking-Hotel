import { useEffect, useState,useContext } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { Navigate,Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from './HomePage.module.scss'
import { UserContext } from "../User/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles)
function HomePage() {
    const user = useContext(UserContext)
    const [data,setData]=useState([])
    const [places,setPlaces] = useState([])
    const [redirect,setRedirect]=useState(false)
    let role
    async function handel() {
        await axios.get('http://localhost:6060/test')
                 .then(res=>{
                    setData(res.data)
                 })
     }

     useEffect(()=>{
          axios.get('http://localhost:6060/place')
         .then(res=>{
            const {data} = res
            setPlaces(data)
         })
     },[])
     useEffect(()=>{
         if(data.length>0){
            if(data[0].pass){
                alert(data[0].mess)
                setRedirect(true)
            }else{
                alert(data[0].mess)
            }
         }
     },[data])
     if(user.user){
        role = user.user.role
     }
     if(redirect){
        return <Navigate to={'/test'}/>
     }
    return ( <div>
        <Header />
        <button onClick={()=>handel()} className={cx('btn-add')}>Add New Place </button>

        <div className={cx('wrapper')}>
        {places?places.map((place,index)=>{
                return (
                  <Link key={index} to={role==='admin'?`/edit/${place._id}`:`/detail/${place._id}`}>
                           <div key={index} className={cx('place')}>
                                <img className={cx('img')} src={`http://localhost:6060/${place.addedPhotos[0]}`} alt="" />
                                <h4 className={cx('title')}>{place.title}</h4>
                              <div className={cx('address')}>  {place.address}</div>
                               <div className={cx('wrap-price')}> <span  className={cx('price')}>{place.price}</span> <span className={cx('')}>Tổng thuế cước</span></div>
                           </div>
                  </Link>
                       
                )
            }):  <div>
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
           </div>}
            </div>
    </div> );
}

export default HomePage;