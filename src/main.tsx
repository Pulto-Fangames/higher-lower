import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./pages/Main";
import Game from "./pages/Game";
import NotFound from "./pages/Not-found";

import "./styles/index.css";

import Starry from "./components/Starry";

const bestScore = localStorage.getItem("CLASSIC_BEST_SCORE");
if (bestScore === null) {
  localStorage.setItem("CLASSIC_BEST_SCORE", "0");
}

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <BrowserRouter>
    <Starry>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Starry>
  </BrowserRouter>
);