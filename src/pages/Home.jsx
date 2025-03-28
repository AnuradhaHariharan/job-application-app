import { useState, useEffect, useContext } from "react";
import JobContext from "../context/JobContext";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonFooter,
  IonRouterLink,
} from "@ionic/react";
import "../styles/Home.css"; 

const Home = () => {
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
      setCurrentPage(1); // Reset pagination on search
    }, 300);

    return () => clearTimeout(timer);
  }, [search, jobs]);

  if (loading) return <IonContent>Loading jobs...</IonContent>;

  // Pagination Logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Job Listings</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Main Content */}
      <IonContent className="ion-padding">
        <input
          type="text"
          className="search" 
          placeholder="Search jobs..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="job-container">
          {currentJobs.map((job) => (
            <div key={job.id} className="job-card">
              <IonRouterLink href={`/job/${job.id}`} className="job-link">
                <h3 className="title">{job.title}</h3>
                <p className="description">{job.body}</p>
              </IonRouterLink>
              <IonRouterLink href={`/apply/${job.id}`}>
                <IonButton className="apply-btn">Apply Now</IonButton>
              </IonRouterLink>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <IonFooter className="pagination-footer">
          <IonToolbar className="pagination">
            <IonButton
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              ⬅ Prev
            </IonButton>
            <span>Page {currentPage} of {totalPages}</span>
            <IonButton
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next ➡
            </IonButton>
          </IonToolbar>
        </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default Home;



