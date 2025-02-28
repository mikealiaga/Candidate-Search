import { Routes, Route } from "react-router-dom";
import CandidateSearch from "./pages/CandidateSearch";
import SavedCandidates from "./pages/SavedCandidates";
import Nav from "./components/Nav";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<CandidateSearch />} />
          <Route path="/saved" element={<SavedCandidates />} />
          <Route path="*" element={<ErrorPage />} /> {/* Handles all unknown routes */}
        </Routes>
      </main>
    </>
  );
}

export default App;