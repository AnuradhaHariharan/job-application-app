import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/JobApplication.css";

const JobApplication = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    linkedin: "",
    coverLetter: "",
    resume: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append("jobId", id);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("experience", formData.experience);
    formDataToSend.append("linkedin", formData.linkedin);
    formDataToSend.append("coverLetter", formData.coverLetter);
    formDataToSend.append("resume", formData.resume);

    await axios.post("https://jsonplaceholder.typicode.com/posts", formDataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setSubmitted(true);
  };

  return submitted ? (
    <p className="success-message">🎉 Application Submitted Successfully!</p>
  ) : (
    <form onSubmit={handleSubmit} className="job-application-form">
      <h2>Apply for Job</h2>
      
      <label>Name</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />

      <label>Email</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />

      <label>Experience (Years)</label>
      <input type="number" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g. 2" required />

      <label>LinkedIn Profile</label>
      <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn URL" required />

      <label>Cover Letter</label>
      <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} placeholder="Write a short cover letter..." required />

      <label>Upload Resume (PDF only)</label>
      <input type="file" accept=".pdf" onChange={handleFileChange} required />

      <button type="submit" className="apply-btn">Submit Application</button>
    </form>
  );
};

export default JobApplication;

