import React from "react";
import "./components.css";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

const VScard = ({ props, index }) => {
  const navigate = useNavigate();
  function getMovie(id) {
    navigate(`/movie-details/${id}`);
  }

  let genre = "";
  for (let i = 0; i < props.genre.length; i++) {
    genre += `${props.genre[i]} `;
  }
  const mediaQuery = window.matchMedia("(max-width: 800px)");
  let star = mediaQuery.matches ? "15px" : "32px";
  return (
    <div
      className="VSmovieCard flex"
      style={{ animation: `slideUp ${index + 1}s ease` }}
      onClick={()=> getMovie(props.id)}
    >
      <div className="VSthumbnail"></div>
      <div className="details">
        <h2 className="h2">{props.name}</h2>
        <div>
          {[...Array(Math.round(props.review_stars))].map((_, index) => (
            <StarIcon key={index} sx={{ color: "#edda0a", fontSize: star }} />
          ))}
        </div>
        <div>
          {Array.isArray(props.genre) &&
            props.genre.map((genre,index) => <div className="genre" key={index}>{genre}</div>)}
          {!Array.isArray(props.genre) && (
            <div className="genre">{props.genre}</div>
          )}
        </div>
        <div>{props.reason}</div>
      </div>
    </div>
  );
};

export default VScard;
