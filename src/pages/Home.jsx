import { useState, useEffect, useContext } from "react";
import JobContext from "../context/JobContext";
import { Link } from "react-router-dom";
import '../styles/Home.css'

function Home() {
  const { jobs, loading } = useContext(JobContext);
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredJobs(
        jobs.filter((job) => job.title.toLowerCase().includes(search.toLowerCase()))
      );
    }, 300); // Debounce effect

    return () => clearTimeout(timer);
  }, [search, jobs]);

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div>
      <h1>Job Listings</h1>
      <input type="text" placeholder="Search jobs..." onChange={(e) => setSearch(e.target.value)} />
      <div className="job-container">
      {filteredJobs.map((job) => (
  <Link to={`/job/${job.id}`} key={job.id} className="job-link">
    <div className="job-card">
      <h3 className="title">{job.title}</h3>
      <p className="description">{job.body}</p>
     <Link to={`/apply/${job.id}`} className="job-link"> <button className="apply-btn">Apply Now</button></Link>
    </div>
  </Link>
))}

      </div>
    </div>
  );
}

export default Home;
