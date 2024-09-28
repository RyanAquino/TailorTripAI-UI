import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { BrowserRouter } from "react-router-dom";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./index.css";
import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MantineProvider>,
);
