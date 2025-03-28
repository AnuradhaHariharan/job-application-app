import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonTextarea, IonToast } from "@ionic/react";
import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import JobContext from "../context/JobContext";

const JobApplication = () => {
  const { id } = useParams();
  const history = useHistory();
  const { submitted, setSubmitted } = useContext(JobContext);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    linkedin: "",
    coverLetter: "",
    resume: null,
  });

  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", {
        jobId: id,
        ...formData,
      });
      setSubmitted(true);
      setShowToast(true);
    } catch (error) {
      console.error("Application failed:", error);
      alert("Submission error. Please try again.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Job Application</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {submitted ? (
          <p>Application Submitted!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <IonItem>
              <IonLabel position="floating">Full Name</IonLabel>
              <IonInput name="name" value={formData.name} onIonChange={handleChange} required />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput type="email" name="email" value={formData.email} onIonChange={handleChange} required />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Experience (Years)</IonLabel>
              <IonInput type="number" name="experience" value={formData.experience} onIonChange={handleChange} required />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">LinkedIn Profile</IonLabel>
              <IonInput type="url" name="linkedin" value={formData.linkedin} onIonChange={handleChange} required />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Cover Letter</IonLabel>
              <IonTextarea name="coverLetter" value={formData.coverLetter} onIonChange={handleChange} required />
            </IonItem>

            <IonItem>
              <IonLabel>Upload Resume (PDF only)</IonLabel>
              <input type="file" accept=".pdf" name="resume" onChange={handleChange} required />
            </IonItem>

            <IonButton expand="block" type="submit">Submit</IonButton>
          </form>
        )}

        <IonToast isOpen={showToast} message="Application Submitted!" duration={2000} />
      </IonContent>
    </IonPage>
  );
};

export default JobApplication;

