import { Route, Routes } from "react-router-dom";
import "./App.css";
import Status from "./routes/Status";
import Home from "./routes/Home";
import Feedback from "./routes/Feedback";
import Dev from "./routes/Dev";
import DocsLayout from "./routes/dev/docs/DocsLayout";
import DocsIntro from "./routes/dev/docs/Intro";
import DocsChangeLog from "./routes/dev/docs/ChangeLog";
import DocsApiReference from "./routes/dev/docs/ApiReference";
import DocsMCP from "./routes/dev/docs/MCP";
import InteractionsOverview from "./routes/dev/docs/interactions/Overview";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dev" element={<Dev />}>
        <Route path="status" element={<Status />} />
        <Route path="docs" element={<DocsLayout />}>
          <Route index element={<DocsIntro />} />
          <Route path="intro" element={<DocsIntro />} />
          <Route path="change-log" element={<DocsChangeLog />} />
          <Route path="api-reference" element={<DocsApiReference />} />
          <Route path="mcp" element={<DocsMCP />} />
          <Route
            path="interactions/overview"
            element={<InteractionsOverview />}
          />
        </Route>
      </Route>
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
  );
}

export default App;
