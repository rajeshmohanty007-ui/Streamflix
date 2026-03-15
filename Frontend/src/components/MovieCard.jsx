import React from 'react'
import './components.css'
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({props}) => {
  const navigate = useNavigate();
  function getMovie(id) {
    navigate(`/movie-details/${id}`);
  }
  const mediaQuery = window.matchMedia('(max-width: 800px)');
  let star = (mediaQuery.matches)? "15px":"32px";
  return (
    <div className='movieCard' onClick={()=> getMovie(props.id)}>
        <div className="thumbnail"></div>
        <div className='movieDetails'>
          <h2 className='movieName'>{props.name}</h2>
          <div>{[...Array(Math.round(props.review_stars))].map((_, index)=>(
            <StarIcon key={index} sx={{color:'#edda0a', fontSize: star}}/>
          ))}</div>
        </div>
    </div>
  )
}

export default MovieCard