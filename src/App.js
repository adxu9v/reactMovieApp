import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {Route,Routes,Link, useLocation} from 'react-router-dom'
import Detail from './components/Detail';
import {useSelector} from 'react-redux'
function App() {
  const storeData = useSelector(state => state)
  const urlLocation = useLocation()
  const apiKey = process.env.REACT_APP_API_KEY
  const [loading,setLoading] = useState(true)
  const [movieData,setMovieData] = useState([]);
  const [movieSearch,setMovieSearch] = useState('')
  const movieList =  () => { axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=ko&page=1&region=KR`)
  .then((res)=>{ setMovieData(res.data.results); setLoading(false)
    })
  }
  const handleonSubmit =  () => {
     axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ko&page=1&region=KR&query=${movieSearch}`)
    .then((res)=>{setMovieData(res.data.results); console.log(movieSearch)
    })
  }
 useEffect( () => { 
   movieList()
   }, []
   )
  return (
    <div className="App">
      <nav>
        <h2 className='logo'>
          <Link to='/'> Movie <span>App</span></Link>
        </h2>
        {urlLocation.pathname === '/' ?
        <form onSubmit={ (e) => {handleonSubmit(); e.preventDefault()} }>
          <input type="search" onChange={ (e) => { setMovieSearch(e.target.value); console.log(e.target.value)} } name="movieSearch" className="movieSearch" placeholder='search...' />
        </form> : null}
      </nav>
      <Routes>
        <Route path='/' element={loading ? <div>Loading...</div> : <ul className='movieList'>{ movieData.map((a,i)=>
        <li key={a.id}>
          <Link to={`/detail/${i}`}>
          <img className='listImg' alt='posterImg' src={`https://image.tmdb.org/t/p/w500/${movieData[i].poster_path}`}/>
          <div className='movieDataBox'>
          <h2>{movieData[i].title ?? movieData[i].name}</h2>
          <p>개봉일 : {movieData[i].release_date}</p>
          <p>평점 : {movieData[i].vote_average.toFixed(1)}</p>
          </div>
          </Link>
          </li>
          )}</ul>}></Route>
        <Route path='/detail/:id' element={<Detail movieData={movieData}></Detail>}></Route>
      </Routes>
    </div>
  );
}
function Card(){
return(
  <>
  
  </>
)

}

export default App;
