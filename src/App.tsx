import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Scheduler from "./pages/Scheduler.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scheduler" element={<Scheduler />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
