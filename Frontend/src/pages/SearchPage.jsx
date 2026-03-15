import React from "react";
import { useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import HistoryIcon from "@mui/icons-material/History";
import "./pages.css";
import { useEffect } from "react";
import VScard from "../components/VScard";

const mediaQuery = window.matchMedia("(max-width: 800px)");
let headerH = mediaQuery.matches ? "5vh" : "10vh";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const movieName = searchParams.get("q");
  const [searchValue, setSearchValue] = useState(movieName);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(true);
  const [navbarVisible, setnavbarVisible] = useState(false);
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(null);

  function navClick(i) {
    document.querySelectorAll(".navIcon").forEach((e) => {
      e.classList.remove("activeNav");
    });
    document.querySelectorAll(".navIcon")[i].classList.add("activeNav");
  }
  function searchMovie(name) {
    if (!name.trim()) return;
    sessionStorage.setItem("lastSearch", name);
    navigate(`/search?q=${name}`);
  }
  async function findMovie(name) {
    const res = await fetch("https://streamflix-5ih9.onrender.com/movies");
    const movieList = await res.json();

    const result = movieList.filter(
        (e) => e.name.toLowerCase().includes(name.toLowerCase())
      )
    if(result.length) setMovie(result);
    else setError(`Couldn't find any movie with name "${name}"`);
  }

  useEffect(() => {
    async function load() {
      await findMovie(movieName);
    }
    load();
  }, [movieName]);
  useEffect(() => {
  setSearchValue(movieName);
}, [searchParams]);

  return (
    <div className="VSpage">
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
      <main className="VSresultGrid flex">
        {Array.isArray(movie) &&
          movie.map((e) => (
            <VScard key={e.id} props={e} />
          ))}
          {error}
      </main>
    </div>
  );
};

export default SearchPage;
