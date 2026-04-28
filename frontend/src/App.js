import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import SIS from "./pages/SIS";
import Admission from "./pages/Admission";
import Staff from "./pages/Staff";
import AdmissionDashboard from "./pages/AdmissionDashboard";
import StaffLogin from "./pages/StaffLogin";
import Merit from "./pages/Merit";
import Fee from "./pages/Fee";
import Syllabus from "./pages/Syllabus";
import NoticeBoard from "./pages/NoticeBoard";
import Exams from "./pages/Exams";
import Timetable from "./pages/Timetable";
import ParentPortal from "./pages/ParentPortal";
import BusService from "./pages/BusService";
import Alumni from "./pages/Alumni";
import Analytics from "./pages/Analytics";
import Marks from "./pages/Marks";
import PendingAdmissions from "./pages/PendingAdmissions";
import Documents from "./pages/Documents";
import Result from "./pages/Result";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sis" element={<SIS />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/admission-dashboard" element={<AdmissionDashboard />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/merit" element={<Merit />} />
        <Route path="/fee" element={<Fee />} />
        <Route path="/syllabus" element={<Syllabus />} />
        <Route path="/notice" element={<NoticeBoard />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/parent" element={<ParentPortal />} />
        <Route path="/bus" element={<BusService />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/marks" element={<Marks />} />
        <Route path="/pending" element={<PendingAdmissions />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;