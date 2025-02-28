export interface Candidate {
  id: number; 
  login: string; 
  name: string | null; 
  avatar_url: string; 
  location: string | null; 
  email: string | null; 
  company: string | null; 
  html_url: string;
  bio?: string; 
}