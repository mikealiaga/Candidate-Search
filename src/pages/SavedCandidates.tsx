import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const location = useLocation(); // Track route changes

  // Function to load saved candidates
  const loadSavedCandidates = () => {
    const storedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");

    console.log("🔹 Loaded saved candidates from localStorage:", storedCandidates); // Debugging log

    if (Array.isArray(storedCandidates) && storedCandidates.length > 0) {
      setSavedCandidates(storedCandidates);
    } else {
      console.warn("⚠️ No saved candidates found in localStorage.");
    }
  };

  useEffect(() => {
    console.log("🔄 Navigated to:", location.pathname); // Debugging log
    loadSavedCandidates();
  }, [location]); // ✅ Runs every time the route changes

  // Function to remove a candidate from the saved list
  const removeCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
    console.log(`❌ Removed candidate with ID: ${id}`);
  };

  return (
    <div>
      <h1>Potential Candidates</h1>

      {savedCandidates.length === 0 ? (
        <p>No candidates have been saved yet.</p>
      ) : (
        <table className="saved-candidates-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>GitHub Profile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td><img src={candidate.avatar_url} alt={candidate.name || "Unknown"} className="avatar" /></td>
                <td>{candidate.name || "No Name"}</td>
                <td>{candidate.login}</td>
                <td>{candidate.location || "Unknown"}</td>
                <td>
                  {candidate.email ? (
                    <a href={`mailto:${candidate.email}`} className="email-link">{candidate.email}</a>
                  ) : "Not Provided"}
                </td>
                <td>{candidate.company || "Not Provided"}</td>
                <td>
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer" className="github-link">
                    GitHub Profile
                  </a>
                </td>
                <td>
                  <button className="reject-button" onClick={() => removeCandidate(candidate.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;