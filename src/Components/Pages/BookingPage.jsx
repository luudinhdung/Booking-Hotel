import axios from "axios";
import { useEffect,useContext, useState } from "react";
import { UserContext } from "../User/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { differenceInCalendarDays, format } from "date-fns"
import styles from './BookingPage.module.scss'
import classNames from "classnames/bind";
const cx = classNames.bind(styles)
function BookingPage() {
    const user = useContext(UserContext)
    const [bookings,setBookings]= useState()
    let day
    useEffect(()=>{
    if(user.user){
                axios.get('http://localhost:6060/booking')
                .then(res=>{
                    if(user.user){
                        const data = res.data.filter(item=>item.userBooking === user.user._id) 
                        setBookings(data)
                    }
                })
            }
        },[user])
        if(bookings){
            day = bookings.map((booking,index)=>{
                return (differenceInCalendarDays(new Date(booking.checkOut),new Date(booking.checkIn)))
           })
        }
        return ( 
        <div>
           {bookings?
           <div>
            {bookings.map((booking,index)=>{
                
                return (
                    <div key={index} className={cx('wrapper')}>
                        <img className={cx('img')} src={`http://localhost:6060/${booking.place.addedPhotos[0]}`} alt="" />
                        <div className={cx('wrap-children')}>
                            <h4>{booking.place.title}</h4>
                            <span>{format(new Date(booking.checkIn), 'dd/MM/yyyy')}</span>
                            <FontAwesomeIcon className={cx('icon')} icon={faArrowRight}/>
                            <span>{format(new Date(booking.checkOut), 'dd/MM/yyyy')}</span>
                            <p>Số người tố đa {booking.place.maxGuests} người</p>
                            <p>Tổng tiền : {day[index]*booking.place.price}$</p>
                        </div>
                    </div>
                )
            })}
           </div>:
           <div>
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
           </div>
           }
        </div>
     );
}

export default BookingPage;