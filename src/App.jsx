import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import JobApplication from "./pages/JobApplication";

import NotFound from "./pages/NotFound";
import { JobProvider } from "./context/JobContext";

function App() {
  return (
    <div className="app">
    <JobProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/apply/:id" element={<JobApplication />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </JobProvider>
    </div>
  );
}

export default App;
