import axios from "axios";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from './AccountPage.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
const cx = classNames.bind(styles)
function EditPage() {
    const {id}=useParams()
    const [place,setPlace] = useState()
  const [title,setTitle]=useState('')
  const [address,setAddress]=useState('')
  const [addedPhotos,setAddedPhotos]=useState([])
  const [desc,setDesc]=useState('')
  const [extraInfo,setExtraInfo]=useState('')

  const [price,setPrice]=useState('')
  const [maxGuests,setMaxGuests]=useState(1)
  const [redirect,setRedirect]=useState(false)
  function inputHeader(text){
    return   <h2 for="exampleInputEmail1">{text}</h2>
  }
  function inputDesc(text){
    return  <p id="emailHelp" className="form-text text-muted">{text}</p>
  }
  function preInput(header,desc){
    return(
      <>
        {inputHeader(header)}
        {inputDesc(desc)}
      </>
    )
  }
  async function upload(e) {
    const files = e.target.files
    const data = new FormData()
    for(let i =0; i<files.length;i++){
      data.append('photos',files[i])
    }
    await axios.post('http://localhost:6060/upload',data,)
    .then(res=>{
     const {data}= res
     setAddedPhotos((pre)=>{
      return [...pre,...data]
     })
    })
   }
    async function addNewPlace (e){
      e.preventDefault()
      const {data} = await axios.put('http://localhost:6060/places',{
        id,title,address,addedPhotos,desc,maxGuests,price
       })
    }
    function removeImg(value){
     setAddedPhotos(pre=>{
      return [...addedPhotos.filter(item=>item!==value)]
     })
    }
    useEffect(()=>{
         axios.get(`http://localhost:6060/places/`+id)
         .then(res=>{
          const {data} = res
          setTitle(data.title)
          setAddress(data.address)
          setPrice(data.price)
          setAddedPhotos(data.addedPhotos)
          setDesc(data.desc)
          setMaxGuests(data.maxGuests)
         })
    },[])

    return ( 
        <div>

          <Link to={'/'}>
            <button className={cx('btn-back')}>Back</button>
          </Link>
     <form onSubmit={addNewPlace}>
     <div className="form-group">
       {preInput('Title','title your place')}
       <input type="text" value={title} onChange={e=>setTitle(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" />
     </div>
     <div className="form-group">
     {preInput('Address','Address your place')}
       <input type="text" value={address} onChange={e=>setAddress(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Address" />
     </div>
     <div>
     {preInput('Photos','photo your place')}
           <div>
             <div className={cx('upload-by-link')}>
             {addedPhotos.map((value,index)=>{
               return(
                 <div key={index} className={cx('wrap-img')}>
                   <img className={cx('img-upload')} src={`http://localhost:6060/${value}`} alt=""/>
                   <p onClick={()=>removeImg(value)} className={cx('btn-delete')}><FontAwesomeIcon  icon={faTrash}/></p>
                 </div>
                   )
                   
                 })}
                 </div>
           </div>
     <label  multiple className={cx('upload')} for="file">
       <input multiple onChange={upload} type="file" className={cx('input-file')} id="file"/>
     <FontAwesomeIcon icon={faCloudArrowUp}/>
       Upload
       </label>
     </div>
     {preInput('Description','Descriptionitle your place')}
     <div> 
      <textarea value={desc} onChange={e=>setDesc(e.target.value)} className={cx('desc')}/>
     </div>
     {preInput('Price','Price your place')}
     <textarea value={price} onChange={e=>setPrice(e.target.value)} className={cx('desc')}/>
         <div className={cx('wrap-check')}>
         <div>
           <p>Max number</p>
           <input value={maxGuests} onChange={e=>setMaxGuests(e.target.value)} type="text"  placeholder=""/>
         </div>
         </div>
     
         <button className={cx('btn-save')} >SAVE</button>
     </form>
        </div>
     );

}

export default EditPage;