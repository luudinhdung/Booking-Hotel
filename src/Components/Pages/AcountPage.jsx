import Header from "../Header/Header";
import { Link } from "react-router-dom";
import styles from './AccountPage.module.scss'
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useState,useContext } from "react";
import { UserContext } from "../User/User";
import axios from "axios";
import { Navigate } from "react-router-dom";
import BookingPage from "./BookingPage";
import ManagePage from "./ManagePage";
const cx = classNames.bind(styles)
function AcountPage() {
    const {user,setUser} = useContext(UserContext)
    const [redirect,setRedirect]=useState(false)
    let {slug} = useParams()
    if(slug ===undefined){
        slug = 'profile'
    }
    let role 
    if(user){
        role = user.role
    }
    function classList(type=null){
        let classes = 'button'
        if(type=== slug || (slug === undefined && type ==='profile')){
            classes ='target'
        }
        return classes
    }
   async function handelLogout(){
       await axios.post('http://localhost:6060/logout')
       setUser(null)
       setRedirect(true)
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    return(
      <div>
            <div>
                <Header/>
            <div className={cx('wrapper')}>
                <Link className={cx(classList('profile'),'button')} to={'/account'}>My Account</Link>
                {role==='admin' ?
                <Link className={cx(classList('manage'),'button')}  to={'/account/manage'}>Manager</Link>
                : <Link className={cx(classList('booking'),'button')}  to={'/account/booking'}>Booking</Link>}
            </div>
            {slug === 'profile' &&(
            <div className={cx('info')}>
                {user ?  <h4 className={cx('title')}>Logged in as {user.name} ({user.email})</h4> :  null}
                {user?   <button onClick={handelLogout} className={cx('btn-logout')}>Logout</button>: 'you are not logged'}
            </div>
            )}
          
    
            </div>
          {slug === 'booking' &&(
    <div className={cx('info')}>
       <BookingPage />          
    </div>
    )}
       {slug === 'manage' &&(
    <div className={cx('info')}>
       <ManagePage />          
    </div>
    )}
      </div>
    );
}

export default AcountPage;