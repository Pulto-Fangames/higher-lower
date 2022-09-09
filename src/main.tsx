import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Starry from "react-starry-sky";

import Main from "./pages/Main";
import Game from "./pages/Game";
import NotFound from "./pages/Not-found";

import "./styles/index.css";

const bestScore = localStorage.getItem("CLASSIC_BEST_SCORE");
if (bestScore === null) {
  localStorage.setItem("CLASSIC_BEST_SCORE", "0");
}

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/game">
        <Route path="classic" element={<Game />} />
        <Route path="time" element={<Game />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);