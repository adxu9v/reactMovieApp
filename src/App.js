import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {Route,Routes,Link, useNavigate, useLocation} from 'react-router-dom'
import Detail from './components/Detail';
function App() {
  const navigate = useNavigate()
  const urlLocation = useLocation()
  const url = process.env.REACT_APP_API_KEY
  const refresh = () => {window.location.reload()}
  const [loading,setLoading] = useState(true)
  const [movieDay,setMovieDay] = useState('day')
  const [movieData,setMovieData] = useState([]);
  const [movieSearch,setMovieSearch] = useState('')
  const movieList =  async ()=>{await axios.get(`https://api.themoviedb.org/3/trending/movie/${movieDay}?api_key=${url}&language=ko&page=1&region=KR`)
  .then((res)=>{setMovieData(res.data.results); setLoading(false)})}
  const handleonSubmit = async (e) => {e.preventDefault(); 
    await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${url}&language=ko&page=1&region=KR&query=${movieSearch}`)
    .then((res)=>{setMovieData(res.data.results);})
    }
 useEffect(()=>{movieList();handleonSubmit();},[movieDay])

  return (
    <div className="App">
      <nav>
        <h2 className='logo' onClick={()=>{navigate('/'); refresh()}}>Movie App</h2>
        {urlLocation.pathname == '/' ? <form onSubmit={handleonSubmit}>
          <input type="search" onChange={(e)=>{setMovieSearch(e.target.value)}} name="movieSearch" className="movieSearch" placeholder='search...' />
        </form> : null}
      </nav>
      <Routes>
        <Route path='/' element={loading ? <div>Loading...</div> : <ul className='movieList'>{movieData.map((a,i)=>
        <li key={a.id}>
          <Link to={`/detail/${i}`}>
          <img className='listImg' src={`https://image.tmdb.org/t/p/w500/${movieData[i].poster_path}`}/>
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

export default App;
