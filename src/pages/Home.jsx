import { useState, useEffect, useContext } from "react";
import JobContext from "../context/JobContext";
import { Link } from "react-router-dom";
import "../styles/Home.css";


function Home() {
  const { jobs, loading } = useContext(JobContext);
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredJobs(
        jobs.filter((job) =>
          job.title.toLowerCase().includes(search.toLowerCase())
        )
      );
      setCurrentPage(1); // Reset to first page on search
    }, 300);

    return () => clearTimeout(timer);
  }, [search, jobs]);

  if (loading) return <p>Loading jobs...</p>;

  // Pagination 
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div>
      <input
        type="text"
        className="search"
        placeholder="Search jobs..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="job-container">
        {currentJobs.map((job) => (
          <div key={job.id} className="job-card">
            <Link to={`/job/${job.id}`} className="job-link">
              <h3 className="title">{job.title}</h3>
              <p className="description">{job.body}</p>
            </Link>
            <Link to={`/apply/${job.id}`}>
              <button className="apply-btn">Apply Now</button>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ⬅ Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default Home;
