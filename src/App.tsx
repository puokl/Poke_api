import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPoke from "./components/SearchPoke";
import PokePage from "./components/PokePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<PokePage />} />
        <Route path="/" element={<SearchPoke />} />
      </Routes>
    </Router>
  );
}

export default App;
