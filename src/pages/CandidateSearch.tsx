import { useState, useEffect } from "react";
import { searchGithubUser } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidate = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const data = await searchGithubUser();
      console.log("Fetched new candidate:", data); // Debugging log
  
      if (!data || Object.keys(data).length === 0) {
        console.error("API returned empty data:", data);
        setError("No candidates available.");
        setCandidate(null);
      } else {
        setCandidate(data);
      }
    } catch (error) {
      console.error("Error fetching candidate:", error);
      setError("Failed to load candidate.");
      setCandidate(null);
    }
  
    setLoading(false);
  };

  useEffect(() => {
    fetchCandidate(); // Load first candidate when page loads
  }, []);

  const saveCandidate = () => {
    if (!candidate) {
        console.error("No candidate to save.");
        return;
    }

    console.log("Saving candidate:", candidate);

    const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");

    if (!savedCandidates.some((c: Candidate) => c.id === candidate.id)) {
        savedCandidates.push(candidate);
        localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
        console.log("Candidate saved successfully! Current saved candidates:", savedCandidates);
    } else {
        console.warn("Candidate already saved.");
    }

    fetchCandidate(); // Load the next candidate
};

// Skip candidate and load next one
const skipCandidate = () => {
  console.log("Skipping candidate:", candidate); // Debugging log
  fetchCandidate();
};

  return (
    <div>
      <h1>Candidate Search</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {candidate && !loading && !error ? (
        <div className="candidate-card">
          <img src={candidate.avatar_url} alt={candidate.name || "Unknown"} className="candidate-avatar" />
          <div>
            <h2 className="candidate-name">
              {candidate.name || "No Name"} <em>({candidate.login})</em>
            </h2>
            <p>Location: {candidate.location || "Unknown"}</p>
            <p>Email: <a href={`mailto:${candidate.email}`} className="candidate-link">{candidate.email || "Not Provided"}</a></p>
            <p>Company: {candidate.company || "Not Provided"}</p>
            <p className="candidate-bio">
              <strong>Bio:</strong> {candidate && candidate.bio ? candidate.bio : "No bio available."}
            </p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer" className="candidate-link">
              GitHub Profile
            </a>
          </div>
        </div>
      ) : (
        !loading && <p>No more candidates available.</p>
      )}

      {candidate && (
        <div className="button-container">
          <button onClick={skipCandidate} className="skip-button">-</button>
          <button onClick={saveCandidate} className="save-button">+</button>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;