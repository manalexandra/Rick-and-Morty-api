import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CharacterPage from "./pages/CharacterPage";
import AllEpisodes from "./components/AllEpisodes";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character/:id" element={<CharacterPage />} />
          <Route path="/episodes" element={<AllEpisodes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
