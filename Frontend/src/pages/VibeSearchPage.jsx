import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import "./pages.css";
import VScard from "../components/VScard";

const VibeSearchPage = () => {
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const lastPrompt = sessionStorage.getItem("lastPrompt");
  const [VSvalue, setVSvalue] = useState(lastPrompt);
  const location = useLocation();
  const prompt = location.state?.prompt;
  const [output, setOutput] = useState(() => {
  const stored = sessionStorage.getItem("lastOutput");
  return stored ? JSON.parse(stored) : "";
  });
  const [isNavigated, setIsNavigated] = useState(true);

  async function firstFilter(input) {
    setLoading(true);
    setOutput("");
    const res = await fetch("http://localhost:3000/aiFirstResponse", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
      }),
    });

    const data = await res.json();
    if (data) setIsNavigated(false);
    if(data.error) sessionStorage.removeItem('lastPrompt');
    setOutput(data);
    setLoading(false);
    sessionStorage.setItem("lastOutput", JSON.stringify(data));
    console.log(data);
  }

  function vibeSearch(prompt) {
    if (!prompt.trim()) return;
    if (prompt == lastPrompt) return;
    sessionStorage.setItem("lastPrompt", prompt);
    firstFilter(prompt);
  }
  useEffect(() => {
    if (hasFetched.current) return;
    if (sessionStorage.getItem("VSpageNav")) return;
    sessionStorage.setItem("VSpageNav", true);
    hasFetched.current = true;
    async function load() {
      if (!isNavigated) return;
      await firstFilter(prompt);
    }
    load();
  }, []);

  return (
    <div className="VSpage">
      <div style={{ animation: "none" }} id="VSBar" className="flex">
        <input
          autoComplete="off"
          type="text"
          id="VSInput"
          placeholder="Search your Vibe"
          value={VSvalue}
          onChange={(e) => setVSvalue(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
              vibeSearch(VSvalue)
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
      {loading && (
        <main className="VSresultGrid flex">
          <b>Picking the best movie for you,</b>
          <b>Get your popcorns Ready</b>
          <div className="searchWrapper"><SearchIcon sx={{ aspectRatio: 1, fontSize: "200%" }}/></div>
        </main>
      )}
      {!loading && output.suggestion ? (
        <main className="VSresultGrid flex">{output.suggestion}</main>
      ) : (
        ""
      )}
      {!loading && output.error ? (
        <main className="VSresultGrid flex">{output.error}</main>
      ) : (
        ""
      )}
      {output && !loading && Array.isArray(output) && (
        <main className="VSresultGrid flex">
          {output.map((movie,index) => (
            <VScard key={movie.id} props={movie} index={index} />
          ))}
        </main>
      )}
    </div>
  );
};

export default VibeSearchPage;
