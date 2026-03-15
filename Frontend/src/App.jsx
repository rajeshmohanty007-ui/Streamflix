import React from "react"
import "./App.css"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import VibeSearchPage from "./pages/VibeSearchPage"
import SearchPage from "./pages/SearchPage"
import MovieDetails from "./pages/MovieDetails"


function App() {
  
  return (
    <>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/vibeSearchResult" element={<VibeSearchPage/>} />
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/movie-details/:id" element={<MovieDetails/>}/>
        </Routes>
    </>
  )
}

export default App
