import { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import JobContext from "../context/JobContext";
import "../styles/JobDetails.css";
import companyLogo from "../assets/company.png";

const JobDetails = () => {
  const { id } = useParams();
  const { selectedJob, fetchJobDetails, loading } = useContext(JobContext);

  useEffect(() => {
    fetchJobDetails(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!selectedJob) return <p>Job not found.</p>;

  return (
    <div className="job-details">
        <h1>Company Details</h1>
        <img src={companyLogo} alt="company-img" />
      <h1>{selectedJob.title}</h1>
      <p>{selectedJob.body}</p>
      <Link to={`/apply/${id}`}>Apply Now</Link>
    </div>
  );
}

export default JobDetails;
