import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SchedulerPage from "./pages/Scheduler.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scheduler" element={<SchedulerPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
