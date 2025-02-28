import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Candidate } from "../interfaces/Candidate.interface";
import "../styles/table.css";

const SavedCandidates = () => {
  const [candidatesList, setCandidatesList] = useState<Candidate[]>([]);
  const location = useLocation(); // Track route changes

  // Function to ensure candidates load correctly
  const retrieveSavedCandidates = () => {
    try {
      const storedData = localStorage.getItem("savedCandidates");

      if (!storedData) {
        console.warn("No saved candidates found in localStorage.");
        setCandidatesList([]);
        return;
      }

      const parsedCandidates = JSON.parse(storedData);

      if (!Array.isArray(parsedCandidates)) {
        console.error("Invalid data format in localStorage:", parsedCandidates);
        setCandidatesList([]);
        return;
      }

      console.log("✅ Loaded candidates from localStorage:", parsedCandidates);
      setCandidatesList([...parsedCandidates]); // Force state update
    } catch (error) {
      console.error("❌ Error retrieving saved candidates:", error);
      setCandidatesList([]);
    }
  };

  // Ensure component reloads correctly when navigating
  useEffect(() => {
    console.log("🔄 Navigated to:", location.pathname);
    retrieveSavedCandidates();
  }, [location.key]); // Use `location.key` to force reloading

  // Remove a candidate from the saved list
  const handleRemoveCandidate = (id: number) => {
    const updatedList = candidatesList.filter((candidate) => candidate.id !== id);
    setCandidatesList([...updatedList]); // Force state update
    localStorage.setItem("savedCandidates", JSON.stringify(updatedList));
    console.log("Removed candidate with ID:", id);
  };

  return (
    <div>
      <h1>Saved Candidates</h1>

      {candidatesList.length === 0 ? (
        <p>No candidates have been saved yet.</p>
      ) : (
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>GitHub Profile</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {candidatesList.map((candidate) => (
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
                  <button className="delete-button" onClick={() => handleRemoveCandidate(candidate.id)}>Remove</button>
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