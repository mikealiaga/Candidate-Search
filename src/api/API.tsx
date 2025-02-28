export const searchGithubUser = async () => {
  const apiUrl = "https://api.github.com/users?since=" + Math.floor(Math.random() * 1000); // Get random users
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const headers: HeadersInit = {};
  if (token) {
      headers["Authorization"] = `Bearer ${token}`;
  }

  try {
      console.log("Fetching from:", apiUrl);
      console.log("Using Token:", token ? "Yes" : "No");

      const response = await fetch(apiUrl, { headers });

      if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API returned:", data);

      if (Array.isArray(data) && data.length > 0) {
          return data[Math.floor(Math.random() * data.length)]; // Pick a random user
      } else {
          return null;
      }
  } catch (error) {
      console.error("Error fetching candidate:", error);
      return null;
  }
};
