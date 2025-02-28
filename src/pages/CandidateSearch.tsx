import { useState, useEffect } from "react";
import { fetchRandomGithubUser } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";


const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch a candidate from GitHub API
  const loadCandidate = async () => {
    setLoading(true);
    setError(null);

    try {
      const candidate = await fetchRandomGithubUser();
      console.log("Fetched candidate:", candidate);

      if (!candidate || Object.keys(candidate).length === 0) {
        setError("No candidates available.");
        setCurrentCandidate(null);
      } else {
        setCurrentCandidate(candidate);
      }
    } catch (error) {
      console.error("Error fetching candidate:", error);
      setError("Failed to load candidate.");
      setCurrentCandidate(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadCandidate();
  }, []);

  // Save candidate to localStorage and move to the next one
  const handleSaveCandidate = () => {
    if (!currentCandidate) {
      console.error("No candidate to save.");
      return;
    }

    const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");

    if (!savedCandidates.some((c: Candidate) => c.id === currentCandidate.id)) {
      savedCandidates.push(currentCandidate);
      localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
      console.log("Candidate saved successfully!", savedCandidates);
    } else {
      console.warn("Candidate already saved.");
    }

    loadCandidate();
  };

  // Move to next candidate
  const handleSkipCandidate = () => {
    console.log("Skipping candidate:", currentCandidate);
    loadCandidate();
  };

  return (
    <div>
      <h1>Candidate Search</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {currentCandidate && !loading && !error ? (
        <div className="candidate-card">
          <img src={currentCandidate.avatar_url} alt={currentCandidate.name || "Unknown"} className="candidate-avatar" />
          <div>
            <h2 className="candidate-name">
              {currentCandidate.name || "No Name"} <em>({currentCandidate.login})</em>
            </h2>
            <p>Location: {currentCandidate.location || "Unknown"}</p>
            <p>Email: <a href={`mailto:${currentCandidate.email}`} className="candidate-link">{currentCandidate.email || "Not Provided"}</a></p>
            <p>Company: {currentCandidate.company || "Not Provided"}</p>
            <p className="candidate-bio">
              <strong>Bio:</strong> {currentCandidate.bio ? currentCandidate.bio : "No bio available."}
            </p>
            <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer" className="candidate-link">
              GitHub Profile
            </a>
          </div>
        </div>
      ) : (
        !loading && <p>No more candidates available.</p>
      )}

      {currentCandidate && (
        <div className="button-container">
          <button onClick={handleSkipCandidate} className="skip-button">-</button>
          <button onClick={handleSaveCandidate} className="save-button">+</button>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;