import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom'

function Detail({movieData}){
  useEffect(()=>{
    window.scrollTo(0,0)
    document.querySelector('body').style.position = 'fixed'
    console.log(movieData[id].overview == '')
    return ()=>{
      document.querySelector('body').style.position = 'relative'
    }
  },[])
  let {id} = useParams()
  return (
<div className='detailContainer'>
<div className='detailImgBox'>
  <div className='bgImgGradient'></div>
  <img src={`https://image.tmdb.org/t/p/w500/${movieData[id].poster_path}`} className='bgImg'/>
</div>
      <div className='detailContentBox' >
        <img className='detailImg' src={`https://image.tmdb.org/t/p/w500/${movieData[id].poster_path}`}/>
        <div className='detailTextBox'> <h2 className='detailTitle'>{movieData[id].title}</h2>
        <h3 className='detailEnTitle'>{movieData[id].original_title}</h3>
    <p className='detailOverview'> {movieData[id].overview !== '' ? movieData[id].overview : '아직 내용이 공개되지 않았습니다. 추후 업데이트 예정입니다.'}</p></div>
    </div>
    </div>
      
    
       
    

  )
}
export default Detail
