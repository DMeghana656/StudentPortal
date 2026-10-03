import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Companies from "./pages/Companies";
import Internships from "./pages/Internships";
import Applications from "./pages/Applications";
import Certificates from "./pages/Certificates";
import Skills from "./pages/Skills";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;