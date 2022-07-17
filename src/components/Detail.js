import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

function Detail({movieData,url}){
  let {id} = useParams()
  const [gen,setGen] = useState(movieData[id].genre_ids)
  const [genId,setGenId] = useState([])
console.log('gen',gen)
   
   useEffect(() => {
    document.querySelector('nav').style.backgroundColor = '#003040';
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${url}`).then((res)=>{console.log('res' ,res.data.genres); setGenId(res.data.genres)})
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  console.log(movieData[id].original_title)
   if(genId.includes(gen)){console.log('genId', gen)}
  return (
<div className='detailBox'>
<div className='imgBox'>
  <div className='bgImgGradient'></div>
  <img src={`https://image.tmdb.org/t/p/w500/${movieData[id].poster_path}`} className='bgImg'/>
</div>
      <div className='detailContainer' >
        {/* <ul>
          <li>{gen[0]}</li>
          <li>{gen[1]}</li>
        </ul> */}
        <img className='detailImg' src={`https://image.tmdb.org/t/p/w500/${movieData[id].poster_path}`}/>
        <div className='detailTextBox'> <h2 className='detailTitle'>{movieData[id].title}</h2>
        <h3 className='detailEnTitle'>{movieData[id].original_title}</h3>
    <p className='detailOverview'> {movieData[id].overview}</p></div>
    </div>
    </div>
      
    
       
    

  )
}
export default Detail
