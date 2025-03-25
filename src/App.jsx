import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import JobApplication from "./pages/JobApplication";
import NotFound from "./pages/NotFound";
import { JobProvider } from "./context/JobContext";
import Navbar from "./Components/Navbar";
import About from "./pages/About";


function App() {
  return (
    <JobProvider>
      <Router>
        <Navbar />
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About/>}/>
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/apply/:id" element={<JobApplication />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </JobProvider>
  );
}

export default App;

