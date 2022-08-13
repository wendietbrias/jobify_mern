import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { LandingPage, AuthPage, HomePage } from "./pages";
import StatsPage from "./pages/Home/Stats";
import AllJobsPage from "./pages/Home/AllJobs";
import AddJobPage from "./pages/Home/AddJob";
import ProfilePage from "./pages/Home/Profile";

function App() {
  const [id, setId] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/" element={<StatsPage />}></Route>
          <Route path="/all" element={<AllJobsPage setId={setId} />}></Route>
          <Route
            path="/add"
            element={<AddJobPage id={id} setId={setId} />}
          ></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Route>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
