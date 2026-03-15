import React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import HistoryIcon from "@mui/icons-material/History";
import CatagoryItem from "../components/CatagoryItem";
import MovieCard from "../components/MovieCard";

import "../App.css";

//Global variables
const mediaQuery = window.matchMedia("(max-width: 800px)");
let headerH = mediaQuery.matches ? "5vh" : "10vh";


const Home = () => {
  const navigate = useNavigate();
  function searchMovie(name) {
    if (!name.trim()) return;
    sessionStorage.setItem("lastSearch", name);
    navigate(`/search?q=${name}`);
  }
  function vibeSearch(prompt) {
    if (!prompt.trim()) return;
    sessionStorage.setItem("lastPrompt", prompt);
    sessionStorage.removeItem("VSpageNav");
    navigate("/vibeSearchResult", { state: { prompt } });
  }
  function navClick(i) {
    document.querySelectorAll(".navIcon").forEach((e) => {
      e.classList.remove("activeNav");
    });
    document.querySelectorAll(".navIcon")[i].classList.add("activeNav");
  }

  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [VSvalue, setVSvalue] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showVSBar, setShowVSBar] = useState(false);
  const [showShade, setShowShade] = useState(false);
  const [navbarVisible, setnavbarVisible] = useState(false);
  const movieCatagories = [
    "Action",
    "Comedy",
    "Romance",
    "Horror",
    "Thriller",
    "Bollywood",
    "Animation",
  ];
  const [activeCat, setActiveCat] = useState(null);
  const [data, setData] = useState([]);
  const filteredMovies = Array.isArray(data)
    ? data.filter((e) => (activeCat ? e.genre.includes(activeCat) : true))
    : [];

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then((json) => setData(json));
  });
  useEffect(() => {
    if (showSearch) {
      inputRef.current.focus();
    }
  }, [showSearch]);
  useEffect(() => {
  document.getElementById('main').scrollTo({
    top: 0,
    behavior: "smooth"
  });
}, [activeCat]);

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
      <div className="catagory flex">
        {movieCatagories.map((_, i) => (
          <CatagoryItem
            key={i}
            name={movieCatagories[i]}
            isActive={activeCat === movieCatagories[i]}
            handleClick={() => setActiveCat((activeCat !== movieCatagories[i])?movieCatagories[i]:"")}
          />
        ))}
      </div>
      <main id="main">
        <div className="movieGrid">
          {Array.isArray(filteredMovies) && !activeCat &&
            filteredMovies.map((movie) => ( 
              movie.id<20? <MovieCard key={activeCat + movie.id} props={movie} />:""
            ))}
          {Array.isArray(filteredMovies) && activeCat &&
            filteredMovies.map((movie) => ( 
              <MovieCard key={activeCat + movie.id} props={movie} />
            ))}
        </div>
      </main>
      <button
        id="vibeBtn"
        className="flex"
        onClick={() => {
          setShowVSBar((prev) => !prev);
          setShowShade(true);
        }}
      >
        <h2>Vibe Search</h2>
        <SearchIcon
          sx={{ aspectRatio: 1, fontSize: headerH, color: "#e50914" }}
        />
      </button>
      {showVSBar && (
        <div id="VSBar" className="flex">
          <input
            autoComplete="off"
            ref={inputRef}
            type="text"
            id="VSInput"
            placeholder="Search your Vibe"
            value={VSvalue}
            onChange={(e) => setVSvalue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                vibeSearch(VSvalue);
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
            onClick={() => vibeSearch(VSvalue)}
          >
            <SearchIcon sx={{ aspectRatio: 1, fontSize: "200%" }} />
          </div>
        </div>
      )}
      {showShade && (
        <div
          id="shade"
          onClick={() => {
            setShowShade(false);
            setShowSearch(false);
            setShowVSBar(false);
          }}
        ></div>
      )}
    </div>
  );
};
export default Home;
