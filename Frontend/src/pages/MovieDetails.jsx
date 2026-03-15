import React from "react";
import "./pages.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import HistoryIcon from "@mui/icons-material/History";
import StarIcon from "@mui/icons-material/Star";

const mediaQuery = window.matchMedia("(max-width: 800px)");
let headerH = mediaQuery.matches ? "5vh" : "10vh";
let star = mediaQuery.matches ? "15px" : "32px";

const MovieDetails = () => {
  const navigate = useNavigate();
  function searchMovie(name) {
    if (!name.trim()) return;
    sessionStorage.setItem("lastSearch", name);
    navigate(`/search?q=${name}`);
  }
  function navClick(i) {
    document.querySelectorAll(".navIcon").forEach((e) => {
      e.classList.remove("activeNav");
    });
    document.querySelectorAll(".navIcon")[i].classList.add("activeNav");
  }

  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showShade, setShowShade] = useState(false);
  const [navbarVisible, setnavbarVisible] = useState(false);
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://streamflix-5ih9.onrender.com/movies/${id}`)
      .then((res) => res.json())
      .then((json) => setMovie(json));
  }, [id]);
  let genre = (movie)? movie.genre?.join(" ") || "":"";
  return (
    <div>
      <header className="flex">
        <div className="hdiv flex">
          <MenuIcon
            onClick={() => setnavbarVisible((prev) => !prev)}
            sx={{ aspectRatio: 1, fontSize: headerH, cursor: "pointer" }}
          />
          {!showSearch && <h1 id="logo" onClick={()=> navigate("/")}>StreamFlix</h1>}
        </div>
        <div className="hdiv flex">
          {!showSearch && (
            <SearchIcon
              onClick={() => {
                setShowSearch((prev) => !prev);
                setShowShade(true);
              }}
              sx={{ aspectRatio: 1, fontSize: headerH }}
            />
          )}
          <AccountCircleIcon sx={{ aspectRatio: 1, fontSize: headerH }} />
        </div>
        {showSearch && (
          <div id="searchBar" className="flex">
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              ref={inputRef}
              type="text"
              id="searchInput"
              placeholder="Search across 100+ movies"
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchMovie(searchValue);
                }
              }}
            />
            <div
              className="flex"
              style={{
                height: "90%",
                aspectRatio: 1 / 1,
                borderRadius: "50%",
                backgroundColor: "#e50914",
                cursor: "pointer",
              }}
              onClick={() => searchMovie(searchValue)}
            >
              <SearchIcon sx={{ aspectRatio: 1, fontSize: "200%" }} />
            </div>
          </div>
        )}
      </header>
      {navbarVisible && (
        <nav id="navbar">
          <div className="navIcon flex activeNav" onClick={() => navClick(0)}>
            <HomeIcon />
            <p>Home</p>
          </div>
          <div className="navIcon flex" onClick={() => navClick(1)}>
            <WhatshotIcon />
            <p>Trending</p>
          </div>
          <div className="navIcon flex" onClick={() => navClick(2)}>
            <NewReleasesIcon />
            <p>New</p>
          </div>
          <div className="navIcon flex" onClick={() => navClick(3)}>
            <HistoryIcon />
            <p>History</p>
          </div>
        </nav>
      )}
      <main className="movieMain flex">
        <div className="thumbnail-main"></div>
        <div className="mainDetails">
          {movie && (
            <>
              <h1>{movie.name}</h1>
              <div>
                {[...Array(Math.round(movie.review_stars))].map((_, index) => (
                  <StarIcon
                    key={index}
                    sx={{ color: "#edda0a", fontSize: star }}
                  />
                ))}
              </div>
              <li>
                <b>Year:</b> {movie.year}
              </li>
              <li>
                <b>Director:</b> {movie.director}
              </li>
              <li>
                <b>Genre:</b> {genre}
              </li>
              <li>
                <b>Rating:</b> {movie.rating}
              </li>
              <li>
                <b>Synopsis:</b> {movie.short_plot_summary}
              </li>
              <h2>Comments</h2>
              <div className="comments">- No comments yet -</div>
            </>
          )}
        </div>
      </main>
      {showShade && (
        <div
          id="shade"
          onClick={() => {
            setShowShade(false);
            setShowSearch(false);
          }}
        ></div>
      )}
    </div>
  );
};

export default MovieDetails;
