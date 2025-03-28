import { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import JobContext from "../context/JobContext";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonImg,
} from "@ionic/react";
import "../styles/JobDetails.css";
import companyLogo from "../assets/company.png";

const JobDetails = () => {
  const { id } = useParams();
  const { selectedJob, fetchJobDetails, loading } = useContext(JobContext);

  useEffect(() => {
    fetchJobDetails(id);
  }, [id]);

  if (loading) return <IonContent>Loading...</IonContent>;
  if (!selectedJob) return <IonContent>Job not found.</IonContent>;

  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Job Details</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Main Content */}
      <IonContent className="ion-padding">
        <div className="job-details">
          <h1>Company Details</h1>
          <IonImg src={companyLogo} alt="company-img" />

          <h1>{selectedJob.title}</h1>
          <p>{selectedJob.body}</p>

          <Link to={`/apply/${id}`}>
            <IonButton expand="full">Apply Now</IonButton>
          </Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default JobDetails;
