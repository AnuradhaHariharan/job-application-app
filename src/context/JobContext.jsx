import { createContext, useState, useEffect } from "react";
import axios from "axios";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
 

  const API_URL = "https://jsonplaceholder.typicode.com/posts";

  // Fetch all jobs
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
    setLoading(false);
  };

  // Fetch job details
  const fetchJobDetails = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setSelectedJob(response.data);
      
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);


  return (
    <JobContext.Provider value={{ jobs, selectedJob, fetchJobDetails, loading,submitted,setSubmitted }}>
      {children}
    </JobContext.Provider>
  );
};

export default JobContext;
