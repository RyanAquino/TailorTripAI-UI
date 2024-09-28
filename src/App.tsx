import { Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const SchedulerPage = lazy(() => import("./pages/Scheduler.tsx"));

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/scheduler"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SchedulerPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
        {/*</Suspense>*/}
      </Routes>
    </>
  );
}

export default App;
