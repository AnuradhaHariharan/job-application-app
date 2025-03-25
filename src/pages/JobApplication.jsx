import axios from "axios";
import { useState,useEffect, useContext} from "react";
import { useParams ,useNavigate} from "react-router-dom";
import "../styles/JobApplication.css"
import JobContext from "../context/JobContext";

const JobApplication=()=> {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const {submitted, setSubmitted,setApplicationInLocalStorage} = useContext(JobContext);
  const navigate=useNavigate();
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
        jobId: id,
        name,
        email,
      });
        setSubmitted(true);
      
      
      
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Something went wrong. Please try again later.");
    }
  };
  
  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        navigate("/");
      }, 2000); 
    }
  }, [submitted]);


  return submitted ? (
    <div>
      <p>Application Submitted! Redirecting...</p>
    </div>
   
  ) : (
    <div className="job-application-form">
    <form onSubmit={handleSubmit}>
      <h2>Apply for Job</h2>
      <label htmlFor="name">Full Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required  id="name"/>
      <label htmlFor="email">Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required id="email"/>
      <label htmlFor="experience">Experience (Years)</label>
      <input type="number" name="experience" placeholder="e.g. 2" required id="experience"/>
      <label htmlFor="linkedin">LinkedIn Profile</label>
      <input type="url" name="linkedin"  placeholder="LinkedIn URL" required id="linkedin"/>
         <label htmlFor="cover-letter">Cover Letter</label>
      <textarea name="coverLetter"  placeholder="Write a short cover letter..." required  id="cover-letter"/>
        <label htmlFor="resume">Upload Resume (PDF only)</label>
      <input type="file" accept=".pdf"  required id="resume"/>


      <button type="submit" className="apply-btn">Submit</button>
    </form></div>
  );
}

export default JobApplication;
