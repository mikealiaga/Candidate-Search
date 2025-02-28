export const fetchRandomGithubUser = async () => {
  const startUserId = Math.floor(Math.random() * 900000) + 100;
  const apiUrl = `https://api.github.com/users?since=${startUserId}`;
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const headers: HeadersInit = {};
  if (token) {
      headers["Authorization"] = `Bearer ${token}`;
  }

  try {
      console.log("Requesting GitHub API:", apiUrl);
      console.log("Authorization Used:", token ? "Yes" : "No");

      const response = await fetch(apiUrl, { headers });

      if (!response.ok) {
          throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("GitHub API Response:", data);

      if (Array.isArray(data) && data.length > 0) {
          const selectedUser = data[Math.floor(Math.random() * data.length)];
          console.log("Selected Candidate:", selectedUser);
          return selectedUser;
      } else {
          console.warn("GitHub API returned an empty list.");
          return null;
      }
  } catch (error) {
      console.error("Error retrieving GitHub user:", error);
      return null;
  }
};